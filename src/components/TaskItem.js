import "../styles/TaskItem.scss";

export default function TaskItem({ task, index, setTasks, tasks, setEditingIndex, setTask }) {
  const toggleTask = () => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = () => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = () => {
    setTask(task.text);
    setEditingIndex(index);
  };

  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={toggleTask}>{task.text}</span>
      <div>
        <button onClick={editTask}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </li>
  );
}
