const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.get('/',(req,res) => {
    
    res.json({message:"hello world"})
})


app.use(express.json());


app.listen(3000,()=>{
    console.log('server is running on 3000')
})