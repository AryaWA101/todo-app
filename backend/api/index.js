const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('../routes/todos');
const authRoutes = require('../routes/auth');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://todo-app-mvuv.vercel.app',
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.json({ message: 'Todo API is running!' }));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};