const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    rollNo: {
        type: Number,
        required: [true, "Roll Number is required"],
        unique: true,
        match: [/^\d{4,10}$/, "Roll Number must be 4-10 digits"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be at most 50 characters"],
    }}
    ,{
        Timestamps :true
    }
);



const Student= mongoose.model('Student',StudentSchema);
module.exports = Student;