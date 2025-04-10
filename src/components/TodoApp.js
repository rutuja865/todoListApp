import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../api/todoApi';
import {
  setTasks,
  addTask,
  deleteTask,
  toggleComplete,
  setSearchQuery,
  setEditingIndex
} from '../redux/todoSlice';
import TodoList from './TodoList';
import SearchBox from './SearchBox';

const TodoApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.todos.tasks);
  const searchQuery = useSelector(state => state.todos.searchQuery);
  const editingIndex = useSelector(state => state.todos.editingIndex);

  const [taskText, setTaskText] = useState('');
  const [page, setPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const tasksPerPage = 10;

  useEffect(() => {
    const loadTasks = async () => {
      const { todos, total } = await fetchTasks(page, tasksPerPage);
      dispatch(setTasks(todos));
      setTotalTasks(total);
    };
    loadTasks();
  }, [dispatch, page]);

  const handleAddOrUpdateTask = () => {
    if (taskText.trim()) {
      const newTask = { todo: taskText, completed: false };
      dispatch(addTask({ ...newTask, index: editingIndex }));
      setTaskText('');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <SearchBox />
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder={editingIndex !== null ? 'Edit Task' : 'Add Task'}
      />
      <button onClick={handleAddOrUpdateTask}>
        {editingIndex !== null ? 'Update' : 'Add'}
      </button>

      <TodoList
        tasks={filteredTasks}
        onDelete={(index) => dispatch(deleteTask(index))}
        onToggleComplete={(index) => dispatch(toggleComplete(index))}
        onEdit={(index) => {
          setTaskText(tasks[index].todo);
          dispatch(setEditingIndex(index));
        }}
        page={page}
        setPage={setPage}
        totalTasks={totalTasks}
        tasksPerPage={tasksPerPage}
      />
    </div>
  );
};

export default TodoApp;
