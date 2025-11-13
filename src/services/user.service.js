import bcrypt from 'bcryptjs';

const usuarios = [
    { 
      id: 1, 
      nombre: 'Ana García',
      email: 'ana.garcia@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Desarrolladora Frontend',
      ubicacion: 'Buenos Aires, Argentina',
      experiencia: '3 años'
    },
    { 
      id: 2, 
      nombre: 'Luis Martínez',
      email: 'luis.martinez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Backend Developer',
      ubicacion: 'Córdoba, Argentina',
      experiencia: '5 años'
    },
    { 
      id: 3, 
      nombre: 'Carla Rodríguez',
      email: 'carla.rodriguez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'Full Stack Developer',
      ubicacion: 'Rosario, Argentina',
      experiencia: '4 años'
    },
    { 
      id: 4, 
      nombre: 'Pedro Gómez',
      email: 'pedro.gomez@email.com',
      password:bcrypt.hashSync("1234",10),
      rol: 'DevOps Engineer',
      ubicacion: 'Mendoza, Argentina',
      experiencia: '6 años'
    },
  ];

export const findAllUsers = () => {
    return usuarios.map(u => {
        const {password, ...rest} = u
        return rest;
    });
};

export const findUserById = (id) => {
    const user = usuarios.find(u => u.id === parseInt(id))
    if(!user) return null;

    const {password, ...userData} = user;
    return userData
}