
import { getTasks } from "./api.js";

const tableBody = document.querySelector("#tasks-table");
const totalBody = document.querySelector("#total-Tasks")
const completedBody = document.querySelector("#completed-Tasks")

function renderTasks(tasks) {
    tableBody.replaceChildren();
    tasks.forEach(task => {
        const row = document.createElement("tr");

        const taskName = document.createElement("th");
        taskName.scope = "row";
        taskName.textContent = task.title;

        const person = document.createElement("td");

        const avatar = document.createElement("img");
        avatar.src = "./assets/img/avatar.svg";
        avatar.alt = "avatar icon";

        person.append(
            avatar,
            document.createTextNode(task.person)
        );

        const priority = document.createElement("td");
        const priorityValue = task.priority;

        const priorityBadge = document.createElement("span");
        priorityBadge.className = priorityValue.toLowerCase();
        priorityBadge.textContent = priorityValue;

        priority.appendChild(priorityBadge);

        const deadline = document.createElement("td");
        deadline.textContent = task.date;

        const status = document.createElement("td");
        const statusValue = task.status;

        const statusBadge = document.createElement("span");
        statusBadge.className = statusValue.toLowerCase().replace(/\s+/g, "-");
        statusBadge.textContent = statusValue;

        status.appendChild(statusBadge);

        row.append(
            taskName,
            person,
            priority,
            deadline,
            status
        );

        tableBody.appendChild(row);
    });
}


function totalTasks(tasks) {
    let total = 0
    tasks.forEach(task => {
        total += 1
    });
    totalBody.replaceChildren(total)
}

function completedTasks(tasks) {
    let completed = 0
    tasks.forEach(task => {
        if (task.status == "Completed") {
            completed += 1
        }
    });
    completedBody.replaceChildren(completed)
}

async function loadTasks() {
    try {
        const tasks = await getTasks();

        if (tableBody != null) {
            renderTasks(tasks);
        }
        totalTasks(tasks);
        completedTasks(tasks);

    } catch (error) {
        console.error(`Error in tasks`, error);

        tableBody.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "Server error. Contact administration.";

        row.appendChild(cell);
        tableBody.appendChild(row);
    }
}

loadTasks();
