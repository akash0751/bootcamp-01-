const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Model/model')
const app = express();


app.use(express.json());

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

app.put('/students/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const students = await Student.findByIdAndUpdate(id, req.body,{new:true})

        if(!students){
          return  res.status(400).json({message:"not found"})
        }
        const updatedStudent = await Student.findById(id);
        return res.json(updatedStudent);

    }
    catch(error){
        res.status(500).json(error);
    }
})

app.delete('/students/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const students = await Student.findByIdAndDelete(id)

        if(!students){
            return res.status(400).json({message:"not found"})}
            const deletedStudent = await Student.findById(id);
            return res.status(201).json(deletedStudent);

    }catch(error)
    {
        res.status(500).json(error);
    }

})




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