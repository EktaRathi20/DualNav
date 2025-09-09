import { DROPDOWN_ICONS } from "../constants/constant.js";
import { setIcon } from "../utils/helpers.js";

// Create Submenu Item
const createSubmenu = (children) => {
  const dropdown = document.createElement("div");
  dropdown.className = "submenu hidden"; // hidden by default

  // SUBMENU ITEMS
  children.forEach((sub) => {
    const subItem = document.createElement("div");
    subItem.className = "submenu-item";
    subItem.textContent = sub.title;
    dropdown.appendChild(subItem);
  });

  return dropdown;
};

// Close all other submenus
const closeOtherSubmenus = (container, dropdown, arrow) => {
  const allSubmenus = container.querySelectorAll(".submenu");
  const allArrows = container.querySelectorAll(".arrow");

  allSubmenus.forEach((menu) => {
    if (menu !== dropdown) {
      menu.classList.add("hidden");
    }
  });

  allArrows.forEach((a) => {
    if (a !== arrow) {
      a.innerHTML = DROPDOWN_ICONS.up;
    }
  });
};

// Create Menu Item
const createMenuItem = (child, container) => {
  const item = document.createElement("div");
  item.className = "menu-item";

  // wrapper for icon + title
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "menu-title-wrapper";

  const iconTitleWrapper = document.createElement("div");
  iconTitleWrapper.className = "menu-title-icon-wrapper";

  // ICON
  if (child.icon) {
    setIcon(iconTitleWrapper, child.icon);
  }

  // TITLE
  const titleDiv = document.createElement("span");
  titleDiv.className = "menu-title";
  titleDiv.textContent = child.title;
  iconTitleWrapper.appendChild(titleDiv);

  titleWrapper.appendChild(iconTitleWrapper);

  // submenu handling
  if (child.children && child.children.length > 0) {
    // ARROW
    const arrow = document.createElement("div");
    arrow.className = "arrow icon";
    arrow.innerHTML = DROPDOWN_ICONS.up;
    titleWrapper.appendChild(arrow);

    const dropdown = createSubmenu(child.children);

    // Toggle submenu on click
    titleWrapper.addEventListener("click", () => {
      closeOtherSubmenus(container, dropdown, arrow);

      dropdown.classList.toggle("hidden");
      arrow.innerHTML = dropdown.classList.contains("hidden")
        ? DROPDOWN_ICONS.up
        : DROPDOWN_ICONS.down;
    });

    item.appendChild(titleWrapper);
    item.appendChild(dropdown);
  } else {
    item.appendChild(titleWrapper);
  }
  return item;
};

// Design Expanded Sidebar
export const designExpandedSidebar = (icons) => {
  const container = document.getElementById("expanded-menu-items");
  container.innerHTML = "";

  icons.forEach((child) => {
    const item = createMenuItem(child, container);
    container.appendChild(item);
  });
};
