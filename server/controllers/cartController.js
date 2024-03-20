import Cart from "../models/cartSchema.js";
import Item from "../models/itemSchema.js";
import fs from "fs/promises";
import validator from "validator";
import { v4 as uuidv4 } from 'uuid';
import sharp from "sharp";
import path from "path";
import stripe from 'stripe';

// stripe payments
stripe(process.env.STRIPE_PRIVATE_KEY)

// create folder func
const createFolder = async (name) => {
  const folderName = Date.now() + "_" + name;
  const folderPath = path.join("public/assets/", folderName);

  await fs.mkdir(folderPath, { recursive: true });
  return { folderName, folderPath };
};

// image compression
const compressImages = async (folder, file, index, title) => {
  const image = path.join(`${title.substring(0, 10).replace(/ /g, "-")}-${index + 1}.png`);
  const imagePath = path.join(folder.folderPath, image);

  // compress image
  await sharp(file.buffer)
    .resize({
      width: 800,
      height: 800,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 } // Fully transparent background, nts only works with png
    })
    .png({ quality: 90 })
    .toFile(imagePath);

  // clear multer file data from memory for garbage collection
  file.buffer.fill(0);
  return path.join(folder.folderName, image);
};

// controllers
export const getCart = async (req, res) => {
  try {
    const uuid = req.cookies.uuid;

    if (!uuid) {
      return res.status(400).json({ message: "UUID parameter is missing" });
    }

    const existingCart = await Cart.findOne({ uuid });

    if (!existingCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart: existingCart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const newUserCart = async (req, res) => {
  try {
    let uuid = req.cookies.uuid;

    if (!uuid) {
      uuid = uuidv4();
    } else if (!validator.isUUID(uuid)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const existingCart = await Cart.findOne({ uuid });

    if (existingCart) {
      return res.status(200).json({ message: "Cart already exists", cart: existingCart });
    }

    const expirationInSeconds = 60 * 60 * 24 * 365;
    res.cookie("uuid", uuid, { httpOnly: true, maxAge: expirationInSeconds * 1000 });

    const newCart = new Cart({ uuid, cart: [] });
    await newCart.save();

    res.status(201).json({ message: "Cart created successfully", cart: newCart });
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkout = async (req, res) => {
  try {
    const uuid = req.cookies.uuid;
    if (!uuid || !validator.isUUID(uuid)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const cart = await Cart.findOne({ uuid });
    const items = Object.keys(cart.userCart).map(k => [k, cart.userCart[k]]);

    items.forEach((item) => {
      console.log(item)
    })
  
    

    const session = await stripe.checkout.session.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [],
      success_url: 'http:localhost:3000', 
      cancel_url: 'http:localhost:3000',
    })
    res.json({ url: session.url})
  } catch(err) {
    console.log(err.message)
    res.status(500).json({ message: "Internal server error" });
  }
}

export const addProductToCart = async (req, res) => {
  try {
    const { productID, price, selectedDetails } = req.body;
    const uuid = req.cookies.uuid;
    console.log(uuid)

    if (!uuid || !validator.isUUID(uuid)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const existingCart = await Cart.findOne({ uuid });

    if (!existingCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemExists = await Item.exists({ _id: productID });
    if (!itemExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = price * selectedDetails.qty;

    const product = {
      productID,
      selectedDetails,
    };

    if(req.files) {
      product.images = req.files;
      
      const folder = await createFolder(uuid);

      const compressedImages = await Promise.all(product.images.map(async (file, index) => {
        const imagePath = await compressImages(folder, file, index, productID);
        return imagePath;
      }));
      product.images = compressedImages;
    }

    existingCart.userCart.push(product);

    existingCart.total += totalPrice;

    await existingCart.save();

    res.status(200).json({ message: "Product added to cart successfully", cart: existingCart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const uuid = req.cookies.uuid;

    if (!uuid || !validator.isUUID(uuid)) {
      return res.status(400).json({ message: "Invalid UUID" });
    }

    const existingCart = await Cart.findOne({ uuid });

    if (!existingCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = existingCart.userCart.find(item => item._id.toString() === id );
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const productId = cartItem.productID;

    const product = await Item.findOne({ _id: productId }, { price: 1 });
    if (!product) {
      return res.status(404).json({ message: "Product details not found" });
    }

    const removedProductPrice = product.price;

    existingCart.userCart = existingCart.userCart.filter(item => item._id.toString() !== id);

    if (cartItem.images && cartItem.images.length > 0) {
      await Promise.all(cartItem.images.map(async imagePath => {
        try {
          await fs.unlink(path.join("public/assets/", imagePath));
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }));
    }

    existingCart.total -= removedProductPrice * cartItem.selectedDetails.qty;

    await existingCart.save();

    res.status(200).json({ message: "Product removed from cart successfully", cart: existingCart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

