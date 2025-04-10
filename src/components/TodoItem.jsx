import React from 'react';

const TodoItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div  onClick={onToggleComplete}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flex: 1,
        }}
      >
        {task.todo}
      </div>
      {/* <button onClick={onToggleComplete}>
        {task.completed ? 'Undo' : 'Complete'}
      </button> */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
