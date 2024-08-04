const Assignment=require('../models/Assignment')
const Submission=require('../models/Submission')
const Register=require('../models/Registration')
const {createSubmission}=require('../services/studentServices')
const Teacher = require('../models/Teacher'); 
const {createAssign}=require('../services/teacherService')
const mongoose = require('mongoose');


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
        const student = await Register.findOne({ email });
        if (!student) return res.status(404).send('Student not found.');
        const studentId = student._id;

        const assignment = await Assignment.findOne({ topic });
        if (!assignment) return res.status(404).send('Assignment not found.');
        const assignmentId = assignment._id;

        const blob = bucket.file(`submissions/${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        });

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
        const { classTeaches, points, topic, title, description, dueDate, courseName } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const pointsNumber = Number(points);
        if (isNaN(pointsNumber)) {
            return res.status(400).send('Points must be a number.');
        }

        const blob = bucket.file(`assignments/${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: file.mimetype }
        });

        blobStream.on('error', (err) => res.status(500).send(err));

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            try {
                const assignment = await createAssign(
                    classTeaches,
                    pointsNumber,
                    topic,
                    title,
                    description,
                    dueDate,
                    publicUrl,
                    courseName
                );
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


const getAssignmentUrl = async (req, res) => {
    const { submissionId } = req.params;
  
    if (!submissionId || !mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ message: 'Invalid submission ID' });
    }
  
    try {
      const submission = await Submission.findById(submissionId);
  
      if (!submission) {
        console.error(`Submission with ID ${submissionId} not found.`);
        return res.status(404).json({ message: 'Submission not found' });
      }
  
      const filePath = submission.file;
  
      res.status(200).json({ url: filePath });
    } catch (error) {
      console.error('Error fetching assignment URL:', error);
      res.status(500).json({ message: 'Failed to fetch assignment URL', error: error.message });
    }
  };

module.exports={
    submitAssignment,createAssignment,getAssignmentUrl
}