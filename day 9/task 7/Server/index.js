const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const Student = require('./Model/model')


const app = express()

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


app.get('/students',async (req,res)=>{
    try{
        const students1 = await Student.find();
        res.json(students1);
    }catch(error){
        res.json({message:"error"})
    }
})

app.get('/students/:id', async (req, res) => {
    try {
        const id  = req.params.id
        const students =  await Student.findById(id)
        res.status(201).json(students);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.post('/add', async (req, res) => {
        const students1 = await Student.create(req.body);
        res.status(201).json(students1)
    
});

app.listen(3000,(req,res)=>{
    console.log("Server running on port 3000")
})

mongoose.connect('mongodb+srv://akashsit2022:akash12345@cluster0.6blnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log('connected'))