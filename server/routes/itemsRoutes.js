import { Router } from "express";
import multer from "multer";
import { createItems, getItem, getItems, getNewItems, getFiveItems, updateItems, deleteItem } from "../controllers/itemController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getItems);
router.get('/product/:id', getItem)
router.get('/new', getNewItems)
router.get('/popular', getFiveItems)

router.post('/', upload.array('images', 5), verifyToken, createItems);
router.put('/:id', upload.array('images', 5), verifyToken, updateItems);
router.delete('/:id', verifyToken, deleteItem)


export default router;