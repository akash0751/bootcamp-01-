const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Model/model')

const app = express();
app.use(express.urlencoded({extended:false}))

app.use(express.json())


app.get("/search/:key", async (req, res) => {
  try {
    const key = req.params.key;
    let students = await Student.find({
      $or: [
        { rollNo: { $regex: key, $options: "i" } }, 
        { name: { $regex: key, $options: "i" } }   
      ]
    });

    // If no students are found, return a message
    if (students.length === 0) {
      return res.status(404).json({ message: " No students found" });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: " Server error", error: error.message });
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