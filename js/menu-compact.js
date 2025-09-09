import { setIcon } from "../utils/helpers.js";

export const designCompactSidebar = (icons) => {
  const container = document.getElementById("compact-menu-items");
  container.innerHTML = ""; // clear old content

  icons.forEach((child) => {
    const item = document.createElement("div");
    item.className = "menu-item";

    // icon (if exists)
    if (child.icon) {
      setIcon(item, child.icon);
    }

    container.appendChild(item);
  });
};
