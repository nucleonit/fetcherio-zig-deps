const PACKAGES_DB = [
  {
    name: "zmath",
    version: "0.11.0",
    description:
      "2D/3D math primitives for game dev: vectors, matrices, and quaternions. No hidden allocations. Made for Zig (possibly outdated)",
    command: "zig fetch --save git+https://github.com/zig-gamedev/zmath.git",
    tags: ["math", "3d", "2d", "gamedev"],
    build: `// Add it on line 85
const zmath = b.dependency("zmath", .{});
exe.root_module.addImport("zmath", zmath.module("root"));`,
    readme: `# [zmath documentation](https://github.com/zig-gamedev/zmath/blob/main/README.md)\nClick on this url^^`,
  },
  {
    name: "zap",
    version: "0.16.0",
    description:
      "HTTP server and web microframework for Zig, built on facil.io. Low overhead, high performance, and zero fluff for your REST APIs.",
    command: "zig fetch --save git+https://github.com/zigzap/zap#v0.11.0",
    tags: ["net", "http", "server", "web"],
    build: `const zap = b.dependency("zap", .{\n    .target = target,\n    .optimize = optimize,\n    openssl = false, // set to true to enable TLS support\n});\n\nexe.root_module.addImport("zap", zap.module("zap"));`,
    readme: `# [zap documentation](https://github.com/zigzap/zap/blob/master/README.md)\nClick on this url^^`,
  },
  {
    name: "Raylib (Zig)",
    version: "6.0/0.16.0",
    description:
      "Zig bindings for raylib. The fastest way to write 2D/3D games in Zig, directly wrapping the C API without extra bloat.",
    command:
      "zig fetch --save git+https://github.com/raylib-zig/raylib-zig#devel",
    tags: ["gamedev", "game", "c", "2d3d"],
    build: `const raylib_dep = b.dependency("raylib_zig", .{\n    .target = target,\n    .optimize = optimize,\n});\n\nconst raylib = raylib_dep.module("raylib"); // main raylib module\nconst raygui = raylib_dep.module("raygui"); // raygui module\nconst raylib_artifact = raylib_dep.artifact("raylib"); // raylib C library\n\n// artifact\nexe.root_module.linkLibrary(raylib_artifact);\nexe.root_module.addImport("raylib", raylib);\nexe.root_module.addImport("raygui", raygui);`,
    readme: `# [Raylib (zig) documentation](https://github.com/raylib-zig/raylib-zig/blob/devel/README.md)\nClick on this url^^`,
  },
  {
    name: "iguanaTLS",
    version: "0.7",
    description:
      "Pure Zig TLS 1.2/1.3 implementation. No libc dependency. Works with std.http.Client (possibly outdated)",
    command:
      "zig fetch --save https://github.com/alexnask/iguanaTLS #possibly not working",
    tags: ["net", "security", "tls", "https"],
    build: `// possibly outdated\nconst Builder = @import("std").build.Builder;\n\npub fn build(b: *Builder) void {\n    const mode = b.standardReleaseOptions();\n    const lib = b.addStaticLibrary("iguanaTLS", "src/main.zig");\n    lib.setBuildMode(mode);\n    lib.install();\n\n    var main_tests = b.addTest("src/main.zig");\n    main_tests.setBuildMode(mode);\n\n    const test_step = b.step("test", "Run library tests");\n    test_step.dependOn(&main_tests.step);\n}`,
    readme: `https://github.com/alexnask/iguanaTLS/tree/master`,
  },
  {
    name: "zig-yaml",
    version: "0.2.0",
    description:
      "YAML parser and emitter for Zig. Supports anchors, aliases, and custom tags.",
    command:
      "zig fetch --save https://github.com/kubkon/zig-yaml/archive/refs/tags/0.2.0.tar.gz",
    tags: ["yaml", "parser", "config", "serialization"],
    build: `// add that code after "b.installArtifact(exe)" line\nconst yaml = b.dependency("yaml", .{\n    .target = target,\n    .optimize = optimize,\n});\nexe.root_module.addImport("yaml", yaml.module("yaml"));`,
    readme: `# [zig-yaml documentation](https://github.com/kubkon/zig-yaml/blob/main/README.md)\nClick on this url^^`,
  },
  {
    name: "zig-pg",
    version: "master",
    description:
      "Async PostgreSQL driver for Zig. Uses io_uring or epoll. Simple and efficient.",
    command: "zig fetch --save git+https://github.com/karlseguin/pg.zig#master",
    tags: ["database", "postgresql", "async", "sql"],
    build: `// full (outdated, revisions are needed)\nconst pg_module = b.dependency("pg", .{}).module("pg");\n\n// the executable from your executable/library\nconst exe = b.addExecutable(.{\n    .name = "example",\n    ...\n    .imports = &.{\n        .{ .name = "pg", .module = pg_module },\n    },\n});`,
    readme: `# [zig-pg documentation](https://github.com/karlseguin/pg.zig/blob/master/readme.md)\nClick on this url^^`,
  },
  {
    name: "Capy UI",
    version: "z0.14.1",
    description:
      "A declarative GUI library for Zig using native controls from the OS. Easy to write, versatile. (Revisions are needed)",
    command:
      "# Command not found; if you find it, please make the necessary edits.",
    tags: ["gui", "desktop", "windowing", "ui"],
    build: `// The code was not found; if you locate it, please make the necessary corrections.`,
    readme: `# [Capy UI documentation](https://capy-ui.org/docs/getting-started/installation)\nClick on this url^^`,
  },
  {
    name: "zig-clap",
    version: "0.12.0",
    description:
      "Simple CLI argument parser. No runtime allocations. Getopt replacement done right.",
    command: "zig fetch --save git+https://github.com/Hejsil/zig-clap",
    tags: ["cli", "parser", "tools", "args"],
    build: `const clap = b.dependency("clap", .{});\nexe.root_module.addImport("clap", clap.module("clap"));`,
    readme: `# [zig-clap documentation](https://github.com/Hejsil/zig-clap/blob/master/README.md)\nClick on this url^^`,
  },
];

