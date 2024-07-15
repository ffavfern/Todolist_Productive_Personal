const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

// Projects
router.get('/projects', workController.getProjects);
router.post('/projects', workController.addProject);
router.post('/projects/tasks', workController.addTaskToProject);
router.put('/projects/tasks/status', workController.updateTaskStatus);

// Ideas
router.get('/ideas', workController.getIdeas);
router.post('/ideas', workController.addIdea);

module.exports = router;
