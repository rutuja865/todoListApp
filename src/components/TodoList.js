import React from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div >
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onToggleComplete={() => onToggleComplete(index)}
          onEdit={() => onEdit(index)}
        />
      ))}
    </div>
  );
};

export default TodoList;
