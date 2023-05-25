
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
name: { type: String, required: true },
teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
prerequisites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});
module.exports = mongoose.model('Course', CourseSchema)