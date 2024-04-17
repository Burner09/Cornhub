import Order from "../models/orderSchema.js";
import Cart from "../models/cartSchema.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if(!orders) {
      return res.status(404).json({message: "There are no orders"});
    }

    res.status(200).json(orders)
  } catch(err) {
    console.log(err);
    res.status(500).json(err)
  }
}

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findById(id);

    if(!order) {
      return res.status(404).json({message: "There are no orders"});
    }

    res.status(200).json(order)
  } catch(err) {
    console.log(err);
    res.status(500).json(err)
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const uuid = req.cookies.uuid;

    const orders = await Order.find(uuid)

    res.status(200).json(orders)
  } catch(err) {
    console.log(err);
    res.status(500).json(err)
  }
}

export const createOrder = async (req, res) => {
  try {
    const uuid = req.cookies.uuid;

    const cart = await Cart.findOne({ uuid, 'userCart.isPaid': false });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found or all items are already paid' });
    }

    const unpaidItems = cart.userCart.filter(item => !item.isPaid);

    if (unpaidItems.length === 0) {
      return res.status(400).json({ message: 'All items are already paid' });
    }

    const total = unpaidItems.reduce((acc, item) => acc + item.selectedDetails.price, 0);

    await Cart.updateMany(
      { uuid, 'userCart.isPaid': false },
      { $set: { 'userCart.$[elem].isPaid': true } },
      { arrayFilters: [{ 'elem.isPaid': false }] }
    );

    const newOrder = { uuid, userDetails: cart.userDetails, items: unpaidItems };
    const response = await Order.create(newOrder);

    if (!response) {
      return res.status(500).json({ message: 'Order not created' });
    }

    await Cart.updateOne({ uuid }, { $pull: { userCart: { isPaid: true } } });

    const remainingItems = await Cart.findOne({ uuid, 'userCart.isPaid': false });
    if (!remainingItems || remainingItems.userCart.length === 0) {
      await Cart.updateOne({ uuid }, { $set: { total: 0, userCart: [] } });
    }

    res.status(201).json({ message: 'Order created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const markOrderAsServe = async (req, res) => {
  const { id } = req.params
  try {
    response = await Order.findByIdAndUpdate(id);

    if(!response) {
      res.status(401).json({message: "Order not marked serve"});
    }

    res.status(203).json({message: "Order marked as serve"});
  } catch(err) {
    console.log(err.message);
    res.status(500).json(err.message)
  }
}