const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos — Read semua todo
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/todos — Create todo baru
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/todos/:id — Delete todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/todos/:id — Update status completed
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { returnDocument: 'after' }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;