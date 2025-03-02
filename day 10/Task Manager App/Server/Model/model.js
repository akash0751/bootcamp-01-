const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true 
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        duedate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Completed"], 
            default: "Open",
            required: true
        },
        done: {
            type: Boolean,
            default: false 
        }
    },
    {
        timestamps: true 
    }
);





const Task = mongoose.model('Task',TaskSchema)

module.exports = Task;