const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    rollNo: {
        type: String,
        required: [true, "Roll Number is required"],
        unique: true,
        
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    year:{
        type: String,
        required: [true, "Year is required"]
    },
    dept:{
        year:{
            type: String,
            required: [true, "Year is required"]
        }
    }
}
    ,{
        Timestamps :true
    }
);

const Student = mongoose.model('Student',StudentSchema)
module.exports = Student;