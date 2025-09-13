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

export const calculatePosition = (menu, submenu) => {
  submenu.style.top = submenu.style.bottom = submenu.style.height = ""; // Reset styles
  const topbarHeight = 0; // Get topbar height
  const menuProperty = menu.getBoundingClientRect(); // Get menu property
  console.log(menuProperty);
  const availableArea = window.innerHeight - topbarHeight; // Calculate available space

  // Get submenu properties
  const submenuHeight = submenu.getBoundingClientRect().height;
  const submenuBottom = menuProperty.top + submenuHeight;

  // Calculate distances in reference to the menu.
  const topDistance = menuProperty.top - topbarHeight;
  const bottomDistance = window.innerHeight - menuProperty.top;

  // By default, open the submenu in a downward direction
  submenu.style.top = `${menuProperty.top - topbarHeight}px`;
  submenu.style.bottom = "auto";

  // Check if submenu extends beyond the screen's bottom
  if (submenuBottom > window.innerHeight) {
    // Check if submenu size is larger than available area or top distance
    if (submenuHeight > availableArea || submenuHeight >= topDistance) {
      // Determine whether to open upwards or downwards based on distances
      if (bottomDistance > topDistance) {
        // Open downwards with scroll
        submenu.style.height = `calc(100vh - ${menuProperty.top}px)`;
      } else {
        // Open upwards with scroll
        submenu.style.bottom = `${window.innerHeight - menuProperty.bottom}px`;
        submenu.style.top = "auto";
        submenu.style.height = `calc(100vh - ${
          window.innerHeight - menuProperty.top + topbarHeight
        }px)`;
      }
      submenu.style.overflow = "auto"; // Enable scrolling
    } else {
      // Open downwards without scrolling
      submenu.style.bottom = `${window.innerHeight - menuProperty.bottom}px`;
      submenu.style.top = "auto";
    }
  }
};

export const hideAllSubmenus = () => {
  const allSubmenus = document.querySelectorAll(".submenu");
  allSubmenus.forEach((submenu) => {
    submenu.classList.remove("visible");
  });
};

export const showSubmenu = (submenu) => {
  hideAllSubmenus();
  submenu.classList.add("visible");
};

export const hideSubmenu = (submenu) => {
  submenu.classList.remove("visible");
};
