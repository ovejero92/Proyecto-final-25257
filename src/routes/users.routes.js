import { Router } from "express";

const router = Router()

// router.get('/',(req,res) => {
//       const tarjetasHTML = usuarios.map(usuario => `
//      <div class="bg-white rounded-2xl shadow-xl p-8 transform transition hover:scale-105 hover:shadow-2xl border border-gray-100">
//       <!-- Avatar -->
//       <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 shadow-lg">
//         <span class="text-3xl font-bold text-white">${usuario.nombre.charAt(0)}</span>
//       </div>
      
//       <!-- Nombre -->
//       <h3 class="text-2xl font-bold text-gray-800 text-center mb-2">
//         ${usuario.nombre}
//       </h3>
      
//       <!-- Rol -->
//       <p class="text-indigo-600 font-semibold text-center mb-4">
//         ${usuario.rol}
//       </p>
      
//       <!-- Divisor -->
//       <div class="border-t border-gray-200 my-4"></div>
      
//       <!-- Información adicional -->
//       <div class="space-y-3 text-sm">
//         <div class="flex items-center text-gray-600">
//           <svg class="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//           </svg>
//           ${usuario.email}
//         </div>
        
//         <div class="flex items-center text-gray-600">
//           <svg class="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//           </svg>
//           ${usuario.ubicacion}
//         </div>
        
//         <div class="flex items-center text-gray-600">
//           <svg class="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//           </svg>
//           ${usuario.experiencia} de experiencia
//         </div>
//       </div>
      
//       <!-- ID Badge -->
//       <div class="mt-4 pt-4 border-t border-gray-200">
//         <span class="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
//           ID: ${usuario.id}
//         </span>
//       </div>
//     </div>
//     `).join('');
    
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="es">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Usuarios - Mi Aplicación</title>
//       <script src="https://cdn.tailwindcss.com"></script>
//     </head>
//     <body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      
//       <div class="container mx-auto px-4 py-16">
//         <!-- Header -->
//         <div class="text-center mb-12">
//           <a href="/" class="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition">
//             ← Volver al inicio
//           </a>
//           <h1 class="text-5xl font-bold text-gray-800 mb-4">
//             Nuestro Equipo
//           </h1>
//           <p class="text-xl text-gray-600">
//             Conocé a los miembros de nuestro equipo
//           </p>
//         </div>

//         <!-- Grid de tarjetas -->
//         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
//           ${tarjetasHTML}
//         </div>
//       </div>

//     </body>
//     </html>
//   `);
// })


// router.get('/:id',() => {

// })



// router.post('/',(req,res) => {
//     res.send('hola desde le post')
// })

// router.put('/',(req,res) => {
//     res.send('hola desde el put')
// })

// router.delete('/',(req,res) => {
//     res.send('hola desde delete')
// })
import {getAllUsers , getUserById} from "../controller/users.controller.js"

router.get('/', getAllUsers)
router.get('/:id',getUserById)



export default router