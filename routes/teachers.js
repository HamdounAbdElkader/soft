
const express = require('express');
const Teacher = require('../models/teachers');
const Course = require('../models/courses');

const router = express.Router();
// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({})
    res.json(teachers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Get a teacher by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    res.json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
//make teacher teach
router.post('/:id/teach', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(400).json({ message: 'Invalid course ID' });
    // Check if student has completed all prerequisites for the course

    teacher.courses.push(course);
    await teacher.save();
    res.status(201).json({ message: 'teached for course' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get courses by teacher ID
router.get('/:id/courses', async (req, res) => {
  const teacherId = req.params.id;
  if (!teacherId) {
    return res.status(400).send('Missing required parameter: id');
  }
  try {
    const courses = await Teacher.findById(teacherId).populate('courses')
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
module.exports = router;
