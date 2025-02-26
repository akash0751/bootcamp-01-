const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Model/model')
const app = express();
const { body, param, query, validationResult } = require("express-validator");


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


app.get(
    "/students",
    [
        query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
        query("pageSize").optional().isInt({ min: 1, max: 100 }).withMessage("PageSize must be between 1 and 100"),
    ],
    validateRequest,
    async (req, res) => {
        try {
            let { page = 1, pageSize = 10 } = req.query;
            page = parseInt(page);
            pageSize = parseInt(pageSize);

            const totalStudents = await Student.countDocuments();
            const totalPages = Math.ceil(totalStudents / pageSize);

            const students = await Student.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            res.json({
                totalStudents,
                totalPages,
                currentPage: page,
                pageSize,
                students,
            });
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