import  { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:5000/api/todos', {
        headers: { 'x-auth-token': token }
      })
      .then(response => setTodos(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      });
    }
  }, [navigate]);

  const deleteTodo = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { 'x-auth-token': token }
    })
    .then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Todo List</h1>
      <div className="grid gap-4">
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
