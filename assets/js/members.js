
import { getMembers } from "./api.js";

const tableBody = document.querySelector("#table-members");
const membersBody = document.querySelector("#team-members")

function renderMembers(members) {
    tableBody.replaceChildren();
    members.forEach(member => {
        const row = document.createElement("tr");

        const MemberName = document.createElement("th");
        MemberName.scope = 'row'

        const avatar = document.createElement("img");
        avatar.src = "./assets/img/avatar.svg";
        avatar.alt = "avatar icon";

        MemberName.append(
            avatar,
            document.createTextNode(member.name)
        )


        const role = document.createElement("td");
        role.textContent = member.role

        row.append(
            MemberName,
            role
        );

        tableBody.appendChild(row);
    });
}

function totalMembers(members) {
    let total = 0
    members.forEach(member => {
        total += 1
    })

    membersBody.replaceChildren(total);
}

async function loadMembers() {
    try {
        const members = await getMembers();

        if (tableBody != null) {
            renderMembers(members);
        }

        totalMembers(members);

    } catch (error) {
        console.error(`Error in members`, error);

        tableBody.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "Server error. Contact administration.";

        row.appendChild(cell);
        tableBody.appendChild(row);
    }
}

loadMembers();
