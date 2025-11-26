import bcrypt from "bcryptjs";
import { leerBD } from "../db/db.js";

export async function authHeaders(req,res,next) { 
    const {email , password} = req.headers;

    if(!email || !password) { return res.status(401).json({msj:" faltan email y contraseña"})}

    const db = leerBD() 
    const users = db["usuarios"] || [];

    const user = users.find(u => u.email === email)
    if(!user) return res.status(401).json({msj:"usuario no encontrado."})

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) return res.status(403).json({msj:"contraseña incorrecta."})

    req.user = user

    next()
}

export function soloAdmin(req,res,next ) {
    if(req.user?.rol !== "admin") {
        return res.status(403).json({msj:"solo puede usar esta accion el administrador"})
    }
    next()
}