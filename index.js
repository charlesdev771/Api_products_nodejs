const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/Product");

app.use(
    express.urlencoded({
        extended: true,
    }),

)

app.use(express.json());

app.get('/', (req, res) =>{
    
    try 
    {
        res.json({ message: "Hello WOrld!" });
    }
    catch (error) 
    {
        res.json({message: error})    
    }
    
});



mongoose.connect(
    'mongodb+srv://ccod:eWqtVlff9dcTDiGQ@cluster0.oxfzeyg.mongodb.net/?retryWrites=true&w=majority'
).then(() => 
{
    console.log("Its work!");
    app.listen(7777)
}).catch((err) => 
    console.log(err))