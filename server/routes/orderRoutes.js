import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { getOrders, createOrder, markOrderAsServe, getUserOrders, getOrder } from "../controllers/orderController.js";

const router = Router();

router.get('/userorders', getUserOrders)
router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrder)

router.post('/', createOrder);

router.put('/:id', verifyToken, markOrderAsServe);

export default router;