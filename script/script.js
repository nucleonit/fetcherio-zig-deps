// 2 s
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

const button = document.getElementById("start-exploring");

button.addEventListener("click", function () {
  console.log(`A button ${button.id} was clicked`);
  window.location.href = "main-archive.html";
});
