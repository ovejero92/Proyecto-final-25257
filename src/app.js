import express from "express"
import usersRouter from "./routes/users.routes.js"
import cors from "cors"

const app = express()
app.use(express.json())

app.use(express.static("public"))
app.use(cors())

// app.use((req,res,next) => {res.json({msj:"en mantenimiento"})})

app.use('/users',usersRouter)
app.use('/usuarios', usersRouter)


// app.get('/', (req,res) => {
//     res.send(`
//         <html>
//       <head>
//         <title>Bienvenido/a</title>
//       </head>
//       <body>
//         <h1>¡Bienvenido/a a mi aplicación!</h1>
//         <p>Esta es una respuesta en formato HTML.</p>
//       </body>
//     </html>
//         `)
// })

// app.get('/usuarios', (req,res) => {
//     const usuarios = [{id:1,"nombre":"Ana"},{id:2,"nombre":"Flavio"},{id:3,"nombre":"Matias"}]
//     res.json(usuarios)
// })

const productos = [
    {id:1,nombre:"manzana roja", precio:10.0,cantidad:100},
    {id:2,nombre:"banana", precio:15.0,cantidad:200},
    {id:3,nombre:"mandarina", precio:20.0,cantidad:300},
]

app.get("/products",(req,res) => {
    res.json(productos)
})

// app.get("/products/2",(req,res) => {
//     const product = productos.find(item => item.id == 2)
//     res.json(product)
// })
app.get("/products/search",(req,res) => {
    console.log(req.query) // {nombre = 'no', precio = 10} 
    const {nombre} = req.query
    const filtered = productos.filter(item => item.nombre.toLowerCase().includes(nombre.toLowerCase()))
    res.json(filtered)
    // manzana
    // http://localhost:3000/products/search?nombre=manzana
})



app.get("/products/:id", (req,res) => {
   // console.log(req.params)  // {id:"1"}
    const {id} = req.params;
    const product = productos.find(item => item.id == id);

    console.log(product)

    if(!product){
        res.status(404).json({error:`el producto con id:${id} no se encuentra`})
        //res.status(404).send("<h1>no se encontro el producto</h1> ")
    }

    res.json(product)
})

app.post("/products",(req, res) => {
    const {nombre,precio,cantidad} = req.body;
    const newProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        cantidad
    };
    productos.push(newProducto)
    res.status(201).json(newProducto)
})

app.use((req,res) => {
    res.status(404).json({error:"ruta no encontrada"})
})

const PORT = 3000
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))