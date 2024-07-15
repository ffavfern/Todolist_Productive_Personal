const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false }
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [TaskSchema],
  progress: { type: Number, default: 0 }
});

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const WorkSchema = new mongoose.Schema({
  projects: [ProjectSchema],
  ideas: [IdeaSchema]
});

module.exports = mongoose.model('Work', WorkSchema);
