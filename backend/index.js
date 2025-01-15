const express = require('express')
const data = require('./data')
const cors = require('cors');


const app = express();
app.use(cors());

app.get("/api/products", (req, res) => {

  res.send(data.products);
});


app.get("/api/products/:id", (req, res) => {
    const id = req.params.id
    const product = data.products.find(x=>x._id==id)
    if(product){
      res.send(product)
    }else{
      res.status(404).send({message:"Product Not Found"})
    }
});

app.listen(5000, () => { console.log("Server started at http://localhost:5000") });