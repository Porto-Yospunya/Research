const containers = document.querySelectorAll(".container-box");

const names = document.querySelectorAll(".n");
const roles = document.querySelectorAll(".r");
const workplaces = document.querySelectorAll(".w");
const contacts = document.querySelectorAll(".c");

for (let i = 0; i < containers.length; i++) {
    containers[i].onclick = () => {
        document.getElementById("pf-name").innerHTML = names[i].innerHTML;
        document.getElementById("pf-role").innerHTML = roles[i].innerHTML;
        document.getElementById("pf-workplace").innerHTML = workplaces[i].innerHTML;
        document.getElementById("pf-contact").innerHTML = contacts[i].innerHTML;
        document.querySelector(".profile-container").classList.remove("profile-container-hidden");
    }
}

document.querySelector(".close-btn").onclick = () => {
    document.querySelector(".profile-container").classList.add("profile-container-hidden");
}