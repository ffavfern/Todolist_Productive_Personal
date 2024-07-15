import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import TimeManagement from './pages/TimeManagement';
import HealthFitness from './pages/HealthFitness'; 
import Finance from './pages/Finance';
import Education from './pages/Education';
import Work from './pages/Work';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mx-auto mt-8">
        <Routes>
        <Route path="/" element={<Dashboard />} /> 
          <Route path="/time-management" element={<TimeManagement />} /> 
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/health-fitness" element={<HealthFitness />} /> 
          <Route path="/finance" element={<Finance />} />
          <Route path="/education" element={<Education />} />
          <Route path="/work" element={<Work />} /> 
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
