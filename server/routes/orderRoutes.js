import { Router } from "express";
import { getOrder, createOrder, markOrderAsServe } from "../controllers/orderController.js";

const router = Router();

router.get('/', getOrder);

router.post('/', createOrder);

router.put('/:id', markOrderAsServe);

export default router;