const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

// Study Schedules
router.get('/study-schedules', educationController.getStudySchedules);
router.post('/study-schedules', educationController.addStudySchedule);

// Homeworks
router.get('/homeworks', educationController.getHomeworks);
router.post('/homeworks', educationController.addHomework);
router.put('/homeworks/:id', educationController.updateHomework);

// Exams
router.get('/exams', educationController.getExams);
router.post('/exams', educationController.addExam);

// Books
router.get('/books', educationController.getBooks);
router.post('/books', educationController.addBook);
router.put('/books/:id', educationController.updateBookProgress);

// Online Courses
router.get('/online-courses', educationController.getOnlineCourses);
router.post('/online-courses', educationController.addOnlineCourse);
router.put('/online-courses/:id', educationController.updateCourseProgress);

module.exports = router;
