const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        id:{
            type:Number,
            required:true
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