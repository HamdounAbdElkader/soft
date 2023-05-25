const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Admin = require('../models/Admin');
const Student = require('../models/students');
const Teacher = require('../models/teachers');
// Register a new admin, student, or teacher
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  let UserModel;
  switch (role) {
    case 'admin':
      UserModel = Admin;
      break;
    case 'student':
      UserModel = Student;
      break;
    case 'teacher':
      UserModel = Teacher;
      break;
    default:
      return res.status(400).json({ message: 'Invalid user role' });
  }
  // Check if user already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create a new user
  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Login an admin, student, or teacher
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  let UserModel;
  switch (role) {
    case 'admin':
      UserModel = Admin;
      break;
    case 'student':
      UserModel = Student;
      break;
    case 'teacher':
      UserModel = Teacher;
      break;
    default:
      return res.status(400).json({ message: 'Invalid user role' });
  }
  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  // Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, 'secret_key');
  res.header('auth-token', token).json({ token });
});
module.exports = router