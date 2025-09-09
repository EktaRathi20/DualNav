const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
};

document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
