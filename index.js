const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a task
function addtask() {
  const taskInput = document.querySelector("#task-input");
  const taskText = taskInput.value.trim();
  console.log("taskInput is :",taskInput);
  console.log("taskText :",taskText);
  if (taskText === "") {
    alert("The task is empty");
    return;
  }

  const task = {
    Text: taskText,
    completed: false,
  };
  tasks.push(task);
  saveTasks();

  const newTask = createTaskElement(task);
  document.querySelector("#task-list").appendChild(newTask);
  taskInput.value = "";
}

// Function to create a task element
function createTaskElement(task) {
  const newTask = document.createElement("div");
  newTask.classList.add("task-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", toggleTask);

  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.Text;
  if (task.completed) {
    taskSpan.classList.add("completed");
  }

  const deleteButton = document.createElement("img");
  deleteButton.src = "./bin.png";
  deleteButton.alt = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", deleteTask);

  const editButton = document.createElement("img");
  editButton.src = "./edit.jpg";
  editButton.alt = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", editTask);

  newTask.appendChild(checkbox);
  newTask.appendChild(taskSpan);
  newTask.appendChild(deleteButton);
  newTask.appendChild(editButton);

  return newTask;
}

// Display the current date
const myDate = new Date().toDateString();
document.querySelector("#exactday").textContent = myDate;

// Function to toggle task completion
function toggleTask(event) {
  const newTask = event.target.parentElement;
  const taskSpan = newTask.querySelector("span");
  const taskText = taskSpan.textContent;
  const task = tasks.find((task) => task.Text === taskText);
  if (event.target.checked) {
    taskSpan.classList.add("completed");
    task.completed = true;
    document.querySelector("#completed-task-list").appendChild(newTask);
  } else {
    taskSpan.classList.remove("completed");
    document.querySelector("#task-list").appendChild(newTask);
    task.completed = false;
  }
  saveTasks();
}

// Function to handle key press events
function handlekeyPress(event) {
  if (event.key === "Enter") {
    addtask();
  }
}

// Function to delete a task
function deleteTask(event) {
  const newTask = event.target.parentElement;
  const taskSpan = newTask.querySelector("span");
  const taskText = taskSpan.textContent;
  const taskIndex = tasks.findIndex((task) => task.Text === taskText);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    newTask.remove();
  }
}

// Function to edit a task
function editTask(event) {
  const newTask = event.target.parentElement;
  const taskSpan = newTask.querySelector("span");
  const taskText = taskSpan.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = taskText;
  input.classList.add("edit-input");

  newTask.replaceChild(input, taskSpan);

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const newText = input.value.trim();
      if (newText === "") {
        alert("The task is empty");
        return;
      }
      const taskIndex = tasks.findIndex((task) => task.Text === taskText);
      if (taskIndex > -1) {
        tasks[taskIndex].Text = newText;
        saveTasks();
      }
      taskSpan.textContent = newText;
      newTask.replaceChild(taskSpan, input);
    }
  });
}

// Function to load tasks from local storage
function loadTasks() {
  for (const task of tasks) {
    const newTask = createTaskElement(task);
    if (task.completed) {
      document.querySelector("#completed-task-list").appendChild(newTask);
    } else {
      document.querySelector("#task-list").appendChild(newTask);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadTasks);
document.querySelector("#task-input").addEventListener("keypress", handlekeyPress);
