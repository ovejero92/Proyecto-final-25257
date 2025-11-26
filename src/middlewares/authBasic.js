
import { leerBD } from "../db/db.js";
import bcrypt from "bcryptjs";

export async function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Se requiere autenticación Basic" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");

    const [email, password] = credentials.split(":");

    const db = leerBD();
    const users = db["usuarios"] || [];

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(403).json({ message: "Credenciales inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(403).json({ message: "Contraseña incorrecta" });
    }

    req.user = user;
    next();
}

export function checkAdmin(req, res, next) {
    if (req.user.rol !== "admin") {
        return res.status(403).json({ message: "Solo administradores pueden realizar esta acción" });
    }
    next();
}