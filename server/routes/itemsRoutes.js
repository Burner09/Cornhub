import { Router } from "express";
import multer from "multer";
import { createItems, getItem, getItems, getNewItems, getTrendingItems } from "../controllers/itemController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getItems);
router.get('/product/:id', getItem)
router.get('/new', getNewItems)
router.get('/trending', getTrendingItems)
router.post('/', upload.array('images', 3), createItems);


export default router;