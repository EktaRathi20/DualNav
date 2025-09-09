export const createIcon = (icon) => {
  const div = document.createElement("div");
  div.className = "icon";
  div.innerHTML = icon;
  return div;
};

export const setIcon = (container, icon) => {
  container.innerHTML = "";
  const element = createIcon(icon);
  container.appendChild(element);
};
