import {
  calculatePosition,
  setIcon,
  showSubmenu,
  hideAllSubmenus,
} from "../utils/helpers.js";

const createMenuItem = (child) => {
  const item = document.createElement("div");
  item.className = "menu-item";

  if (child.icon) {
    setIcon(item, child.icon);
  }

  if (child.children && child.children.length > 0) {
    attachSubmenuHandlers(item, child.children);
  }

  return item;
};

const createSubmenu = (children) => {
  const submenu = document.createElement("div");
  submenu.className = "submenu visible";

  children.forEach((subChild) => {
    const subItem = document.createElement("div");
    subItem.className = "submenu-item";

    if (subChild.title) {
      const span = document.createElement("span");
      span.textContent = subChild.title;
      subItem.appendChild(span);
    }

    submenu.appendChild(subItem);
  });

  return submenu;
};

const attachSubmenuHandlers = (item, children) => {
  let submenu = null;

  item.addEventListener("mouseenter", () => {
    hideAllSubmenus();

    submenu = createSubmenu(children);
    item.appendChild(submenu);
    calculatePosition(item, submenu);

    showSubmenu(submenu);
  });

  document
    .getElementById("compact-menu-items")
    .addEventListener("mouseleave", () => {
      setTimeout(() => {
        removeSubmenu(submenu);
        submenu = null;
      }, 100);
    });
};

const removeSubmenu = (submenu) => {
  hideAllSubmenus();
  if (submenu && submenu.parentNode) {
    submenu.parentNode.removeChild(submenu);
  }
};

export const designCompactSidebar = (icons) => {
  const container = document.getElementById("compact-menu-items");
  container.innerHTML = "";

  icons.forEach((child) => {
    const item = createMenuItem(child);
    container.appendChild(item);
  });

  document.addEventListener("click", (event) => {
    const isMenuClick =
      event.target.closest(".menu-item") || event.target.closest(".submenu");
    if (!isMenuClick) {
      hideAllSubmenus();
    }
  });
};
