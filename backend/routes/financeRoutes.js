const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

// Budgets
router.get('/budgets', financeController.getBudgets);
router.post('/budgets', financeController.addBudget);

// Transactions
router.get('/transactions', financeController.getTransactions);
router.post('/transactions', financeController.addTransaction);

// Debts
router.get('/debts', financeController.getDebts);
router.post('/debts', financeController.addDebt);
router.put('/debts/:id', financeController.updateDebt);

module.exports = router;
