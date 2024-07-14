const TimeManagement = require('../models/TimeManagement');

// Events
exports.getEvents = async (req, res) => {
  try {
    const timeManagement = await TimeManagement.findOne();
    res.json(timeManagement ? timeManagement.events : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addEvent = async (req, res) => {
  const { title, description, date, reminder } = req.body;
  try {
    const newEvent = { title, description, date, reminder };
    let timeManagement = await TimeManagement.findOne();
    if (!timeManagement) {
      timeManagement = new TimeManagement({ events: [newEvent], todos: [], goals: [] });
    } else {
      timeManagement.events.push(newEvent);
    }
    await timeManagement.save();
    res.json(timeManagement.events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Todos
exports.getTodos = async (req, res) => {
  try {
    const timeManagement = await TimeManagement.findOne();
    res.json(timeManagement ? timeManagement.todos : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addTodo = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const newTodo = { title, description, dueDate, status };
    let timeManagement = await TimeManagement.findOne();
    if (!timeManagement) {
      timeManagement = new TimeManagement({ events: [], todos: [newTodo], goals: [] });
    } else {
      timeManagement.todos.push(newTodo);
    }
    await timeManagement.save();
    res.json(timeManagement.todos);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  try {
    const timeManagement = await TimeManagement.findOne();
    const todo = timeManagement.todos.id(id);
    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.status = status || todo.status;

    await timeManagement.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const timeManagement = await TimeManagement.findOne();
    timeManagement.todos.id(id).remove();
    await timeManagement.save();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Goals
exports.getGoals = async (req, res) => {
  try {
    const timeManagement = await TimeManagement.findOne();
    res.json(timeManagement ? timeManagement.goals : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addGoal = async (req, res) => {
  const { title, description, dueDate, progress } = req.body;
  try {
    const newGoal = { title, description, dueDate, progress };
    let timeManagement = await TimeManagement.findOne();
    if (!timeManagement) {
      timeManagement = new TimeManagement({ events: [], todos: [], goals: [newGoal] });
    } else {
      timeManagement.goals.push(newGoal);
    }
    await timeManagement.save();
    res.json(timeManagement.goals);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, progress } = req.body;
  try {
    const timeManagement = await TimeManagement.findOne();
    const goal = timeManagement.goals.id(id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });

    goal.title = title || goal.title;
    goal.description = description || goal.description;
    goal.dueDate = dueDate || goal.dueDate;
    goal.progress = progress !== undefined ? progress : goal.progress;

    await timeManagement.save();
    res.json(goal);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const timeManagement = await TimeManagement.findOne();
    timeManagement.goals.id(id).remove();
    await timeManagement.save();
    res.json({ msg: 'Goal removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
