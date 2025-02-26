const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Model/model')
const { body, param, validationResult } = require("express-validator");
const app = express();


app.use(express.json());

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

app.get('/students',async (req,res)=>{
    try{
        const students = await Student.find();
        res.status(201).json(students)
    }catch(error){
        res.status(500).json(error)
    }
})

app.post(
    "/students",
    [
        body("rollNo").matches(/^\d{4,10}$/).withMessage("Roll No must be 4-10 digits"),
        body("name").isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters")
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { rollNo, name} = req.body;
            const student = new Student({ rollNo, name });
            await student.save();
            res.status(201).json(student);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);

app.get(
    "/students/:id",
    [
        param("id").isMongoId().withMessage("Invalid MongoDB ID"),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

app.put(
    "/students/:id",
    [
        param("id").isMongoId().withMessage("Invalid MongoDB ID"),
        body("rollNo").optional().matches(/^\d{4,10}$/).withMessage("Roll No must be 4-10 digits"),
        body("name").optional().isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters")
    ],
    validateRequest,
    async (req, res) => {
        try {
            const id = req.params.id;
            const student = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);
app.delete(
    "/students/:id",
    [
        param("id").isMongoId().withMessage("Invalid MongoDB ID"),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const student = await Student.findByIdAndDelete(req.params.id);
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json({ message: "Student deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
);



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