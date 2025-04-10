import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
  page,
  setPage,
  totalTasks,
  tasksPerPage
}) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div>
        {tasks.map((task, index) => (
          <TodoItem
            key={task.id || index}
            task={task}
            onDelete={() => onDelete(index)}
            onToggleComplete={() => onToggleComplete(index)}
            onEdit={() => onEdit(index)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? '' : 'pagination__disabled'}
          >
            Prev
          </span>

          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => selectedPageHandler(i + 1)}
              className={page === i + 1 ? 'pagination__selected' : ''}
            >
              {i + 1}
            </span>
          ))}

          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < totalPages ? '' : 'pagination__disabled'}
          >
            Next
          </span>
        </div>
      )}
    </>
  );
};

export default TodoList;
