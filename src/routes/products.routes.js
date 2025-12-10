import {Router} from "express";
import {getProduct,getProducts,createNewProuct,deleteProductById,updateProductById} from "../controller/product.controller.js";
import { validateProduct } from "../middlewares/validations.js";

const router = Router();


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Crea un nuevo producto 
 *     tags: [Products]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       201:
 *         description: Producto creado
 */

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/crear',validateProduct, createNewProuct);
router.put('/:id', deleteProductById);
router.delete('/:id', deleteProductById);


export default router;