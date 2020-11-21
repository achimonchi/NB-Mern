const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    p_name : {
        type : String,
        require : true
    },
    p_categories : [],
    p_stock : {
        type : Number,
        require : true
    }
})

module.exports = mongoose.model('Products', productSchema);