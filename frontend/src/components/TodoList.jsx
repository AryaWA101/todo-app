import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        🎉 Tidak ada todo. Tambahkan yang baru!
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;