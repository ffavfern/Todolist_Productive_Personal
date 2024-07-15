const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const NutritionSchema = new mongoose.Schema({
  food: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const WeightSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const HealthFitnessSchema = new mongoose.Schema({
  exercises: [ExerciseSchema],
  nutrition: [NutritionSchema],
  weight: [WeightSchema]
});

module.exports = mongoose.model('HealthFitness', HealthFitnessSchema);
