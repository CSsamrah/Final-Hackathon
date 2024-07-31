const Assignment=require('../models/Assignment')
const Student=require('../models/Student')
const {createSubmission}=require('../services/studentServices')
const Teacher = require('../models/Teacher'); 
const {createAssign}=require('../services/teacherService')


var admin = require("firebase-admin");

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://assignmentproject-a5ea3.appspot.com"
});

var bucket = admin.storage().bucket();

// submit assignment 
const submitAssignment = async (req, res) => {
    const { email, topic } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).send('Student not found.');
        const studentId = student.studentId;

        const assignment = await Assignment.findOne({ topic });
        if (!assignment) return res.status(404).send('Assignment not found.');
        const assignmentId = assignment._id;

        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({ metadata: { contentType: file.mimetype } });

        blobStream.on('error', (err) => res.status(500).send(err));

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            try {
                await createSubmission(studentId, assignmentId, publicUrl);
                res.status(200).send({ message: 'Assignment submitted successfully', fileUrl: publicUrl });
            } catch (error) {
                res.status(500).send({ message: 'Error submitting assignment', error: error.message });
            }
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createAssignment = async (req, res) => {
    try {
        const {classTeaches,points,topic,title, description, dueDate } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // // Ensure teacher exists
        // const teacher = await Teacher.findById(teacherId);
        // if (!teacher) {
        //     return res.status(404).send('Teacher not found.');
        // }

        // Upload file to Firebase Storage
        const blob = bucket.file(`${Date.now()}_${file.originalname}`); // Add timestamp to avoid overwriting
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            return res.status(500).send(err);
        });

        blobStream.on('finish', async () => {
            // Get the public URL for the file
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            try {
                const assignment = await createAssign(classTeaches,topic,points,title, description, dueDate, publicUrl);
                res.status(200).send({ message: 'Assignment uploaded successfully', fileUrl: publicUrl });
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).send({ message: 'Error creating assignment', error: error.message });
    }
};

module.exports={
    submitAssignment,createAssignment
}