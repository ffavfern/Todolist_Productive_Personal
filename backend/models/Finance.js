const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  month: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  expenses: { type: Number, default: 0 },
  income: { type: Number, default: 0 }
});

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // income or expense
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const DebtSchema = new mongoose.Schema({
  creditor: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false }
});

const FinanceSchema = new mongoose.Schema({
  budgets: [BudgetSchema],
  transactions: [TransactionSchema],
  debts: [DebtSchema]
});

module.exports = mongoose.model('Finance', FinanceSchema);
