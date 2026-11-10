const API = "http://localhost:7777";


const resetBody = document.getElementById('reset')
const resetBtn = document.getElementById('reset_btn')
const resetCancel = document.getElementById('reset_cancel')

if (resetBody != null) {
    resetBtn.addEventListener("click", async () => {
        const tasksresponse = await fetch("http://localhost:7777/tasks");
        const tasks = await tasksresponse.json();

        const membersresponse = await fetch("http://localhost:7777/members");
        const members = await membersresponse.json();

        await Promise.all(
            tasks.map(task =>
                fetch(`http://localhost:7777/tasks/${task.id}`, {
                    method: "DELETE"
                })
            )
        );

        await Promise.all(
            members.map(member =>
                fetch(`http://localhost:7777/members/${member.id}`, {
                    method: "DELETE"
                })
            )
        )
    })

    resetCancel.addEventListener("click", () => {
        resetBody.hidePopover()
    })
}

export async function getTasks() {
    const response = await fetch(`${API}/tasks`);

    if (!response.ok) {
        throw new Error("Tasks fetch failed");
    }

    return await response.json();
}

export async function getTask(id) {
    const response = await fetch(`${API}/tasks/${id}`);

    if (!response.ok) {
        throw new Error("Task fetch failed");
    }

    return await response.json();
}


export async function getMembers() {
    const response = await fetch(`${API}/members`);

    if (!response.ok) {
        throw new Error("Members fetch failed");
    }


    return await response.json();
}

export async function renderMemberOptions(members, id) {
    id.innerHTML = '<option value="">Select a person</option>';

    members.forEach(member => {
        const option = document.createElement("option");
        option.value = member.name;
        option.textContent = member.name;

        id.appendChild(option);
    });
}

export async function getMember(id) {
    const response = await fetch(`${API}/members/${id}`);

    if (!response.ok) {
        throw new Error("Member fetch failed");
    }

    return await response.json();
}
