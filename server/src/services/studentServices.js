const Submission = require('../models/Submission');
const Student = require('../models/Student');

const createSubmission = async (studentId, assignmentId, fileUrl) => {
    try {
        const submission = new Submission({
            studentId,
            assignmentId,
            submissionDate: new Date(),
            file: fileUrl,
            status: 'submitted'
        });

        await submission.save();
        return submission;
    } catch (error) {
        throw error;
    }
};

const createStudent = async (registrationId, name, studentClass) => {
    try {
        const newStudent = new Student({
            name,
            studentId: registrationId, // Use the ObjectId from the Registration entry
            class: studentClass
        });

        const savedStudent = await newStudent.save();
        return savedStudent;
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
    }
};
module.exports = {
    createSubmission,createStudent
};
