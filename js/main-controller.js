const fetchSidebar1 = () => {
  fetch("../components/sidebar-primary.html")
    .then((response) => response.text())
    .then((response) => {
      document.getElementById("sidebar-primary").innerHTML = response;
      import("./sidebar-primary.js");
    })
    .catch((error) => {
      console.error("Failed to load sidebar-primary:", error);
    });
};

const fetchSidebar2 = () => {
  fetch("../components/sidebar-secondary.html")
    .then((response) => response.text())
    .then((response) => {
      document.getElementById("sidebar-secondary").innerHTML = response;
      import("./sidebar-secondary.js");
    })
    .catch((error) => {
      console.error("Failed to load sidebar-secondary:", error);
    });
};

const fetchContent = () => {
  fetch("../components/content.html")
    .then((response) => response.text())
    .then((response) => {
      document.getElementById("content").innerHTML = response;
      import("./content.js");
    })
    .catch((error) => {
      console.error("Failed to load content:", error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  fetchSidebar1();
  fetchSidebar2();
  fetchContent();
});
