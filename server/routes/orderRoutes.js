import { Router } from "express";
import { getOrder, createOrder, markOrderAsServe, getUserOrders } from "../controllers/orderController.js";

const router = Router();

router.get('/', getOrder);
router.get('/userorders', getUserOrders)

router.post('/', createOrder);

router.put('/:id', markOrderAsServe);

export default router;