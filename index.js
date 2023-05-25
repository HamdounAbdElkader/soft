const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const courseRoutes = require('./routes/courses');
const adminRoutes = require('./routes/admin');
const authorize = require('./routes/autharization');
const app = express();
app.use(bodyParser.json());
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/courses', courseRoutes);
app.use('/admin', adminRoutes);
app.use('/authorize', authorize);
mongoose.connect('mongodb://0.0.0.0:27017/db')
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });