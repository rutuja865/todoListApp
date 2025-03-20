// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchTask = document.getElementById('searchTask');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null;

// Render tasks from local storage
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
                <button class="edit-btn" onclick="editTask(${index})">✎</button>
                <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add or Update Task
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text !== '') {
        if (editingIndex !== null) {
            tasks[editingIndex].text = text;
            editingIndex = null;
            addTaskBtn.textContent = 'Add';
        } else {
            tasks.push({ text, completed: false });
        }

        updateLocalStorage();
        taskInput.value = '';
        renderTasks();
    }
});

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Edit Task
function editTask(index) {
    taskInput.value = tasks[index].text;
    editingIndex = index;
    addTaskBtn.textContent = 'Update';
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Update Local Storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Search Task
searchTask.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach((li) => {
        const taskText = li.textContent.toLowerCase();
        li.style.display = taskText.includes(searchText) ? 'flex' : 'none';
    });
});

// Initial Render
renderTasks();
