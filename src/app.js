import express from "express"
import "dotenv/config"
import usersRouter from "./routes/users.routes.js"
import productsRouter from "./routes/products.routes.js"
import cors from "cors"

const app = express()
app.use(express.json())
// app.use(express.static("public"))
app.use(cors())
// app.use((req,res,next) => {res.json({msj:"en mantenimiento"})})
app.use(['/users','/usuarios'],usersRouter)
app.use(['/products','/productos'], productsRouter)


app.use((req,res) => {
    res.status(404).json({error:"ruta no encontrada"})
})

// const PORT = process.env.PORT || 3001
// app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))

export default app;