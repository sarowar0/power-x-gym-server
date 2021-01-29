const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//express middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Mongodb conectiones
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrix8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
  const classesCollection = client.db('power-x').collection("classes");
  const priceCollection = client.db('power-x').collection("price");
  const journeyCollection = client.db('power-x').collection("journey");

    app.get('/class-list', (req, res) => {
        classesCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/price-plan', (req, res) => {
        priceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/journey',(req, res) => {
        const journey = req.body;
        journeyCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
        
    })

});


app.get('/', (req, res) =>{
    res.send("I am working")
})

app.listen(port);