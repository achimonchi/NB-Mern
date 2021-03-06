const mongoose = require('mongoose');
const Product = require('./../models/product.models');

exports.findProducts = async(req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json({
            status : 200,
            data : products
        });
    } catch (error) {
        res.status(500).json({
            status : 500,
            error : error
        })
    }
}

exports.findProductByCategory = async(req,res) =>{
    try {
        
        const category = new RegExp(req.params.category, 'i');
        let productFilter = [];
        productFilter = await Product.find({"p_categories" : category});
        let data = {
            status : 200
        }
        if(productFilter.length <= 0){
            data = {
                status : 404,
                error : "Data not found in this resource !"
            }
        } else {
            data = {
                ...data,
                data : productFilter
            }
        }
        res.status(data.status).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
        
    }
}

exports.addProduct = async(req,res) =>{
    try {
        const body = req.body;

        body._id = mongoose.Types.ObjectId();
        const newProduct = new Product(body);
        await newProduct.save();
        res.status(201).json({
            status : 201,
            data : newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 500,
            error
        })
    }
}

exports.updateStock = async(req,res) =>{
    try {
        const id = req.params.id;
        const type = req.query.type;
        const count = parseInt(req.query.count);
        
        // get product
        const product = await Product.findById(id);

        let stockNow = 0;

        // check tipe 
        if(type === "out"){
            stockNow = product.p_stock - count;
        } else if(type === "in"){
            stockNow = product.p_stock + count;
        }

        // buat object update stock
        const update = {
            p_stock : stockNow
        }

        // update stock
        const newProduct = await Product.findOneAndUpdate({_id:id}, update, {new:true})
        res.status(200).json({
            newProduct
        })
    } catch (error) {
        
    }
    console.log({param : req.params, query:req.query})
}