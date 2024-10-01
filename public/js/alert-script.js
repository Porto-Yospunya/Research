document.querySelector(".alert-cancel-btn").onclick = () => {
  document.querySelector(".alert-delete").classList.add("alert-hidden");
}

document.querySelector(".delete-btn").onclick = () => {
  document.querySelector(".alert-delete").classList.remove("alert-hidden")
}

document.querySelector(".delete-btn").onclick = () => {
  document.querySelector(".alert-delete").classList.remove("alert-hidden")
}

document.querySelector(".save-btn").onclick = () => {
  document.querySelector(".alert-success").classList.remove("alert-success-hidden")
}

document.querySelector(".close-btn").onclick = () => {
  document.querySelector(".alert-success").classList.add("alert-success-hidden")
}