function shufflePackages(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const openAddFormBtn = document.getElementById("open-add-form-btn");
const openUpdateFormBtn = document.getElementById("open-update-form-btn");
const openSettingsBtn = document.getElementById("open-settings-btn");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const closeSidebarBtn = document.getElementById("close-sidebar-btn");
const formTitle = document.getElementById("form-title");
const formRequestType = document.getElementById("form-request-type");
const detailsOverlay = document.getElementById("details-sidebar-overlay");
const closeDetailsBtn = document.getElementById("close-details-btn");
const settingsOverlay = document.getElementById("settings-sidebar-overlay");
const closeSettingsBtn = document.getElementById("close-settings-btn");
const searchInput = document.querySelector(".search-input");
const packagesList = document.querySelector(".packages-list");
const themeToggle = document.getElementById("theme-toggle");
const sortSelect = document.getElementById("sort-select"); // NEW

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  if (themeToggle) themeToggle.checked = true;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function openSidebar(mode) {
  if (mode === "add") {
    formTitle.innerText = "Suggest a New Zig Package";
    formRequestType.value = "New Package Submission";
    openAddFormBtn.classList.add("active-btn");
    openUpdateFormBtn.classList.remove("active-btn");
  } else {
    formTitle.innerText = "Update Existing Zig Package";
    formRequestType.value = "Update Package Request";
    openUpdateFormBtn.classList.add("active-btn");
    openAddFormBtn.classList.remove("active-btn");
  }
  closeDetailsSidebar();
  closeSettingsSidebar();
  sidebarOverlay.style.display = "flex";
  setTimeout(() => sidebarOverlay.classList.add("open"), 10);
}

function closeSidebar() {
  sidebarOverlay.classList.remove("open");
  openAddFormBtn.classList.remove("active-btn");
  openUpdateFormBtn.classList.remove("active-btn");
  setTimeout(() => {
    sidebarOverlay.style.display = "none";
  }, 300);
}

function openSettingsSidebar() {
  closeSidebar();
  closeDetailsSidebar();
  settingsOverlay.style.display = "flex";
  setTimeout(() => settingsOverlay.classList.add("open"), 10);
}

function closeSettingsSidebar() {
  settingsOverlay.classList.remove("open");
  setTimeout(() => {
    settingsOverlay.style.display = "none";
  }, 300);
}

const tabInstallBtn = document.getElementById("tab-install-btn");
const tabReadmeBtn = document.getElementById("tab-readme-btn");
const sectionInstall = document.getElementById("section-install");
const sectionReadme = document.getElementById("section-readme");

function switchTab(tab) {
  if (tab === "install") {
    tabInstallBtn.classList.add("active-tab-btn");
    tabReadmeBtn.classList.remove("active-tab-btn");
    sectionInstall.style.display = "block";
    sectionReadme.style.display = "none";
  } else {
    tabReadmeBtn.classList.add("active-tab-btn");
    tabInstallBtn.classList.remove("active-tab-btn");
    sectionInstall.style.display = "none";
    sectionReadme.style.display = "block";
  }
}

tabInstallBtn.addEventListener("click", () => switchTab("install"));
tabReadmeBtn.addEventListener("click", () => switchTab("readme"));

function openDetailsSidebar(pkg) {
  closeSidebar();
  closeSettingsSidebar();
  switchTab("install");

  document.getElementById("det-name").innerText = pkg.name;
  document.getElementById("det-version").innerText = pkg.version;
  document.getElementById("det-desc").innerText = pkg.description;
  document.getElementById("det-cmd").innerText = pkg.command;

  const buildCode = document.getElementById("det-build");
  buildCode.textContent = pkg.build;

  const readmeContainer = document.getElementById("det-readme-content");
  if (pkg.readme && window.marked) {
    readmeContainer.innerHTML = window.marked.parse(pkg.readme);
  } else {
    readmeContainer.innerHTML =
      '<p style="color: gray;">No documentation provided for this package.</p>';
  }

  const copyBtns = detailsOverlay.querySelectorAll(".install-box .copy-btn");
  copyBtns.forEach((button) => {
    button.innerText = "Copy";
    button.style.backgroundColor = "";
    button.style.color = "";

    button.onclick = () => {
      const codeElement =
        button.parentElement.querySelector(".install-code") ||
        button.parentElement.querySelector("code");
      navigator.clipboard.writeText(codeElement.innerText).then(() => {
        showToast("Copied to clipboard!");
      });
    };
  });

  detailsOverlay.style.display = "flex";
  setTimeout(() => detailsOverlay.classList.add("open"), 10);
}

function closeDetailsSidebar() {
  detailsOverlay.classList.remove("open");
  setTimeout(() => {
    detailsOverlay.style.display = "none";
  }, 300);
}

openAddFormBtn.addEventListener("click", () => {
  if (
    sidebarOverlay.classList.contains("open") &&
    openAddFormBtn.classList.contains("active-btn")
  ) {
    closeSidebar();
  } else {
    openSidebar("add");
  }
});

openUpdateFormBtn.addEventListener("click", () => {
  if (
    sidebarOverlay.classList.contains("open") &&
    openUpdateFormBtn.classList.contains("active-btn")
  ) {
    closeSidebar();
  } else {
    openSidebar("update");
  }
});

openSettingsBtn.addEventListener("click", () => {
  if (settingsOverlay.classList.contains("open")) {
    closeSettingsSidebar();
  } else {
    openSettingsSidebar();
  }
});

closeSidebarBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", (e) => {
  if (e.target === sidebarOverlay) closeSidebar();
});

