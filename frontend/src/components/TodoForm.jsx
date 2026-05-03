import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tambah todo baru..."
        className="todo-input"
      />
      <button type="submit" className="btn btn-add">
        + Tambah
      </button>
    </form>
  );
}

export default TodoForm;