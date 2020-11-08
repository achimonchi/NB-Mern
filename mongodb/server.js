const 
    http = require('http'),
    app = require('./app');

const _port = 4000;

const createServer = http.createServer(app);

createServer.listen(_port, (err)=>{
    if(err) throw err;
    console.log(`Server running at port ${_port}`);
})
