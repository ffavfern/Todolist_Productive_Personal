const mongoose = require('mongoose');

const StudyScheduleSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

const HomeworkSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false }
});

const ExamSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, default: 0 }
});

const OnlineCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  progress: { type: Number, default: 0 }
});

const EducationSchema = new mongoose.Schema({
  studySchedules: [StudyScheduleSchema],
  homeworks: [HomeworkSchema],
  exams: [ExamSchema],
  books: [BookSchema],
  onlineCourses: [OnlineCourseSchema]
});

module.exports = mongoose.model('Education', EducationSchema);
