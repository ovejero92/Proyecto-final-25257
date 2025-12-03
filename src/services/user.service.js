import bcrypt from 'bcryptjs';
// import { leerBD, guardarDB } from '../db/db.js';
import { collection, getDocs, addDoc, getDoc, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { UserModel } from '../models/user.model.js';

const ruta = "usuarios";

export const findAllUsers = async () => {
  // const bd = leerBD()
  // const users = bd[ruta] || []
  // return users.map(({password, ...u})=> u)
  const snapshot = await getDocs(collection(db,ruta))
  return snapshot.docs.map(d => {
    const {password, ...u} = d.data();
    //return {id:doc.id, ...u}
    return new UserModel({id:doc.id, ...u})
  })
}
 
export const findUserById = async (id) => {
    const ref = doc(db,ruta,id)
    const snap = await getDoc(ref)

    if(!snap.exists()) return null;

    const {password, ...userData} = snap.data();
    return new UserModel({id: snap.id, ...userData});
}

export async function createUser(data) {
  const { nombre, email, password, rol, ubicacion, experiencia } = data;

  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios");
  }

  const q = query(
    collection(db, ruta),
    where("email", "==", email)
  );

  const existing = await getDocs(q);
  if (!existing.empty) {
    throw new Error("El correo electrónico ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    nombre,
    email,
    password: hashedPassword,
    rol: rol || "Sin rol",
    ubicacion: ubicacion || "Desconocida",
    experiencia: experiencia || "Sin experiencia"
  };

  const ref = await addDoc(collection(db, ruta), newUser);

  const { password: _, ...safeUser } = newUser;
  return new UserModel({ id: ref.id, ...safeUser });
}

export const updateUser = async (id,data) => {
 const ref = doc(db, ruta, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const old = snap.data();

  let newPassword = old.password;
  if (data.password) {
    newPassword = await bcrypt.hash(data.password, 10);
  }

  const updated = {
    nombre: data.nombre || old.nombre,
    email: data.email || old.email,
    password: newPassword,
    rol: data.rol || old.rol,
    ubicacion: data.ubicacion || old.ubicacion,
    experiencia: data.experiencia || old.experiencia
  };

  await updateDoc(ref, updated);

  const { password, ...safeUser } = updated;
  return { id, ...safeUser };
}

export async function deleteUser(id) {
  const ref = doc(db, ruta, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const user = snap.data();

  await deleteDoc(ref);

  const { password, ...safeUser } = user;
  return { id, ...safeUser };
}


export const VerifyCredentials = async (email, password) => {
  const q = query(
    collection(db,ruta),
    where("email", "==" , email)
  );
  const snap = await getDocs(q)

  if(snap.empty) throw new Error("Usuario no encontrado")

  const userDoc = snap.docs[0];
  const user = userDoc.data();

  const valid = await bcrypt.compare(password, user.password)

  if(!valid) throw new Error("La contraseña es incorrecta")

  const {password: _ , ...userSafe} = user
  return {id: userDoc.id, ...userSafe}
}

