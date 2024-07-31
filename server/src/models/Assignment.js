const mongoose = require('mongoose');
const { Schema } = mongoose;

const AssignmentSchema = new mongoose.Schema({
    class: { type: String, required: true },
    points: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    topic: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    courseName: { type: String, required: true },
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Assignment= mongoose.model('Assignment', AssignmentSchema);
module.exports =Assignment;