const Submission = require('../models/Submission');

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

module.exports = {
    createSubmission
};
