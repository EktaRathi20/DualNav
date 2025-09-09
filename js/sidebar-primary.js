import { SIDEBAR_PRIMARY } from "../constants/constant.js";
import { sidebarStore } from "../store/sidebar-store.js";
import { createIcon } from "../utils/helpers.js";
import { getMenuItems } from "./sidebar-secondary.js";

const appendIcons = (container, icons) => {
  for (const key in icons) {
    const element = createIcon(icons[key]);

    element.addEventListener("click", async () => {
      try {
        sidebarStore.selectedIcon = key;
        getMenuItems(key);
      } catch (error) {
        console.error("Failed to load sidebar-secondary module:", error);
      }
    });

    container.appendChild(element);
  }
};

const setIconsTop = () => {
  const iconContainerTop = document.querySelector("#icon-container .top");
  if (!iconContainerTop) {
    return;
  }
  appendIcons(iconContainerTop, SIDEBAR_PRIMARY.top);
};

const setIconsBottom = () => {
  const iconContainerBottom = document.querySelector("#icon-container .bottom");
  appendIcons(iconContainerBottom, SIDEBAR_PRIMARY.bottom);
};

const setIcons = () => {
  setIconsTop();
  setIconsBottom();
};

setIcons();
