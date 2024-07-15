import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiClipboard, FiPlusCircle } from 'react-icons/fi'; // นำเข้าไอคอนที่ถูกต้อง

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsRes = await axios.get('http://localhost:5000/api/work/projects');
      const ideasRes = await axios.get('http://localhost:5000/api/work/ideas');
      setProjects(projectsRes.data);
      setIdeas(ideasRes.data);
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
      <h1 className="text-4xl font-bold mb-6 text-center">Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiClipboard />, 'โปรเจกต์', projects.length ? `${projects.length} โปรเจกต์` : 'ไม่มีโปรเจกต์')}
        {renderCard(<FiPlusCircle />, 'ไอเดีย', ideas.length ? `${ideas.length} ไอเดีย` : 'ไม่มีไอเดีย')}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">ไอเดียที่บันทึกไว้</h2>
        <div className="bg-white p-4 rounded shadow">
          {ideas.length ? ideas.map((idea, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{idea.title}</h3>
              <p>{idea.description}</p>
              <p>{`บันทึกเมื่อ ${new Date(idea.date).toLocaleDateString()}`}</p>
            </div>
          )) : 'ไม่มีไอเดียที่บันทึกไว้'}
        </div>
      </div>
    </div>
  );
};

export default Work;
