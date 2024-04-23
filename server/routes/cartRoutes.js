import { Router } from "express";
import multer from "multer";
import { addProductToCart, addUserDetails, checkout, getCart, newUserCart, paymentConfirmations, removeProductFromCart } from "../controllers/cartController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getCart)
router.get('/new', newUserCart)
router.get('/checkout', checkout)

router.post('/paymentconfirm', paymentConfirmations);

router.put('/userdetails', addUserDetails);
router.put('/', upload.array('images', 3), addProductToCart)

router.delete('/:id', removeProductFromCart)
export default router;