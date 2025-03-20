const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchTask = document.getElementById('searchTask');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingTaskId = null;

// Fetch tasks from API and local storage
async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}?_limit=5`);
        const apiTasks = await response.json();
        
        // Combine API tasks with locally stored tasks
        tasks = [...apiTasks, ...tasks];
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks
function renderTasks(taskArray) {
    taskList.innerHTML = '';
    taskArray.forEach((task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button class="complete-btn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="edit-btn" onclick="editTask(${task.id})">✎</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add or Update Task
addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title !== '') {
        if (editingTaskId !== null) {
            updateTask(editingTaskId, title);
            editingTaskId = null;
            addTaskBtn.textContent = 'Add';
        } else {
            addTask(title);
        }
        taskInput.value = '';
    }
});

// Add Task
function addTask(title) {
    const newTask = {
        id: tasks.length + 1, // Generate an ID manually
        title,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(tasks);
}

// Update Task
function updateTask(id, newTitle) {
    tasks = tasks.map(task => task.id === id ? { ...task, title: newTitle } : task);
    saveTasks();
    renderTasks(tasks);
}

// Toggle Complete
function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks(tasks);
}

// Edit Task
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskInput.value = task.title;
    editingTaskId = id;
    addTaskBtn.textContent = 'Update';
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks(tasks);
}

// Search Task
searchTask.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchText));
    renderTasks(filteredTasks);
});

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial Fetch
fetchTasks();
