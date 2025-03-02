const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addtask() {
  // Adding task details
  const taskInput = document.querySelector("#task-input");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("the task is empty");
    return;
  }

  const task = {
    Text: taskText,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  const newTask = document.createElement("div");
  newTask.classList.add("task-container");

  // Create and configure the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.addEventListener("change", toggleTask); // Attached toggleTask event listener

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
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

  newTask.appendChild(checkbox); // Append checkbox to newTask
  newTask.appendChild(taskSpan); // Append taskSpan to newTask
  newTask.append(deleteButton);
  newTask.appendChild(editButton);

  // Append the new task container to the task list
  document.querySelector("#task-list").appendChild(newTask);

  // Clear the input field
  taskInput.value = "";
}

// date display
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
    document.querySelector("#completed-task-list").appendChild(newTask); // Move to completed-task-list
  } else {
    taskSpan.classList.remove("completed");
    document.querySelector("#task-list").appendChild(newTask);
    task.completed = false; // Move back to task-list
  }
  saveTasks();
}

// Function to handle key press events
function handlekeyPress(event) {
  if (event.key === "Enter") {
    addtask(); // Call addtask on Enter key press
  }
}
function deleteTask(event) {
  const newTask = event.target.parentElement;
  const taskSpan = newTask.querySelector("span");
  const taskText = taskSpan.textContent;
  const task = tasks.findIndex((task) => task.Text === taskText);
  if (task > -1) {
    tasks.splice(task, 1);
    saveTasks();
    newTask.remove();
  }
}
function editTask(event) {
  const newTask = event.target.parentElement;
  const taskSpan = newTask.querySelector("span");
  const taskText = taskSpan.textContent;

  //input field
  const input = document.createElement("input");
  input.type = "text";
  input.value = taskText;
  input.classList.add("edit-input");
  //replacing tasktext with input
  newTask.replaceChild(input, taskSpan);
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const newText = input.value.trim();

      if (newText === "") {
        alert("the task is empty");
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
function loadTasks() {
  for (const task of tasks) {
    const newTask = document.createElement("div");
    newTask.classList.add("task-container");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", toggleTask);
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.Text;
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
    if (task.completed) {
      taskSpan.classList.add("completed");
      document.querySelector("#completed-task-list").appendChild(newTask);
      checkbox.checked = true;
    } else {
      document.querySelector("#task-list").appendChild(newTask);
    }
  }
}

document.addEventListener("DOMContentLoaded", loadTasks);
