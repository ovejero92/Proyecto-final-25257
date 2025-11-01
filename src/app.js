import express from "express"
import usersRouter from "./routes/users.routes.js"

const app = express()
app.use(express.static("public"))

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

const PORT = 3000
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))