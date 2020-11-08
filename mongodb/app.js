// define module
const 
    express = require('express'),
    bodyParser = require('body-parser');

const app = express();

// menggunakan module
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

// menggunakan routes

app.get("/",(req,res)=>{
    res.status(200).json({message : "Success"});
})

module.exports = app;

