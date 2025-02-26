const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        rollNo:{
            type:Number,
            required:true,
            unique:[true,{message:'rollNo already exists'}]
        },
        name:{
            type:String,
            required:true
        }
    }
    ,{
        Timestamps :true
    }
) 



const Student= mongoose.model('Student',StudentSchema);
module.exports = Student;