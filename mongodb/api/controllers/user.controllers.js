const mongoose = require('mongoose');
const User = require('./../models/user.models');

exports.userFindAll = async (req,res)=>{
    const users = await User.find();
    res.status(200).json({
        data : users
    })
}

exports.userAdd = async(req,res)=>{
    try{
        const body = req.body;
        const newUser = new User({
            _id : mongoose.Types.ObjectId(),
            u_name : body.u_name,
            u_email : body.u_email,
        });

        await newUser.save();
        res.status(201).json({
            message : "Created !",
            data : newUser
        });
    } catch(err){
        res.status(500).json({
            error : err
        })
    }

    
}