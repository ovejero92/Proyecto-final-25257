import bcrypt from 'bcryptjs';
import { leerBD, guardarDB } from '../models/user.model';

// const usuarios = [
//     { 
//       id: 1, 
//       nombre: 'Ana García',
//       email: 'ana.garcia@email.com',
//       password:bcrypt.hashSync("1234",10),
//       rol: 'Desarrolladora Frontend',
//       ubicacion: 'Buenos Aires, Argentina',
//       experiencia: '3 años'
//     },
//     { 
//       id: 2, 
//       nombre: 'Luis Martínez',
//       email: 'luis.martinez@email.com',
//       password:bcrypt.hashSync("1234",10),
//       rol: 'Backend Developer',
//       ubicacion: 'Córdoba, Argentina',
//       experiencia: '5 años'
//     },
//     { 
//       id: 3, 
//       nombre: 'Carla Rodríguez',
//       email: 'carla.rodriguez@email.com',
//       password:bcrypt.hashSync("1234",10),
//       rol: 'Full Stack Developer',
//       ubicacion: 'Rosario, Argentina',
//       experiencia: '4 años'
//     },
//     { 
//       id: 4, 
//       nombre: 'Pedro Gómez',
//       email: 'pedro.gomez@email.com',
//       password:bcrypt.hashSync("1234",10),
//       rol: 'DevOps Engineer',
//       ubicacion: 'Mendoza, Argentina',
//       experiencia: '6 años'
//     },
//   ];

// export const findAllUsers = () => {
//     return usuarios.map(u => {
//         const {password, ...rest} = u
//         return rest;
//     });
// };

export const findAllUsers = () => {return leerBD()}
 
export const findUserById = (id) => {
    const user = usuarios.find(u => u.id === parseInt(id))
    if(!user) return null;

    const {password, ...userData} = user;
    return userData
}

export const createUser = async (data) => {
  const {nombre, email, password, rol, ubicacion, experiencia} = data;

  if(!nombre || !email || !password) {
    throw new Error("Faltan los campos obligatorios (nombre - email - pass)")
  }

  const existingUser = usuarios.find(u => u.email === email);
  if(existingUser) {
    throw new Error("EL correo ya existe ");
  }

  const hash = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: usuarios.length + 1,
    nombre,
    email,
    password:hash,
    rol: rol || "sin asignar",
    ubicacion: ubicacion || "Desconocida",
    experiencia: experiencia || "Sin experiencia"
  }

  usuarios.push(newUser);

  const {password: _ , ...user} = newUser
  return user
}

export const VerifyCredentials = async (email, password) => {
  const user = usuarios.find(u => u.email === email);
  if(!user) throw new Error("Mail no registrado");

  const valid = await bcrypt.compare(password, user.password);
  if(!valid) throw new Error("Contraseña incorrecta!");

  const {password: _, ...safeUser} = user
  return safeUser
}