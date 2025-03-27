document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { text: taskText, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(task, tasks.length - 1);
    taskInput.value = "";
}

function renderTask(task, index) {
    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");
    li.innerHTML = `<span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span> 
                    <button onclick="deleteTask(${index})">❌</button>`;
    taskList.appendChild(li);
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("task-list").innerHTML = "";
    tasks.forEach((task, index) => renderTask(task, index));
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
