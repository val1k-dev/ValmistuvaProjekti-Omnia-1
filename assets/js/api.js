const API = "http://localhost:7777";

const totalBody = document.querySelector("#total-Tasks")
const completedBody = document.querySelector("#completed-Tasks")
const totalMembers = document.querySelector("#team-members")
const resetButton = document.querySelector("#reset-button")

if (resetButton !== null) {
    resetButton.addEventListener("click", () => {
        totalBody.replaceChildren(0);
        completedBody.replaceChildren(0);
        totalMembers.replaceChildren(0);
    });
}

export async function getTasks() {
    const response = await fetch(`${API}/tasks`);

    if (!response.ok) {
        throw new Error("Tasks fetch failed");
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

