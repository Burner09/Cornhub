import Order from "../models/orderSchema.js";

export const getOrder = async (req, res) => {
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

export const createOrder = async (req, res) => {
  const { clientName, items, price } = req.body
  try {
    const newOrder = {clientName, items, price  }

    const response = await Order.create(newOrder);

    if(!response) {
      res.status(500).json('order not created');
    }

    res.status(201).json({message: "Order created"})
  } catch(err) {
    console.log(err);
    res.status(401).json(err);
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