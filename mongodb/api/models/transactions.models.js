const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    t_user : {
        type : mongoose.Types.ObjectId,
        ref : "Users"
    },
    t_product : {
        type : mongoose.Types.ObjectId,
        ref : "Products"
    },
    t_amount : {
        type : Number,
        default : 0
    },
    t_total : {
        type : Number,
        default : 0
    },
    t_cratedAt : {
        type : Number,
        default : Date.now()
    }
});

module.exports = mongoose.model("Transactions", transactionSchema);