import React from 'react';

const TodoItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className='todotems'>
      <div  className={`task-text ${task.completed ? 'completed' : ''}`}  onClick={onToggleComplete}
        // style={{
        //   textDecoration: task.completed ? 'line-through' : 'none',
        //   flex: 1,
        // }}
      >
        {task.todo}
      </div>
      {/* <button onClick={onToggleComplete}>
        {task.completed ? 'Undo' : 'Complete'}
      </button> */}
      <button className='editbutton' onClick={onEdit}>Edit</button>
      <button className='deletebutton' onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
