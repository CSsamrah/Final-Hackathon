
const Assignment = require('../models/Assignment'); 

const createAssign = async (classTeaches,points,topic,title, description, dueDate, teacherId, fileUrl) => {
    try {
        const assignment = new Assignment({
            title,
            description,
            dueDate,
            teacherId,
            createdAt: new Date(),
            file: fileUrl ,// Ensure this field matches your model
            points,
            class:classTeaches,
            topic
        });

        await assignment.save();
        return assignment;
    } catch (error) {
        throw new Error(`Error saving assignment: ${error.message}`);
    }
};

module.exports = {
    createAssign
};
