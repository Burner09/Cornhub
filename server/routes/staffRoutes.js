import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { createStaff, deleteStaff, getAllStaff, getStaff, staffLogin, staffLogout, updateStaff, verifyStaff } from "../controllers/staffController.js";

const router = Router();

router.get('/', verifyToken, verifyStaff);
router.get('/allstaff', getAllStaff);
router.get('/:id', getStaff);
router.get('/logout', staffLogout);

router.post('/login', staffLogin);
router.post('/createstaff', verifyToken, createStaff);

router.put('/:id', verifyToken, updateStaff)

router.delete('/:id', verifyToken, deleteStaff);
export default router;