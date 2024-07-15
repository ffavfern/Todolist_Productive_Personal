import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiActivity, FiCoffee, FiTrendingUp } from 'react-icons/fi';

const Health = () => {
  const [exercises, setExercises] = useState([]);
  const [nutritions, setNutritions] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const exercisesRes = await axios.get('http://localhost:5000/api/health/exercises');
      const nutritionsRes = await axios.get('http://localhost:5000/api/health/nutritions');
      const weightsRes = await axios.get('http://localhost:5000/api/health/weights');
      setExercises(exercisesRes.data);
      setNutritions(nutritionsRes.data);
      setWeights(weightsRes.data);
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
      <h1 className="text-4xl font-bold mb-6 text-center">Health</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiActivity />, 'การออกกำลังกาย', exercises.length ? `${exercises.length} กิจกรรม` : 'ไม่มีการออกกำลังกาย')}
        {renderCard(<FiCoffee />, 'โภชนาการ', nutritions.length ? `${nutritions.length} รายการ` : 'ไม่มีข้อมูลโภชนาการ')}
        {renderCard(<FiTrendingUp />, 'น้ำหนัก', weights.length ? `${weights.length} บันทึก` : 'ไม่มีข้อมูลน้ำหนัก')}
      </div>
    </div>
  );
};

export default Health;
