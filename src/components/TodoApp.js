import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../api/todoApi';
import { setTasks, addTask, deleteTask, toggleComplete, setSearchQuery, setEditingIndex } from '../redux/todoSlice';
import TodoList from './TodoList';
import SearchBox from './SearchBox';
const TodoApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.todos.tasks);
  const searchQuery = useSelector(state => state.todos.searchQuery);
  const editingIndex = useSelector(state => state.todos.editingIndex);
  const [taskText, setTaskText] = React.useState('');

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      dispatch(setTasks(tasks));
    };
    loadTasks();
  }, [dispatch]);

  const handleAddOrUpdateTask = () => {
    if (taskText.trim()) {
      const newTask = { title: taskText, completed: false };
      dispatch(addTask({ ...newTask, index: editingIndex }));
      setTaskText('');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      <button onClick={handleAddOrUpdateTask}>{editingIndex !== null ? 'Update' : 'Add'}</button>
      <TodoList
        tasks={filteredTasks}
        onDelete={(index) => dispatch(deleteTask(index))}
        onToggleComplete={(index) => dispatch(toggleComplete(index))}
        onEdit={(index) => {
          setTaskText(tasks[index].title);
          dispatch(setEditingIndex(index));
        }}
      />
    </div>
  );
};

export default TodoApp;
