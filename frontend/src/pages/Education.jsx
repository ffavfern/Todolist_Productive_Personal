import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBook, FiBookOpen, FiVideo } from 'react-icons/fi';

const Education = () => {
  const [studySchedules, setStudySchedules] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [exams, setExams] = useState([]); // ตรวจสอบการใช้งาน exams
  const [books, setBooks] = useState([]);
  const [onlineCourses, setOnlineCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studySchedulesRes = await axios.get('http://localhost:5000/api/education/study-schedules');
      const homeworksRes = await axios.get('http://localhost:5000/api/education/homeworks');
      const examsRes = await axios.get('http://localhost:5000/api/education/exams');
      const booksRes = await axios.get('http://localhost:5000/api/education/books');
      const onlineCoursesRes = await axios.get('http://localhost:5000/api/education/online-courses');
      setStudySchedules(studySchedulesRes.data);
      setHomeworks(homeworksRes.data);
      setExams(examsRes.data);
      setBooks(booksRes.data);
      setOnlineCourses(onlineCoursesRes.data);
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
      <h1 className="text-4xl font-bold mb-6 text-center">Education</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiBook />, 'ตารางเรียน', studySchedules.length ? `${studySchedules.length} รายการ` : 'ไม่มีตารางเรียน')}
        {renderCard(<FiBookOpen />, 'การบ้าน', homeworks.length ? `${homeworks.length} การบ้าน` : 'ไม่มีการบ้าน')}
        {renderCard(<FiVideo />, 'คอร์สออนไลน์', onlineCourses.length ? `${onlineCourses.length} คอร์ส` : 'ไม่มีคอร์สออนไลน์')}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">หนังสือที่อ่าน</h2>
        <div className="bg-white p-4 rounded shadow">
          {books.length ? books.map((book, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p>{book.author}</p>
              <p>{`หน้า ${book.currentPage} จาก ${book.totalPages}`}</p>
            </div>
          )) : 'ไม่มีหนังสือที่อ่าน'}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">การสอบ</h2>
        <div className="bg-white p-4 rounded shadow">
          {exams.length ? exams.map((exam, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exam.subject}</h3>
              <p>{new Date(exam.date).toLocaleDateString()}</p>
              <p>{`${exam.startTime} - ${exam.endTime}`}</p>
            </div>
          )) : 'ไม่มีการสอบ'}
        </div>
      </div>
    </div>
  );
};

export default Education;
