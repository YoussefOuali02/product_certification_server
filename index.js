require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

const allowedOrigins = [
    process.env.CLIENT_URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/dashboard-url', require('./routes/dashboardRoutes'));

const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV || 'local';
app.listen(PORT, () => {
    if (ENV === 'local') {
      console.log(`🟢 Server running in LOCAL mode on port ${PORT}`);
    } else {
      console.log(`🟢 Server running in PRODUCTION mode`);
    }
  });