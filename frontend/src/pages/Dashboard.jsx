import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiCalendar, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [data, setData] = useState({
    education: null,
    finance: null,
    healthFitness: null,
    timeManagement: null,
    work: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/dashboard');
      setData(res.data);
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

  const renderSection = (title, content) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="bg-white p-4 rounded shadow">
        {content || `ไม่มีการวางแผน${title}`}
      </div>
    </div>
  );

  const renderEducation = (education) => (
    <div>
      {education ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">ตารางเรียน</h3>
          {education.studySchedules?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {education.studySchedules.map((schedule, index) => (
                <li key={index}>
                  {schedule.subject} - {new Date(schedule.date).toLocaleDateString()} - {schedule.startTime} - {schedule.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีตารางเรียน</p>
          )}
          <h3 className="text-lg font-semibold mb-2">การบ้าน</h3>
          {education.homeworks?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {education.homeworks.map((homework, index) => (
                <li key={index}>
                  {homework.subject} - {homework.description} - {new Date(homework.dueDate).toLocaleDateString()} - {homework.completed ? 'เสร็จสิ้น' : 'ยังไม่เสร็จ'}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการบ้าน</p>
          )}
          <h3 className="text-lg font-semibold mb-2">การสอบ</h3>
          {education.exams?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {education.exams.map((exam, index) => (
                <li key={index}>
                  {exam.subject} - {new Date(exam.date).toLocaleDateString()} - {exam.startTime} - {exam.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการสอบ</p>
          )}
          <h3 className="text-lg font-semibold mb-2">หนังสือที่อ่าน</h3>
          {education.books?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {education.books.map((book, index) => (
                <li key={index}>
                  {book.title} โดย {book.author} - {book.currentPage}/{book.totalPages} หน้า
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีหนังสือที่อ่าน</p>
          )}
          <h3 className="text-lg font-semibold mb-2">คอร์สออนไลน์</h3>
          {education.onlineCourses?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {education.onlineCourses.map((course, index) => (
                <li key={index}>
                  {course.title} บน {course.platform} - {course.progress}%
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีคอร์สออนไลน์</p>
          )}
        </div>
      ) : (
        'ไม่มีการวางแผนการศึกษา'
      )}
    </div>
  );

  const renderFinance = (finance) => (
    <div>
      {finance ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">งบประมาณ</h3>
          {finance.budgets?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {finance.budgets.map((budget, index) => (
                <li key={index}>
                  {budget.month} - งบประมาณทั้งหมด: {budget.totalBudget} บาท - ใช้จ่าย: {budget.expenses} บาท - รายรับ: {budget.income} บาท
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีงบประมาณ</p>
          )}
          <h3 className="text-lg font-semibold mb-2">การทำธุรกรรม</h3>
          {finance.transactions?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {finance.transactions.map((transaction, index) => (
                <li key={index}>
                  {transaction.type} - {transaction.amount} บาท - {transaction.description} - {new Date(transaction.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการทำธุรกรรม</p>
          )}
          <h3 className="text-lg font-semibold mb-2">หนี้</h3>
          {finance.debts?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {finance.debts.map((debt, index) => (
                <li key={index}>
                  เจ้าหนี้: {debt.creditor} - จำนวน: {debt.amount} บาท - กำหนดชำระ: {new Date(debt.dueDate).toLocaleDateString()} - สถานะ: {debt.paid ? 'ชำระแล้ว' : 'ยังไม่ชำระ'}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีหนี้</p>
          )}
        </div>
      ) : (
        'ไม่มีการวางแผนการเงิน'
      )}
    </div>
  );

  const renderHealthFitness = (healthFitness) => (
    <div>
      {healthFitness ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">การออกกำลังกาย</h3>
          {healthFitness.exercises?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {healthFitness.exercises.map((exercise, index) => (
                <li key={index}>
                  ประเภท: {exercise.type} - เวลา: {exercise.duration} นาที - วันที่: {new Date(exercise.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการออกกำลังกาย</p>
          )}
          <h3 className="text-lg font-semibold mb-2">โภชนาการ</h3>
          {healthFitness.nutritions?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {healthFitness.nutritions.map((nutrition, index) => (
                <li key={index}>
                  อาหาร: {nutrition.food} - แคลอรี่: {nutrition.calories} แคลอรี่ - วันที่: {new Date(nutrition.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีข้อมูลโภชนาการ</p>
          )}
          <h3 className="text-lg font-semibold mb-2">น้ำหนัก</h3>
          {healthFitness.weights?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {healthFitness.weights.map((weight, index) => (
                <li key={index}>
                  น้ำหนัก: {weight.weight} กก. - วันที่: {new Date(weight.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีข้อมูลน้ำหนัก</p>
          )}
        </div>
      ) : (
        'ไม่มีการวางแผนสุขภาพและฟิตเนส'
      )}
    </div>
  );

  const renderTimeManagement = (timeManagement) => (
    <div>
      {timeManagement ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">ปฏิทิน</h3>
          {timeManagement.calendar?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {timeManagement.calendar.map((event, index) => (
                <li key={index}>
                  กิจกรรม: {event.title} - วันที่: {new Date(event.date).toLocaleDateString()} - เวลา: {event.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีข้อมูลปฏิทิน</p>
          )}
          <h3 className="text-lg font-semibold mb-2">รายการสิ่งที่ต้องทำ (To-Do List)</h3>
          {timeManagement.todos?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {timeManagement.todos.map((todo, index) => (
                <li key={index}>
                  {todo.task} - สถานะ: {todo.completed ? 'เสร็จสิ้น' : 'ยังไม่เสร็จ'}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีรายการสิ่งที่ต้องทำ</p>
          )}
          <h3 className="text-lg font-semibold mb-2">การตั้งเป้าหมาย</h3>
          {timeManagement.goals?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {timeManagement.goals.map((goal, index) => (
                <li key={index}>
                  เป้าหมาย: {goal.goal} - สถานะ: {goal.completed ? 'บรรลุ' : 'ยังไม่บรรลุ'}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีการตั้งเป้าหมาย</p>
          )}
        </div>
      ) : (
        'ไม่มีการวางแผนการจัดการเวลา'
      )}
    </div>
  );

  const renderWork = (work) => (
    <div>
      {work ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">โปรเจกต์</h3>
          {work.projects?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {work.projects.map((project, index) => (
                <li key={index}>
                  โปรเจกต์: {project.name} - รายละเอียด: {project.description} - ความคืบหน้า: {project.progress}%
                  <ul className="list-disc list-inside ml-4">
                    {project.tasks.map((task, tIndex) => (
                      <li key={tIndex}>
                        งาน: {task.name} - รายละเอียด: {task.description} - กำหนดเสร็จ: {new Date(task.dueDate).toLocaleDateString()} - สถานะ: {task.completed ? 'เสร็จสิ้น' : 'ยังไม่เสร็จ'}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีโปรเจกต์</p>
          )}
          <h3 className="text-lg font-semibold mb-2">ไอเดีย</h3>
          {work.ideas?.length > 0 ? (
            <ul className="list-disc list-inside mb-4">
              {work.ideas.map((idea, index) => (
                <li key={index}>
                  ไอเดีย: {idea.title} - รายละเอียด: {idea.description} - วันที่บันทึก: {new Date(idea.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีไอเดีย</p>
          )}
        </div>
      ) : (
        'ไม่มีการวางแผนการทำงาน'
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiCheckCircle />, 'รายการสิ่งที่ต้องทำ (To-Do List)', data.timeManagement?.todos?.length ? `${data.timeManagement.todos.length} รายการ` : 'ไม่มีรายการสิ่งที่ต้องทำ')}
        {renderCard(<FiCalendar />, 'ปฏิทิน', data.timeManagement?.calendar?.length ? `${data.timeManagement.calendar.length} กิจกรรม` : 'ไม่มีข้อมูลปฏิทิน')}
        {renderCard(<FiTrendingUp />, 'สถิติสุขภาพและการเงิน', 'ดูสถิติการออกกำลังกายและการเงิน')}
        {renderCard(<FiAlertCircle />, 'การแจ้งเตือนสำคัญ', 'ไม่มีการแจ้งเตือน')}
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8">
        {renderSection('การศึกษา', renderEducation(data.education))}
        {renderSection('การเงิน', renderFinance(data.finance))}
        {renderSection('สุขภาพและฟิตเนส', renderHealthFitness(data.healthFitness))}
        {renderSection('การจัดการเวลา', renderTimeManagement(data.timeManagement))}
        {renderSection('การทำงาน', renderWork(data.work))}
      </div>
    </div>
  );
};

export default Dashboard;
