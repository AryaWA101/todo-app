import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // READ — Ambil semua todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      setError('Gagal memuat data. Pastikan server berjalan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // CREATE — Tambah todo baru
  const addTodo = async (title) => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(API_URL, { title });
      setTodos([res.data, ...todos]);
    } catch (err) {
      setError('Gagal menambah todo.');
    }
  };

  // DELETE — Hapus todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError('Gagal menghapus todo.');
    }
  };

  // UPDATE — Toggle completed
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, { completed: !completed });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      setError('Gagal mengupdate todo.');
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Todo List</h1>
          <p className="subtitle">
            {completedCount} / {todos.length} selesai
          </p>
        </header>

        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">⏳ Memuat...</div>
        ) : (
          <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
        )}
      </div>
    </div>
  );
}

export default App;