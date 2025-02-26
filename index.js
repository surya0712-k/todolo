let tasks=[];
function addtask() {
    //adding task details
    let taskInput = document.querySelector("#task-input");
    let taskText = taskInput.value.trim();
    if (taskText != "") {
        let task = {
            Text : taskText,
            completed : false
        };
        tasks.push(task);
        let newTask = document.createElement("div");
        newTask.textContent = taskText;
        document.querySelector("#task-list").appendChild(newTask);


        // check button 
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.addEventListener("change", toggleTask);
        let taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        //eventlistner to completed task
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskSpan.classList.add("completed");
                document.querySelector("#completed-task-list").appendChild(newTask);
            }
            else {
                taskSpan.classList.remove("completed");
                document.querySelector("#task-list").appendChild(newTask);
            }
        });

        taskInput.value = "";
        newTask.appendChild(checkbox);
        // .appendChild(taskSpan);
        //edit button 
    }

}
let myDate = new Date().toDateString();//.toDateString();
new Date().toDateString;
document.querySelector("#exactday").textContent = myDate;

function toggleTask(event) {
    let newTask = event.target.parentElement;
    newTask.classList.toggle("completed");
}
function handlekeyPress(event) {
    if (event.key === "Enter") {
        addtask();
    }
}
// localStorage.etItem("")