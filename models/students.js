const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
completedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});
module.exports = mongoose.model('Student', StudentSchema);