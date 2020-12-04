// define module
const 
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// define routes
const
    userRoutes = require('./api/routes/user.routes'),
    transactionRoutes = require('./api/routes/transaction.routes'),
    productRoutes = require('./api/routes/product.routes');

const app = express();

// define DB
const DB_NAME = "NB-MDB-1";
const DB_USERNAME = "reyhanjovie";
const DB_PASSWORD = "12345";
const CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@belajarmongodb.4epud.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
try{
    mongoose.connect(CONNECTION_STRING, 
        {
            useUnifiedTopology:true, 
            useNewUrlParser: true,
            useFindAndModify: false
        }
    );
    console.log('Success')
} catch(err){
    console.error(err)
}

// menggunakan module
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

// menggunakan routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);


module.exports = app;

