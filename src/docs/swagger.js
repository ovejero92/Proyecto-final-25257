// src/docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API E-Commerce",
            version: "1.0.0",
            description: "Documentación para el proyecto final"
        },
    },
    apis: ["./src/routes/*.js"] // Lee las rutas
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);