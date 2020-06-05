const server = require('./server.js');


server.get('/', function(req, res){
    res.send(`<h1>My New App Works Fine!</h1>`);
})



const port = 5000;
server.listen(5000, () => {
  console.log(`server running on ${port}`);
    
})