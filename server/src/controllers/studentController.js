const Assignment=require("../models/Assignment")
const Student=require('../models/Student')
const Submission=require('../models/Submission')

const getCurrentAssignments = async (req, res) => {
    try {
        const { studentId } = req.params; 

       
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const studentClass = student.class;

       
        const futureAssignments = await Assignment.find({ class: studentClass, dueDate: { $gte: new Date() } });

        
        const studentSubmissions = await Submission.find({ studentId, assignmentId: { $in: futureAssignments.map(a => a._id) } });

        
        const submittedAssignmentIds = new Set(studentSubmissions.map(sub => sub.assignmentId.toString()));

        const unsubmittedAssignments = futureAssignments.filter(assignment => !submittedAssignmentIds.has(assignment._id.toString()));

        res.status(200).json(unsubmittedAssignments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch current assignments", error });
    }
};

const getSubmittedAssignments = async (req, res) => {
    const { studentId } = req.params;

    try {
        const submissions = await Submission.find({ studentId }).populate('assignmentId');
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch submitted assignments", error });
    }
};
const getFailedAssignments = async (req, res) => {
    const { studentId } = req.params;

    try {
       
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const assignments = await Assignment.find({ class: student.class });

        const submissions = await Submission.find({ studentId });

        const submittedAssignmentIds = submissions.map(submission => submission.assignmentId.toString());

        const failedAssignments = assignments.filter(assignment => !submittedAssignmentIds.includes(assignment._id.toString()));

        res.status(200).json(failedAssignments);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch failed assignments", error });
    }
};

module.exports={
    getCurrentAssignments,getSubmittedAssignments,getFailedAssignments
}