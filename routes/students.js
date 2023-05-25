const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const Course = require('../models/courses');

// Get all Students
router.get('/', async (req, res) => {
  try {
    const Students = await Student.find({})
    res.json(Students);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Get a Students by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).send('student not found');
    }
    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// Get all courses for a student

router.post('/:id/enroll', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(400).json({ message: 'Invalid course ID' });
    // Check if student has completed all prerequisites for the course
    const prerequisiteCourses = course.prerequisites;
    const completedPrerequisites = student.completedCourses.filter(course =>
      prerequisiteCourses.includes(course));
    if (completedPrerequisites.length !== prerequisiteCourses.length) {
      return res.status(400).json({ message: 'Student has not completed all prerequisites forthis course' });
    }
    student.courses.push(course);
    await student.save();
    res.status(201).json({ message: 'Enrolled in course' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id/courses', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('courses');
    res.json(student.courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;