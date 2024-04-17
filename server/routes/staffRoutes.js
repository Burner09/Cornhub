import { Router } from "express";
import { createStaff, staffLogin, staffLogout } from "../controllers/staffController.js";

const router = Router();

router.get('/logout', staffLogout);

router.post('/login', staffLogin);
router.post('/signup', createStaff);

export default router;