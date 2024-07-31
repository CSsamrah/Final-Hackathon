const Assignment = require('../models/Assignment');

const createAssign = async (classTeaches, points, topic, title, description, dueDate, fileUrl, courseName) => {
    try {
        const assignment = new Assignment({
            class: classTeaches,
            points: points, // Ensure points is a number
            topic,
            title,
            description,
            dueDate: new Date(dueDate), // Ensure dueDate is a valid Date object
            courseName, // Ensure courseName is provided
            file: fileUrl, // Ensure file URL is provided
            createdAt: new Date()
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
