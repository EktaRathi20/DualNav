export const sidebarStore = {
  get state() {
    return localStorage.getItem("sidebarState") || "right";
  },
  set state(value) {
    localStorage.setItem("sidebarState", value);
  },
  get selectedIcon() {
    return localStorage.getItem("selectedIcon") || "Table";
  },
  set selectedIcon(value) {
    localStorage.setItem("selectedIcon", value);
  },
};
