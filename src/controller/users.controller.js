import {findAllUsers, findUserById} from "../services/user.service.js"

export const getAllUsers = async (req,res) => {
    try{
        const users = findAllUsers();
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

export const getUserById = async (req,res) => {
    try{
        const user = findUserById(req.params.id);
        if (!user) return res.status(404).json({message:"Usuario no encontrado"})
        res.status(200).json(user)
    } catch(err){
        res.status(500).json({message: err.message})
    }
}
