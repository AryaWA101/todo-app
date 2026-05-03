function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        className="todo-checkbox"
      />
      <span className="todo-title">{todo.title}</span>
      <button
        onClick={() => onDelete(todo._id)}
        className="btn btn-delete"
        title="Hapus"
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;