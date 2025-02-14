import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TaskItem from "./TaskItem";
import SearchBox from "./SearchBox";
import "../styles/TodoList.scss";

export default function TodoList() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or update task
  const addOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editingIndex !== null) {
      const updatedTasks = tasks.map((t, i) =>
        i === editingIndex ? { ...t, text: task } : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask("");
  };

  // Filtered tasks for search
  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <SearchBox search={search} setSearch={setSearch} />
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addOrUpdateTask}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            setTasks={setTasks}
            tasks={tasks}
            setEditingIndex={setEditingIndex}
            setTask={setTask}
          />
        ))}
      </ul>
    </div>
  );
}
