
import { getTasks, getTask, getMembers, renderMemberOptions } from "./api.js";

const tableBody = document.querySelector("#tasks-table");
const tableBodyMain = document.querySelector("#task-table-main")
const totalBody = document.querySelector("#total-Tasks")
const completedBody = document.querySelector("#completed-Tasks")
const formBody = document.querySelector("#newtask")
const editFormBody = document.querySelector("#edittask")
const NewTaskPopover = document.getElementById("newtask")
const taskPerson = document.querySelector("#task_person");
const hidebtn = document.querySelector("#hidepopover_task")

if (hidebtn != null) {
    hidebtn.addEventListener("click", async (event) => {
        formBody.hidePopover()
        editFormBody.hidePopover()
    })

}


function renderTasks(tasks) {
    if (tableBody != null) {
        tableBody.replaceChildren();
    } else {
        tableBodyMain.replaceChildren();
    }

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

        const edit = document.createElement("td");

        const editBtn = document.createElement("button")
        editBtn.id = "edit_" + task.id
        editBtn.className = "editbtn"
        editBtn.textContent = "Edit"

        edit.append(editBtn)

        if (tableBody != null) {
            row.append(
                taskName,
                person,
                priority,
                deadline,
                status,
                edit
            );

            tableBody.appendChild(row);
        } else {
            row.append(
                taskName,
                person,
                priority,
                deadline,
                status
            );

            tableBodyMain.appendChild(row);
        }
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


if (NewTaskPopover != null) {
    NewTaskPopover.addEventListener("beforetoggle", async (event) => {
        if (event.newState === "open") {
            const members = await getMembers()
            renderMemberOptions(members, taskPerson);
        }
    });

}

if (formBody != null) {
    formBody.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formBody);
        await fetch("http://localhost:7777/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: formData.get("task_name"),
                person: formData.get("persons"),
                priority: formData.get("priorities"),
                date: formData.get("task_deadline"),
                status: "Added"
            })
        });

    })
}


if (tableBody != null) {

    editFormBody.addEventListener("beforetoggle", async (event) => {
        if (event.oldState === "open") {
            editFormBody.id = "edittask"
        }
    });

    tableBody.addEventListener("click", async (event) => {
        const button = event.target.closest(".editbtn");

        if (!button) return;

        const ids = button.id.split("_")
        const id = ids[1]

        const edit_popover = document.getElementById("edittask")
        edit_popover.showPopover();
        edit_popover.id = id

        const members = await getMembers()
        const taskPerson = edit_popover.querySelector("#task_person_edit")
        renderMemberOptions(members, taskPerson);

        try {
            const taskInfo = await getTask(id);
            const taskName = edit_popover.querySelector("#task_name")
            taskName.value = taskInfo.title


            taskPerson.value = taskInfo.person

            const taskPriority = edit_popover.querySelector("#task_priority")
            taskPriority.value = taskInfo.priority

            const taskDeadline = edit_popover.querySelector("#task_deadline")
            taskDeadline.value = taskInfo.date

            const taskStatus = edit_popover.querySelector("#task_status")
            taskStatus.value = taskInfo.status

        } catch (error) {
            console.error("Error in task", error)
        }

    });

    editFormBody.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(editFormBody);
        await fetch(`http://localhost:7777/tasks/${editFormBody.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: formData.get("task_name"),
                person: formData.get("persons"),
                priority: formData.get("priorities"),
                date: formData.get("task_deadline"),
                status: formData.get("statuses")
            })
        });

    })

    const deletebtn = editFormBody.querySelector("#delete_task")
    deletebtn.addEventListener("click", async (event) => {
        event.preventDefault();

        await fetch(`http://localhost:7777/tasks/${editFormBody.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

    })
}

async function loadTasks() {
    try {
        const tasks = await getTasks();

        renderTasks(tasks);
        totalTasks(tasks);
        completedTasks(tasks);

    } catch (error) {
        console.error(`Error in tasks`, error);
    }
}

loadTasks();
