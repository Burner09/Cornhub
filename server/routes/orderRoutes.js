import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { getOrders, createOrder, markOrderComplete, getUserOrders, getOrder, getStaffDashboardOrders, setOrderPriority, getNewOrders, getPriorityOrders, getCompletedOrders } from "../controllers/orderController.js";

const router = Router();

router.get('/', verifyToken, getOrders);
router.get('/new', verifyToken, getNewOrders);
router.get('/priority', verifyToken, getPriorityOrders);
router.get('/completed', verifyToken, getCompletedOrders);
router.get('/userorders', getUserOrders);
router.get('/staffdashboardorders', verifyToken, getStaffDashboardOrders);

router.get('/:id', verifyToken, getOrder);

router.post('/', createOrder);

router.put('/complete/:id', verifyToken, markOrderComplete);
router.put('/priority/:id', verifyToken, setOrderPriority);

export default router;