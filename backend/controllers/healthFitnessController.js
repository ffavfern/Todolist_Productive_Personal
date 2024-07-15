const HealthFitness = require('../models/HealthFitness');

// Exercises
exports.getExercises = async (req, res) => {
  try {
    const healthFitness = await HealthFitness.findOne();
    res.json(healthFitness ? healthFitness.exercises : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addExercise = async (req, res) => {
  const { type, duration, caloriesBurned } = req.body;
  try {
    const newExercise = { type, duration, caloriesBurned };
    let healthFitness = await HealthFitness.findOne();
    if (!healthFitness) {
      healthFitness = new HealthFitness({ exercises: [newExercise], nutrition: [], weight: [] });
    } else {
      healthFitness.exercises.push(newExercise);
    }
    await healthFitness.save();
    res.json(healthFitness.exercises);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Nutrition
exports.getNutrition = async (req, res) => {
  try {
    const healthFitness = await HealthFitness.findOne();
    res.json(healthFitness ? healthFitness.nutrition : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addNutrition = async (req, res) => {
  const { food, calories } = req.body;
  try {
    const newNutrition = { food, calories };
    let healthFitness = await HealthFitness.findOne();
    if (!healthFitness) {
      healthFitness = new HealthFitness({ exercises: [], nutrition: [newNutrition], weight: [] });
    } else {
      healthFitness.nutrition.push(newNutrition);
    }
    await healthFitness.save();
    res.json(healthFitness.nutrition);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Weight
exports.getWeight = async (req, res) => {
  try {
    const healthFitness = await HealthFitness.findOne();
    res.json(healthFitness ? healthFitness.weight : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addWeight = async (req, res) => {
  const { weight } = req.body;
  try {
    const newWeight = { weight };
    let healthFitness = await HealthFitness.findOne();
    if (!healthFitness) {
      healthFitness = new HealthFitness({ exercises: [], nutrition: [], weight: [newWeight] });
    } else {
      healthFitness.weight.push(newWeight);
    }
    await healthFitness.save();
    res.json(healthFitness.weight);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
