
import { getMembers, getMember, API } from "./api.js";

const tableBody = document.querySelector("#members-table");
const tableBodyMain = document.querySelector("#table-members-main");
const membersBody = document.querySelector("#team-members");
const formBody = document.querySelector("#newmember");
const editFormBody = document.querySelector("#editmember")
const hidebtn = document.querySelector("#hidepopover")

if (hidebtn != null) {
    hidebtn.addEventListener("click", async (event) => {
        formBody.hidePopover()
        editFormBody.hidePopover()
    })
}

function renderMembersTable(members) {
    if (tableBody != null) {
        tableBody.replaceChildren();
    } else {
        tableBodyMain.replaceChildren();
    }

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

        const edit = document.createElement("td");

        const editBtn = document.createElement("button")
        editBtn.id = "edit_" + member.id
        editBtn.className = "editbtn"
        editBtn.textContent = "Edit"

        edit.append(editBtn)

        if (tableBody != null) {
            row.append(
                MemberName,
                role,
                edit
            );

            tableBody.appendChild(row);
        } else {
            row.append(
                MemberName,
                role
            );

            tableBodyMain.appendChild(row);
        }
    });
}

function totalMembers(members) {
    let total = 0
    members.forEach(member => {
        total += 1
    })

    membersBody.replaceChildren(total);
}

if (tableBody != null) {

    editFormBody.addEventListener("beforetoggle", async (event) => {
        if (event.oldState === "open") {
            editFormBody.id = "editmember"
        }
    });

    tableBody.addEventListener("click", async (event) => {
        const button = event.target.closest(".editbtn");

        if (!button) return;

        const ids = button.id.split("_")
        const id = ids[1]

        const edit_popover = document.getElementById("editmember")
        edit_popover.showPopover();
        edit_popover.id = id

        try {
            const memberInfo = await getMember(id);
            const memberName = edit_popover.querySelector("#member_name")
            memberName.value = memberInfo.name

            const memberRole = edit_popover.querySelector("#member_role")
            memberRole.value = memberInfo.role

        } catch (error) {
            const err_msg = document.createElement("div")
            err_msg.textContent = "Server error. Contact Administration"
            edit_popover.prepend(err_msg)
        }

    });

    editFormBody.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(editFormBody);
        try {
            await fetch(`${API}/members/${editFormBody.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.get("member_name"),
                    role: formData.get("roles"),
                })
            });
        } catch (error) {
            const err_msg = document.createElement("div")
            err_msg.textContent = "Server error. Contact Administration"
            editFormBody.prepend(err_msg)
        }

    })

    const deletebtn = editFormBody.querySelector("#delete_member")
    deletebtn.addEventListener("click", async (event) => {
        event.preventDefault();


        try {
            await fetch(`${API}/members/${editFormBody.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            const err_msg = document.createElement("div")
            err_msg.textContent = "Server error. Contact Administration"
            editFormBody.prepend(err_msg)
        }

    })
}

if (formBody != null) {
    formBody.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formBody);
        try {
            await fetch(`${API}/members`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.get("member_name"),
                    role: formData.get("roles")
                })
            });
        } catch (error) {
            const err_msg = document.createElement("div")
            err_msg.textContent = "Server error. Contact Administration"
            formBody.prepend(err_msg)
        }
    })

}



async function loadMembers() {
    try {
        const members = await getMembers();

        renderMembersTable(members);
        totalMembers(members);

    } catch (error) {
        console.error(`Error in members`, error);
    }
}

loadMembers();
