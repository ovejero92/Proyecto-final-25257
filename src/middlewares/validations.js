import { z } from "zod";

const productSchema = z.object({
    nombre: z.string().min(3,"el nombre debe tener al menos 3 letras"),
    precio: z.number().positive("El precio debe ser positivo"),
    stock: z.number().int().nonnegative().optional(),
    img: z.url("Debe ser una URL valida").optional()
})

export const validateProduct = (req,res,next) => {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({err: result.error.format() });
    }
    req.body = result.data;
    next();
}
