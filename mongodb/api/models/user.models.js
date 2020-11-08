const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    u_name : {
        type : String,
        require : true
    },
    u_email : {
        type : String,
        require : true
    },
})

module.exports = mongoose.model('Users', userSchema);