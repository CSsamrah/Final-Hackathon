const express = require('express');
const router = express.Router();

const {loginUser,signupUser}=require('../controllers/registerControllers');
const { submitAssignment,createAssignment } = require('../controllers/assignmentControllers');

const multer = require('multer');
const { getCurrentAssignments, getSubmittedAssignments, getFailedAssignments } = require('../controllers/studentController');
const {getSubmittedAssignmentsForClass, getFailedAssignmentsForClass}=require('../controllers/teacherController')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // limit file size to 5MB
  });


router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/submit',upload.single('file'),submitAssignment);
router.post('/create',upload.single('file'),createAssignment);
router.get('/current/:studentId',getCurrentAssignments)
router.get('/submitted/:studentId',getSubmittedAssignments)
router.get('/failed/:studentId',getFailedAssignments)
router.get('/studentsSubmitted/:teacherId',getSubmittedAssignmentsForClass)
router.get('/studentsfailed/:teacherId',getFailedAssignmentsForClass)
module.exports = router;