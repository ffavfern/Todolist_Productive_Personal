const express = require('express');
const router = express.Router();
const timeManagementController = require('../controllers/timeManagementController');

// Events
router.get('/events', timeManagementController.getEvents);
router.post('/events', timeManagementController.addEvent);

// Todos
router.get('/todos', timeManagementController.getTodos);
router.post('/todos', timeManagementController.addTodo);
router.put('/todos/:id', timeManagementController.updateTodo);
router.delete('/todos/:id', timeManagementController.deleteTodo);

// Goals
router.get('/goals', timeManagementController.getGoals);
router.post('/goals', timeManagementController.addGoal);
router.put('/goals/:id', timeManagementController.updateGoal);
router.delete('/goals/:id', timeManagementController.deleteGoal);

module.exports = router;
