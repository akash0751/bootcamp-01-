
const express = require('express');
const mongoose = require('mongoose');
const StudentRoutes = require('./Routes/routes')
const Student = require('./Model/model')
const app = express();

app.use('/student',StudentRoutes);

app.use(express.json());

app.get('/students',async (req,res)=>{
    try{
        const students1 = await Student.find();
        res.json(students1);
    }catch(error){
        res.json({message:"error"})
    }
})


app.post('/add', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student)
    } catch (error) {
        res.status(500).send("Error");
    }
});

app.listen(3000,(req,res)=>{
    console.log('server is running on port 3000');
})
mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://akashsit2022:root1234@cluster0.6blnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})

