import userModel from '../models/apiModel.js';

export const createUser = async(req, res) => {
    try {
        const {name, email} = req.body;
        if(!name || !email){
            return res.send({error: "all fields are required"});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.send({message: "user already exists"});
        }
        const newUser = new userModel({
            name, email
        });
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "user successfully created",
            newUser
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "failed to fetch users",
            error
        });
    }
}

export const getAll = async(req, res) => {
    try{
        const result = await userModel.find();
        return res.status(200).send({
            success: true,
            message: "users fetched successfully",
            result
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: "failed to fetch users",
            error
        });
    }
}

export const removeUser = async(req, res) => {
    try {
        // const result = await userModel.findOneAndDelete({email:req.params.email})
        const result = await userModel.findByIdAndDelete({_id:req.params.id})
        return res.status(200).send({
            success: true,
            message: "user deleted successfully",
            result
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "failed to delete user",
            error
        });
    }
}

export const getSingle = async(req, res) => {
    try {
        const result = await userModel.findOne({_id:req.params.id})
        console.log(result);
        if(result){
            return res.status(200).send({
                success: true,
                message: "user fetched",
                result
            });
        } else {
            return res.status(404).send({
                success: true,
                message: "user not found"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "failed to fetch user",
            error
        });
    }
}