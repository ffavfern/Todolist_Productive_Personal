const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  reminder: { type: Boolean, default: false }
});

const ToDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, default: 'pending' }
});

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  progress: { type: Number, default: 0 }
});

const TimeManagementSchema = new mongoose.Schema({
  events: [EventSchema],
  todos: [ToDoSchema],
  goals: [GoalSchema]
});

module.exports = mongoose.model('TimeManagement', TimeManagementSchema);
