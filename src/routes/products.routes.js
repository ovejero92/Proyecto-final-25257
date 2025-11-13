// products.routes.js
import express from 'express';

const router = express.Router();

const productos = []

router.get('/', (req, res) => {
  res.send('Listado de productos');
});

router.get("/:id", (req,res) => {
   // console.log(req.params)  // {id:"1"}
    const {id} = req.params;
    //const product = productos.find(item => item.id == id);

    console.log(product)

    // if(!product){
    //     res.status(404).json({error:`el producto con id:${id} no se encuentra`})
    //     //res.status(404).send("<h1>no se encontro el producto</h1> ")
    // }

    res.send("obt pro x id")
})

router.post("/",(req, res) => {
    // const {nombre,precio,cantidad} = req.body;
    // const newProducto = {
    //     id: productos.length + 1,
    //     nombre,
    //     precio,
    //     cantidad
    // };
    // productos.push(newProducto)
    res.status(201).send("crear")
})

export default router;