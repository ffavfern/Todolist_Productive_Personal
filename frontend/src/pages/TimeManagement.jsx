import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCalendar, FiList, FiTarget } from 'react-icons/fi';

const TimeManagement = () => {
  const [calendar, setCalendar] = useState([]);
  const [todos, setTodos] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const calendarRes = await axios.get('http://localhost:5000/api/time-management/calendar');
      const todosRes = await axios.get('http://localhost:5000/api/time-management/todos');
      const goalsRes = await axios.get('http://localhost:5000/api/time-management/goals');
      setCalendar(calendarRes.data);
      setTodos(todosRes.data);
      setGoals(goalsRes.data);
    };

    fetchData();
  }, []);

  const renderCard = (icon, title, content) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
      <div className="text-2xl text-primary">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-gray-700">{content}</div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Time Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiCalendar />, 'ปฏิทิน', calendar.length ? `${calendar.length} กิจกรรม` : 'ไม่มีข้อมูลปฏิทิน')}
        {renderCard(<FiList />, 'รายการสิ่งที่ต้องทำ (To-Do List)', todos.length ? `${todos.length} รายการ` : 'ไม่มีรายการสิ่งที่ต้องทำ')}
        {renderCard(<FiTarget />, 'การตั้งเป้าหมาย', goals.length ? `${goals.length} เป้าหมาย` : 'ไม่มีการตั้งเป้าหมาย')}
      </div>
    </div>
  );
};

export default TimeManagement;
