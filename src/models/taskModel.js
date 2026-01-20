const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [255, 'Title cannot exceed 255 characters'],
        minlength: [3, 'Title must be at least 3 characters long'],
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: '{VALUE} is not supported',
        },
        default: 'pending',
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            messae: '{VALUE} is not a valid priority'
        },
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},
{
    timestamps: true,
}
);
    

//  Create indexes for better performance
taskSchema.index({ title: 'text' });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ createdAt: -1 });
taskSchema.index({ updatedAt: -1 });

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

