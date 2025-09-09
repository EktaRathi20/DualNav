import { SIDEBAR_SECONDARY, TOGGLE_SIDEBAR } from "../constants/constant.js";
import { setIcon } from "../utils/helpers.js";
import { sidebarStore } from "../store/sidebar-store.js";

const updateButtonState = (btn, state) => {
  const sidebar = document.getElementById("sidebar-secondary");

  // remove old state classes
  sidebar.classList.remove("right", "left");

  // update store + button
  sidebarStore.state = state;
  btn.dataset.state = state;
  setIcon(btn, TOGGLE_SIDEBAR[state]);

  // add new state class
  sidebar.classList.add(state);
};

const loadMenu = (type, icons) => {
  const menuContainer = document.getElementById("menu-container");
  fetch(`./components/menu-${type}.html`)
    .then((response) => response.text())
    .then(async (html) => {
      menuContainer.innerHTML = html;

      if (type === "expanded") {
        const { designExpandedSidebar } = await import("./menu-expanded.js");
        designExpandedSidebar(icons);
      } else {
        const { designCompactSidebar } = await import("./menu-compact.js");
        designCompactSidebar(icons);
      }
    });
};

export const getMenuItems = (parentIcon) => {
  document.getElementById("sidebar-label").innerHTML = parentIcon;

  const icons =
    SIDEBAR_SECONDARY.find((item) => item.parentIcon === parentIcon)
      ?.children || [];

  const state = sidebarStore.state;
  state === "right" ? loadMenu("expanded", icons) : loadMenu("compact", icons);
};

const setupToggleBtn = () => {
  const btn = document.getElementById("toggle-menu");
  if (!btn) return;

  // Initial setup
  updateButtonState(btn, sidebarStore.state);

  // Toggle
  btn.addEventListener("click", () => {
    sidebarStore.state = sidebarStore.state === "right" ? "left" : "right";
    updateButtonState(btn, sidebarStore.state);

    const parentIcon = localStorage.getItem("selectedIcon");
    getMenuItems(parentIcon);
  });
};

const setupMenu = () => {
  sidebarStore.selectedIcon = sidebarStore.selectedIcon;
  getMenuItems(sidebarStore.selectedIcon);
};

const initSidebar = () => {
  setupToggleBtn();
  setupMenu();
};

initSidebar();
