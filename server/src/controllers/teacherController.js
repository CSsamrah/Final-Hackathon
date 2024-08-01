const Teacher=require('../models/Teacher')
const Assignment=require('../models/Assignment')
const Submission=require('../models/Submission')
const Student=require('../models/Student')


const getSubmittedAssignmentsForClass = async (req, res) => {
    const { teacherId } = req.params; // Assuming you get teacherId from the URL

    try {
        // Step 1: Get the class the teacher is teaching
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const teacherClass = teacher.class;

        // Step 2: Find assignments for the class
        const assignments = await Assignment.find({ class: teacherClass });
        if (!assignments || assignments.length === 0) {
            return res.status(200).json({ message: 'No assignments found for this class' });
        }


        // Step 3: Get submissions for those assignments
        const assignmentIds = assignments.map(assignment => assignment._id);
        const submissions = await Submission.find({ assignmentId: { $in: assignmentIds }, status: 'submitted' })
            .populate('studentId')
            .populate('assignmentId');
        
            console.log('Assignments:', assignments);
            console.log('Submissions:', submissions);

        if (!submissions || submissions.length === 0) {
            return res.status(200).json({ message: 'No submissions found for these assignments' });
        }

        // Step 4: Extract relevant student and assignment information
        const result = submissions.map(submission => ({
            studentId: submission.studentId ? submission.studentId._id : 'Unknown',
            studentName: submission.studentId ? submission.studentId.name : 'Unknown',
            assignmentId: submission.assignmentId ? submission.assignmentId._id : 'Unknown',
            assignmentTitle: submission.assignmentId ? submission.assignmentId.title : 'Unknown',
            submissionDate: submission.submissionDate,
            marks: submission.marks,
            remarks: submission.remarks
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching submitted assignments:', error);
        res.status(500).json({ message: "Failed to fetch submitted assignments", error: error.message || error });
    }
};

const getFailedAssignmentsForClass = async (req, res) => {
    const { teacherId } = req.params;

    try {
        // Get the class the teacher is teaching
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const teacherClass = teacher.class;

        // Find assignments for the class that have passed their due date
        const assignments = await Assignment.find({ class: teacherClass, dueDate: { $lt: new Date() } });
        if (!assignments || assignments.length === 0) {
            return res.status(200).json({ message: 'No overdue assignments found for this class' });
        }

        // Extract assignment IDs
        const assignmentIds = assignments.map(assignment => assignment._id);

        // Find all students in the teacher's class
        const students = await Student.find({ class: teacherClass });
        if (!students || students.length === 0) {
            return res.status(200).json({ message: 'No students found for this class' });
        }

        // Get all submissions by these students
        const submissions = await Submission.find({
            studentId: { $in: students.map(student => student._id) },
            assignmentId: { $in: assignmentIds }
        });

        // Create a map to track assignments and the students who have not submitted
        const failedAssignmentsMap = {};

        assignments.forEach(assignment => {
            failedAssignmentsMap[assignment._id] = {
                assignmentId: assignment._id,
                assignmentTitle: assignment.title,
                dueDate: assignment.dueDate,
                studentsNotSubmitted: []
            };
        });

        const submittedAssignmentsByStudents = new Set(submissions.map(submission => submission.assignmentId.toString()));

        students.forEach(student => {
            assignmentIds.forEach(assignmentId => {
                if (!submittedAssignmentsByStudents.has(assignmentId)) {
                    failedAssignmentsMap[assignmentId].studentsNotSubmitted.push({
                        studentId: student._id,
                        studentName: student.name
                    });
                }
            });
        });

        // Convert the map to an array, filtering out assignments with no students who failed to submit
        const result = Object.values(failedAssignmentsMap).filter(assignment => assignment.studentsNotSubmitted.length > 0);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching failed assignments:', error);
        res.status(500).json({ message: "Failed to fetch failed assignments", error: error.message || error });
    }
};
module.exports = {
    getSubmittedAssignmentsForClass,getFailedAssignmentsForClass
};