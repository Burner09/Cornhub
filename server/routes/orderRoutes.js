import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { getOrders, createOrder, markOrderComplete, getUserOrders, getOrder, getImportantOrders, setOrderPriority } from "../controllers/orderController.js";

const router = Router();

router.get('/userorders', getUserOrders);
router.get('/', verifyToken, getOrders);
router.get('/importantorders', verifyToken, getImportantOrders);

router.get('/:id', verifyToken, getOrder);

router.post('/', createOrder);

router.put('/complete/:id', verifyToken, markOrderComplete);
router.put('/priority/:id', verifyToken, setOrderPriority);

export default router;