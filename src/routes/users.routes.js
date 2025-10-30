import { Router } from "express";

const router = Router()

router.get('/',(req,res) => {
    res.send('<h2> Usuarios </h2>')
})

router.post('/',(req,res) => {
    res.send('hola desde le post')
})

router.put('/',(req,res) => {
    res.send('hola desde el put')
})

router.delete('/',(req,res) => {
    res.send('hola desde delete')
})

export default router