const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRouters');
const authRoutes = require('./routes/authRouters');
const timeManagementRoutes = require('./routes/timeManagementRoutes'); 
const healthFitnessRoutes = require('./routes/healthFitnessRoutes'); 
const financeRoutes = require('./routes/financeRoutes');
const educationRoutes = require('./routes/educationRoutes');
const workRoutes = require('./routes/workRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', todoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/time-management', timeManagementRoutes);
app.use('/api/health-fitness', healthFitnessRoutes);
app.use('/api/finance', financeRoutes); 
app.use('/api/education', educationRoutes);
app.use('/api/work', workRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
