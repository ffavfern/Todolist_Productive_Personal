const Finance = require('../models/Finance');

// Budgets
exports.getBudgets = async (req, res) => {
  try {
    const finance = await Finance.findOne();
    res.json(finance ? finance.budgets : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addBudget = async (req, res) => {
  const { month, totalBudget } = req.body;
  try {
    const newBudget = { month, totalBudget };
    let finance = await Finance.findOne();
    if (!finance) {
      finance = new Finance({ budgets: [newBudget], transactions: [], debts: [] });
    } else {
      finance.budgets.push(newBudget);
    }
    await finance.save();
    res.json(finance.budgets);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Transactions
exports.getTransactions = async (req, res) => {
  try {
    const finance = await Finance.findOne();
    res.json(finance ? finance.transactions : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addTransaction = async (req, res) => {
  const { type, amount, description } = req.body;
  try {
    const newTransaction = { type, amount, description };
    let finance = await Finance.findOne();
    if (!finance) {
      finance = new Finance({ budgets: [], transactions: [newTransaction], debts: [] });
    } else {
      finance.transactions.push(newTransaction);
    }
    await finance.save();
    res.json(finance.transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Debts
exports.getDebts = async (req, res) => {
  try {
    const finance = await Finance.findOne();
    res.json(finance ? finance.debts : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addDebt = async (req, res) => {
  const { creditor, amount, dueDate } = req.body;
  try {
    const newDebt = { creditor, amount, dueDate };
    let finance = await Finance.findOne();
    if (!finance) {
      finance = new Finance({ budgets: [], transactions: [], debts: [newDebt] });
    } else {
      finance.debts.push(newDebt);
    }
    await finance.save();
    res.json(finance.debts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateDebt = async (req, res) => {
  const { id } = req.params;
  const { paid } = req.body;
  try {
    const finance = await Finance.findOne();
    const debt = finance.debts.id(id);
    if (!debt) return res.status(404).json({ msg: 'Debt not found' });

    debt.paid = paid !== undefined ? paid : debt.paid;

    await finance.save();
    res.json(debt);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
