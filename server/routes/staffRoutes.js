import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { changePassword, createStaff, deleteStaff, getAllStaff, getStaff, staffLogin, staffLogout, unlockAccount, updateStaff, verifyStaff } from "../controllers/staffController.js";

const router = Router();

router.get('/', verifyToken, verifyStaff);
router.get('/allstaff', getAllStaff);
router.get('/logout', staffLogout);
router.get('/:id', getStaff);

router.post('/login', staffLogin);
router.post('/createstaff', verifyToken, createStaff);

router.put('/changepassword', verifyToken, changePassword);
router.put('/unlock', verifyToken, unlockAccount);
router.put('/:id', verifyToken, updateStaff);

router.delete('/:id', verifyToken, deleteStaff);
export default router;