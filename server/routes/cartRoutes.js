import { Router } from "express";
import multer from "multer";
import { addProductToCart, checkout, getCart, newUserCart, removeProductFromCart } from "../controllers/cartController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/new', newUserCart)
router.get('/', getCart)
router.get('/checkout', checkout)
router.put('/', upload.array('images', 3), addProductToCart)
router.delete('/:id', removeProductFromCart)
export default router;