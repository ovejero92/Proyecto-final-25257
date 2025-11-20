import bcrypt from 'bcryptjs';
import { leerBD, guardarDB } from '../db/db.js';


const ruta = "usuarios";
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

export const findAllUsers = () => {
  const bd = leerBD()
  const users = bd[ruta] || []
  return users.map(({password, ...u})=> u)
}
 
export const findUserById = (id) => {
    const bd = leerBD()
    const users = bd[ruta] || []

    const user = users.find(u => u.id === parseInt(id))
    if(!user) return null;

    const {password, ...userData} = user;
    return userData
}

export const createUser = async (data) => {
  const {nombre, email, password, rol, ubicacion, experiencia} = data;

  const bd = leerBD()
  const users = bd[ruta] || []

  if(!nombre || !email || !password) {
    throw new Error("Faltan los campos obligatorios (nombre - email - pass)")
  }

  if(users.some((u) => {u.email === email})) {
    throw new Error("El correo ya existe")
  }

  const hash = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: users.length ? (users[users.length - 1].id + 1 ) : 1,
    nombre,
    email,
    password:hash,
    rol: rol || "sin asignar",
    ubicacion: ubicacion || "Desconocida",
    experiencia: experiencia || "Sin experiencia"
  }

  users.push(newUser);

  bd[ruta] = users
  guardarDB(bd)

  const {password: _ , ...user} = newUser
  return user
}

export const updateUser = async (id,data) => {
  const bd = leerBD()
  const users = bd[ruta] || []

  const index = users.findIndex(u => u.id === Number(id))
  if(index === -1) return null;
  
  let newPassword = users[index].password;
  if(data.password ){
    newPassword = await bcrypt.hash(data.password,10)
  }

  const updated = {
    id: users[index].id,
    nombre: data.nombre || users[index].nombre,
    email: data.email || users[index].email,
    password:newPassword,
    rol: data.rol || users[index].rol,
    ubicacion:data.ubicacion || users[index].ubicacion,
    experiencia: data.experiencia || users[index].experiencia
  }

  users[index]= updated

  db[ruta] = users;
  guardarDB(db);

  const {password, ...safeUser} = updated;
  return safeUser
}

export const VerifyCredentials = async (email, password) => {
  const bd = leerBD()
  const users = bd[ruta] || []

  const user = users.find(u => u.email === email);
  if(!user) throw new Error("Mail no registrado");

  const valid = await bcrypt.compare(password, user.password);
  if(!valid) throw new Error("Contraseña incorrecta!");

  const {password: _, ...safeUser} = user
  return safeUser
}