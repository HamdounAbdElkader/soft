const express = require('express');
const Student = require('../models/students');
const Teacher = require('../models/teachers');
const Course = require('../models/courses');
const Department = require('../models/department');
const router = express.Router();
// Create a new student
router.post('/students', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const department = req.body.department;

  if (!name || !email || !department || !password) {
    return res.status(400).send('Missing required parameters');
  }
  try {
    const student = new Student({ name, email, department, password });
    await student.save();
    res.status(201).send('Student created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Create a new teacher
router.post('/teachers', async (req, res) => {
  const name = req.body.name;
  const department = req.body.department;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !department || !email || !password) {
    return res.status(400).send('Missing required parameters');
  }
  try {
    const teacher = new Teacher({ name, department, email, password });
    await teacher.save();
    res.status(201).send('Teacher created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Create a new course
router.post('/courses', async (req, res) => {
  const name = req.body.name;
  const teacherId = req.body.teacherId;
  if (!name || !teacherId) {
    return res.status(400).send('Missing required parameters');
  }
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }
    const course = new Course({ name, teacher: teacher._id });
    await course.save();
    res.status(201).send('Course created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Create a new department
router.post('/departments', async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).send('Missing required parameters');
  }
  try {
    const department = new Department({ name });
    await department.save();
    res.status(201).send('Department created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
module.exports = router;
