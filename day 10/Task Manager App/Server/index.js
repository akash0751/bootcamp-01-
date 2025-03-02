const express = require('express');
const mongoose = require('mongoose')
const Task = require('./Model/model')
const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    
    next();
});

app.get('/tasks',async(req,res)=>{
    try{
        const task = await Task.find()
        res.status(201).json(task)
    }catch(error){
        res.status(404).json({message:'not found'})
    }
})

app.post('/tasks',async(req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json(task);
})

app.put('/tasks/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const task = await Task.findByIdAndUpdate(id, req.body,{new:true})

        if(!task){
          return  res.status(400).json({message:"not found"})
        }
        const updatedTask = await Task.findById(id);
        return res.json(updatedTask);

    }
    catch(error){
        res.status(500).json(error);
    }
})

app.delete('/tasks/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)

        if(!task){
            return res.status(400).json({message:"not found"})}
            const deletedTask = await Task.findById(id);
            return res.status(201).json(deletedTask);

    }catch(error)
    {
        res.status(500).json(error);
    }

})

app.listen(3000,(req,res)=>{
    console.log("server running on port 3000")
})

mongoose.connect('mongodb+srv://akashnewoff05:akash0005@cluster0.k6woe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(console.log("Connected"));