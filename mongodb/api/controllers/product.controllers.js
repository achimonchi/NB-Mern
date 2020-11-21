const mongoose = require('mongoose');
const Product = require('./../models/Product.models');

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
        const products = await Product.find();
        const category = "Nasi";
        const productFilter = [];
        products.map((product)=>{
            let pro = [];
            product.p_categories.map((cat)=>{
                if(cat == category){
                    console.log(cat)
                    pro.push(product)
                }
            });
            console.log(pro)
            productFilter= [...productFilter, pro];
        });
        res.status(200).json(productFilter)
    } catch (error) {
        
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