import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  const [page,setPage]=useState(1);
  
  const selectedpageHandler=(selectedPage)=>{
    if(selectedPage>=1 & selectedPage<=tasks.length/10 && selectedPage!==page)
    setPage(selectedPage)
  }
  return (
    <>
    <div >
      {tasks.slice(page*10-10,page*10).map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onToggleComplete={() => onToggleComplete(index)}
          onEdit={() => onEdit(index)}
        />
      ))}
    </div>
    {
tasks.length>0 && <div className='pagination'>
  <span onClick={() => selectedpageHandler(page - 1)} className={page > 1 ?" ":"pagination__disabled"}>Prev</span>
  {[...Array(tasks.length / 10)].map((_, i) => (
  <span className={page ===i+1 ? "pagination__selected" :" "} onClick={() => selectedpageHandler(i + 1)} key={i}>{i + 1}</span>
))}

  <span onClick={() => selectedpageHandler(page + 1)} className={page < tasks.length/10 ?" ":"pagination__disabled"}>Next</span>
</div>
}
    </>
  );
};


export default TodoList;
