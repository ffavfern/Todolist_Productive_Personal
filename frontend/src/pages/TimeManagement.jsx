import  { useState, useEffect } from 'react';
import axios from 'axios';

const TimeManagement = () => {
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', reminder: false });
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '', status: 'pending' });
  const [newGoal, setNewGoal] = useState({ title: '', description: '', dueDate: '', progress: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const eventsRes = await axios.get('http://localhost:5000/api/time-management/events');
      const todosRes = await axios.get('http://localhost:5000/api/time-management/todos');
      const goalsRes = await axios.get('http://localhost:5000/api/time-management/goals');
      setEvents(eventsRes.data);
      setTodos(todosRes.data);
      setGoals(goalsRes.data);
    };

    fetchData();
  }, []);

  const handleEventChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/time-management/events', newEvent);
    setEvents(res.data);
    setNewEvent({ title: '', description: '', date: '', reminder: false });
  };

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/time-management/todos', newTodo);
    setTodos(res.data);
    setNewTodo({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/time-management/goals', newGoal);
    setGoals(res.data);
    setNewGoal({ title: '', description: '', dueDate: '', progress: 0 });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Time Management</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Event</h2>
        <form onSubmit={handleEventSubmit}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={newEvent.title} onChange={handleEventChange} required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" value={newEvent.description} onChange={handleEventChange} />
          </div>
          <div>
            <label>Date</label>
            <input type="date" name="date" value={newEvent.date} onChange={handleEventChange} required />
          </div>
          <div>
            <label>Reminder</label>
            <input type="checkbox" name="reminder" checked={newEvent.reminder} onChange={handleEventChange} />
          </div>
          <button type="submit">Add Event</button>
        </form>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title} - {event.date}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <form onSubmit={handleTodoSubmit}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={newTodo.title} onChange={handleTodoChange} required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" value={newTodo.description} onChange={handleTodoChange} />
          </div>
          <div>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={newTodo.dueDate} onChange={handleTodoChange} />
          </div>
          <div>
            <label>Status</label>
            <select name="status" value={newTodo.status} onChange={handleTodoChange}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo.title} - {todo.dueDate}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Add Goal</h2>
        <form onSubmit={handleGoalSubmit}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={newGoal.title} onChange={handleGoalChange} required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" value={newGoal.description} onChange={handleGoalChange} />
          </div>
          <div>
            <label>Due Date</label>
            <input type="date" name="dueDate" value={newGoal.dueDate} onChange={handleGoalChange} />
          </div>
          <div>
            <label>Progress</label>
            <input type="number" name="progress" value={newGoal.progress} onChange={handleGoalChange} min="0" max="100" />
          </div>
          <button type="submit">Add Goal</button>
        </form>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>{goal.title} - {goal.progress}%</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeManagement;
