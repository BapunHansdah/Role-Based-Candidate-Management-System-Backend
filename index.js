import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import candidateRoutes from './routes/candidate.js';
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://role-based-candidate-management-system.vercel.app', // Replace with your frontend URL
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://role-based-candidate-management-system.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
})
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/candidate', candidateRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
