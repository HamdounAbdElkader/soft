const express = require('express');
const Teacher = require('../models/teachers');
const Course = require('../models/courses');
const router = express.Router();
// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({})
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
// Get a course by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});
 

module.exports = router;