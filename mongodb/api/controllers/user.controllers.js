const mongoose = require('mongoose');
const User = require('./../models/user.models');

exports.userFindAll = async (req,res)=>{
    const limit = parseInt(req.query.limit) || 5;

    const users = await User.find().limit(limit);
    res.status(200).json({
        count : users.length,
        data : users,
        limit : limit
    })
}

exports.userFindByID = async(req,res)=>{
    try{
        const _id = req.params._id;
        const user = await User.findById(_id);
        res.status(200).json({
            data:user
        })
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
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

exports.userUpdate = async(req,res)=>{
    try{
        const body = req.body;
        const _id = req.params._id;
        const userUpdate = {
            u_name : body.u_name,
            u_email : body.u_email
        };

        await User.findByIdAndUpdate(_id, userUpdate);
        res.status(200).json({
            message : "Updated !",
            data : userUpdate
        });
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.userDelete = async(req,res)=>{
    try{
        const _id = req.params._id;
        await User.findByIdAndDelete(_id);
        res.status(200).json({
            message : "User Deleted !"
        })
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
}

