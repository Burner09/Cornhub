import Item from "../models/itemSchema.js";
import fs from "fs/promises";
import sharp from "sharp";
import path from "path";

// create folder func
const createFolder = async (name) => {
  const folderName = Date.now() + "_" + name.replace(/ /g, "_");
  const folderPath = path.join("public/assets/", folderName);

  await fs.mkdir(folderPath, { recursive: true });
  return { folderName, folderPath };
};

// delete file func
const deleteFile = async (folderPath, imagePath) => {
  const filePath = path.join(folderPath, imagePath);
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.log(err);
  }
};

// delete folder func
const deleteFolder = async (folderPath) => {
  if (await fs.access(folderPath).then(() => true).catch(() => false)) {
    try {
      await fs.rm(folderPath, { recursive: true });
    } catch (err) {
      console.log(err);
    }
  }
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

// controller funcs
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();

    if(!items) {
      res.status(404).json({message: "No products available"});
    }

    res.status(200).json(items);
  } catch(err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.status(200).json(item)
  } catch(err) {
    console.log(err);
    res.status(500).json(err.message)
  }
}

export const getNewItems = async (req, res) => {
  try {
    const newItems = await Item.find().sort({_id:-1}).limit(5)

    res.status(200).json(newItems)
    
  } catch(err) {
    console.log(err);
    res.status(500).json(err.message)
  }
}

export const getFiveItems = async (req, res) => {
  try {
    const newItems = await Item.find().limit(5)

    res.status(200).json(newItems)
    
  } catch(err) {
    console.log(err);
    res.status(500).json(err.message)
  }
}

export const createItems = async (req, res) => {
  let folder;
  try {
    const { name, description, price, specificDetails } = req.body;
    const parsedSpecificDetails = JSON.parse(specificDetails);
    const newItem = { name, description, price, specificDetails: parsedSpecificDetails, };

    if(req.files) {
      folder = await createFolder(name);

      const imagePaths = await Promise.all(req.files.map(async (file, index) => await compressImages(folder, file, index, name)));

      newItem.imagePaths = imagePaths;
    }

    await Item.create(newItem);
    req.file = null;
    res.status(201).json({message: "Item created successfully"});
  } catch(err) {
    if(req.files && folder) {
      await deleteFolder(folder.folderPath);
    }

    console.log(err);
    res.status(500).json(err.message);
  }
}

export const updateItems = async (req, res) => {
  let folder;
  try {
    const { id } = req.params;
    const { name, description, price, sizes } = req.body;
    let updatedItem = { name, description, price, sizes };

    if (req.files && req.files.length > 0) {
      folder = await createFolder(name);
      const newImagePaths = await Promise.all(req.files.map(async (file, index) => await compressImages(folder, file, index, name)));

      let existingProduct = await Item.findById(id);

      if (existingProduct.imagePaths && existingProduct.imagePaths.length > 0) {
        await Promise.all(existingProduct.imagePaths.map(async (imagePath) => await deleteFile(folder.folderPath, imagePath)));
      }

      updatedItem.imagePaths = newImagePaths;
    }

    await Item.findByIdAndUpdate(id, updatedItem);
    res.status(200).json({ message: "Item updated successfully" });
  } catch (err) {
    if (req.files && folder) {
      await deleteFolder(folder.folderPath);
    }
    console.log(err);
    res.status(500).json(err.message);
  }
}

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    const imageFolderPath = "public/assets/" + path.dirname(deletedItem.imagePaths[0]);

    await deleteFolder(imageFolderPath);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch(err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
}
