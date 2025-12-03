import {findAllUsers, findUserById, createUser, VerifyCredentials, updateUser} from "../services/user.service.js";
import jwt from "jsonwebtoken"


export const getAllUsers = (req,res) => {
    try{
        const users = findAllUsers();
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

export const getUserById = (req,res) => {
    try{
        const user = findUserById(req.params.id);
        if (!user) return res.status(404).json({message:"Usuario no encontrado"})
        res.status(200).json(user)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}

export const createUserController = async (req,res) => {
    try{
        const newUser = await createUser(req.body);
        res.status(201).json(newUser)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
}

export const updateUserController = async (req,res) => {
    try{
        const updated = await updateUser(req.params.id, req.body)
        if(!updated) return res.status(404).json({msj: "usuario no encontrado"})
        res.status(200).json(updated)
    } catch(err) {
        res.status(400).json({msj: err.message})
    }
}

export const loginUser = async (req,res) => {
    try{
        const {email, password} =  req.body;
        const user = await VerifyCredentials(email,password);
        const tokenPayload = {
            id: user.id,
            email: user.email,
            rol:user.rol
        };
        const token = jwt.sign(tokenPayload,process.env.JWT_SECRET,{expiresIn:'1h'});

        res.status(200).json({msj:"login exitoso",token, user});
    }
    catch (err) {
        res.status(401).json({msj:err.message})
    }
}