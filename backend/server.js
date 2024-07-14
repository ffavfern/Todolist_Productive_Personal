const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRouters');
const authRoutes = require('./routes/authRouters');
const timeManagementRoutes = require('./routes/timeManagementRoutes'); 
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));