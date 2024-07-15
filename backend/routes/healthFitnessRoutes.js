const express = require('express');
const router = express.Router();
const healthFitnessController = require('../controllers/healthFitnessController');

// Exercises
router.get('/exercises', healthFitnessController.getExercises);
router.post('/exercises', healthFitnessController.addExercise);

// Nutrition
router.get('/nutrition', healthFitnessController.getNutrition);
router.post('/nutrition', healthFitnessController.addNutrition);

// Weight
router.get('/weight', healthFitnessController.getWeight);
router.post('/weight', healthFitnessController.addWeight);

module.exports = router;