closeDetailsBtn.addEventListener("click", closeDetailsSidebar);
detailsOverlay.addEventListener("click", (e) => {
  if (e.target === detailsOverlay) closeDetailsSidebar();
});

closeSettingsBtn.addEventListener("click", closeSettingsSidebar);
settingsOverlay.addEventListener("click", (e) => {
  if (e.target === settingsOverlay) closeSettingsSidebar();
});

if (themeToggle) {
  themeToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  });
}

function renderPackages(packages) {
  packagesList.innerHTML = "";
  const counter = document.getElementById("package-counter");
  if (packages.length === 0) {
    counter.innerText = "(0)";
  } else {
    counter.innerText = `(${packages.length})`;
  }
  if (packages.length === 0) {
    packagesList.innerHTML =
      '<p class="anytext" style="color: gray;">No packages found...</p>';
    return;
  }

  packages.forEach((pkg) => {
    const tagsHtml = pkg.tags
      .map(
        (tag) =>
          `<span class="package-version" style="margin-right: 5px; ">#${tag}</span>`,
      )
      .join("");
    const cardHtml = `
      <div class="package-card" data-pkg-name="${pkg.name}">
          <div class="package-main-content">
              <div class="package-header">
                  <h3 class="package-name">${pkg.name}</h3>
                  <span class="package-version">${pkg.version}</span>
              </div>
              <p class="package-description">${pkg.description}</p>
              <div style="margin-top: auto; padding-top: 10px;">${tagsHtml}</div>
          </div>
      </div>
    `;
    packagesList.insertAdjacentHTML("beforeend", cardHtml);
  });

  packagesList.querySelectorAll(".package-card").forEach((card) => {
    card.addEventListener("click", () => {
      const pkgData = PACKAGES_DB.find(
        (p) => p.name === card.getAttribute("data-pkg-name"),
      );
      if (pkgData) openDetailsSidebar(pkgData);
    });
  });
}

function sortPackages(array, sortType) {
  const sorted = [...array];
  switch (sortType) {
    case "az":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "newest":
      sorted.sort((a, b) =>
        b.version.localeCompare(a.version, undefined, { numeric: true }),
      );
      break;
    default:
      shufflePackages(sorted);
      break;
  }
  return sorted;
}

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    const query = searchInput.value.toLowerCase().trim();
    let filtered = PACKAGES_DB;
    if (query) {
      filtered = PACKAGES_DB.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }
    const sortedData = sortPackages(filtered, e.target.value);
    renderPackages(sortedData);
  });
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  let filtered = PACKAGES_DB;
  if (query) {
    filtered = PACKAGES_DB.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(query) ||
        pkg.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }
  const sortedData = sortPackages(filtered, sortSelect.value);
  renderPackages(sortedData);
});

shufflePackages(PACKAGES_DB);
renderPackages(PACKAGES_DB);
