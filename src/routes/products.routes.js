import {Router} from "express";
import {getProduct,getProducts,createNewProuct,deleteProductById,updateProductById} from "../controller/product.controller.js";

const router = Router();


router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/crear',createNewProuct);
router.put('/:id', deleteProductById);
router.delete('/:id', deleteProductById);


export default router;