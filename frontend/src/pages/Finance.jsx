import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCreditCard, FiDollarSign, FiAlertCircle } from 'react-icons/fi';

const Finance = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const budgetsRes = await axios.get('http://localhost:5000/api/finance/budgets');
      const transactionsRes = await axios.get('http://localhost:5000/api/finance/transactions');
      const debtsRes = await axios.get('http://localhost:5000/api/finance/debts');
      setBudgets(budgetsRes.data);
      setTransactions(transactionsRes.data);
      setDebts(debtsRes.data);
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
      <h1 className="text-4xl font-bold mb-6 text-center">Finance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderCard(<FiCreditCard />, 'งบประมาณ', budgets.length ? `${budgets.length} รายการ` : 'ไม่มีงบประมาณ')}
        {renderCard(<FiDollarSign />, 'รายรับและรายจ่าย', transactions.length ? `${transactions.length} รายการ` : 'ไม่มีการทำธุรกรรม')}
        {renderCard(<FiAlertCircle />, 'การเตือนหนี้', debts.length ? `${debts.length} รายการ` : 'ไม่มีหนี้')}
      </div>
    </div>
  );
};

export default Finance;
