const mongoose = require('mongoose');
const Transaction = require('./../models/transactions.models');
const Product = require('./../models/product.models');
const User = require('./../models/user.models');

exports.transactionFindAll = async(req,res) =>{
    try {
        const limit = parseInt(req.query.limit) || 5;
        const transaction = await Transaction.find().populate("t_product").populate("t_user").limit(limit);
        let data = {
            status : 200
        };

        if(transaction.length > 0) {
            data = {
                ...data,
                count : transaction.length,
                limit : limit,
                data : transaction
            }
        } else {
            data = {
                status: 404,
                error : "There is no data in this resource"
            }
        }

        res.status(data.status).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status : 500,
            error : error
        })
    }
}

exports.transactionAdd = async(req,res) =>{
    try {
        const body = req.body;
        const transaction = new Transaction(body);
        transaction._id = mongoose.Types.ObjectId();
        let data = {
            status : 200
        }
        const product = await Product.findById(body.t_product);
        if(!product){
            data = {
                status : 404,
                error : "Product not found !"
            }
        } else{
            const user = await User.findById(body.t_user);
            if(!user){
                data = {
                    status : 404,
                    error : "User not found !"
                }   
            } else {
                const isGreater = body.t_amount > product.p_stock;
                if(isGreater){
                    data = {
                        status : 400,
                        error : "Stock tidak mencukupi !"
                    }
                } else{
                    const total = parseInt(body.t_amount) * product.p_price;
                    const stockNow = product.p_stock - parseInt(body.t_amount);
                    transaction.t_total = total;

                    await transaction.save();
                    await Product.findByIdAndUpdate(product._id, {"p_stock" : stockNow});
                    data = {
                        ...data,
                        status  :201,
                        data : transaction
                    }

                }
                
            }
        }
        res.status(200).json(data);
    } catch (error) {
        
    }
}