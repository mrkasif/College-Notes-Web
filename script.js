const fallbackData = {
  years: [
    {
      year: "Year 1",
      semesters: [
        {
          name: "Semester 1",
          subjects: [
            { name: "Hindi", image: "https://picsum.photos/seed/hindi-notes/1200/700", pdf: "notes/year-1/sem-1/hindi.pdf" },
            { name: "Writing Skills", image: "https://picsum.photos/seed/writing-skills-notes/1200/700", pdf: "notes/year-1/sem-1/writing-skills.pdf" },
            { name: "Communication Skills", image: "https://picsum.photos/seed/communication-skills-notes/1200/700", pdf: "notes/year-1/sem-1/communication-skills.pdf" },
            { name: "Mathematics", image: "https://picsum.photos/seed/mathematics-notes/1200/700", pdf: "notes/year-1/sem-1/mathematics.pdf" },
            { name: "C Programming", image: "https://picsum.photos/seed/c-programming-notes/1200/700", pdf: "notes/year-1/sem-1/c-programming.pdf" },
            { name: "Computer Fundamentals", image: "https://picsum.photos/seed/computer-fundamentals-notes/1200/700", pdf: "notes/year-1/sem-1/computer-fundamentals.pdf" },
            { name: "Operating System", image: "https://picsum.photos/seed/operating-system-notes/1200/700", pdf: "notes/year-1/sem-1/operating-system.pdf" }
          ]
        },
        {
          name: "Semester 2",
          subjects: [
            { name: "Constitution Of India", image: "https://picsum.photos/seed/constitution-of-india-notes/1200/700", pdf: "notes/year-2/sem-3/constitution-of-india.pdf" },
            { name: "Microprocessor 8086", image: "https://picsum.photos/seed/microprocessor-8086-notes/1200/700", pdf: "notes/year-2/sem-3/microprocessor-8086.pdf" },
            { name: "Database Management System", image: "https://picsum.photos/seed/dbms-notes/1200/700", pdf: "notes/year-2/sem-3/database-management-system.pdf" },
            { name: "Data Structures", image: "https://picsum.photos/seed/data-structures-notes/1200/700", pdf: "notes/year-2/sem-3/data-structures.pdf" },
            { name: "Communication Skills", image: "https://picsum.photos/seed/communication-skills-2-notes/1200/700", pdf: "notes/year-2/sem-3/communication-skills.pdf" },
            { name: "C Programming", image: "https://picsum.photos/seed/c-programming-2-notes/1200/700", pdf: "notes/year-2/sem-3/c-programming.pdf" }
          ]
        }
      ]
    },
    {
      year: "Year 2",
      semesters: [
        {
          name: "Semester 3",
          subjects: [
            { name: "English Communication", image: "https://picsum.photos/seed/english-communication-notes/1200/700", pdf: "notes/year-1/sem-2/english-communication.pdf" },
            { name: "C++ Programming", image: "https://picsum.photos/seed/cpp-programming-notes/1200/700", pdf: "notes/year-1/sem-2/cpp-programming.pdf" },
            { name: "Basics Of Android", image: "https://picsum.photos/seed/basics-of-android-notes/1200/700", pdf: "notes/year-1/sem-2/basics-of-android.pdf" },
            { name: "Web Development", image: "https://picsum.photos/seed/web-development-notes/1200/700", pdf: "notes/year-1/sem-2/web-development.pdf" },
            { name: "Statistics", image: "https://picsum.photos/seed/statistics-notes/1200/700", pdf: "notes/year-1/sem-2/statistics.pdf" },
            { name: "Enterprise Resource Planning", image: "https://picsum.photos/seed/erp-notes/1200/700", pdf: "notes/year-1/sem-2/enterprise-resource-planning.pdf" }
          ]
        },
        {
          name: "Semester 4",
          subjects: [
            { name: "Advance Android", image: "https://picsum.photos/seed/advance-android-notes/1200/700", pdf: "notes/year-2/sem-4/advance-android.pdf" },
            { name: "Java", image: "https://picsum.photos/seed/java-notes/1200/700", pdf: "notes/year-2/sem-4/java.pdf" },
            { name: "RDBMS", image: "https://picsum.photos/seed/rdbms-notes/1200/700", pdf: "notes/year-2/sem-4/rdbms.pdf" },
            { name: "Digital Marketing", image: "https://picsum.photos/seed/digital-marketing-notes/1200/700", pdf: "notes/year-2/sem-4/digital-marketing.pdf" },
            { name: "Web Developement 2", image: "https://picsum.photos/seed/web-developement-2-notes/1200/700", pdf: "notes/year-2/sem-4/web-developement-2.pdf" },
            { name: "English", image: "https://picsum.photos/seed/english-notes/1200/700", pdf: "notes/year-2/sem-4/english.pdf" }
          ]
        }
      ]
    },
    {
      year: "Year 3",
      semesters: [
        {
          name: "Semester 5",
          subjects: []
        },
        {
          name: "Semester 6",
          subjects: []
        }
      ]
    }
  ]
};

const state = {
  subjects: [],
  search: "",
  semesterFilter: "all"
};

function normalizeSubject(subject, idx, yearName, semesterName) {
  if (typeof subject === "string") {
    return {
      id: `${yearName}-${semesterName}-${idx}`,
      name: subject,
      image: "https://picsum.photos/seed/default-subject-notes/1200/700",
      pdf: "",
      year: yearName,
      semester: semesterName,
      semesterNumber: extractSemesterNumber(semesterName)
    };
  }

  return {
    id: `${yearName}-${semesterName}-${idx}-${subject?.name || "subject"}`,
    name: subject?.name || `Subject ${idx + 1}`,
    image: subject?.image || "https://picsum.photos/seed/default-subject-notes/1200/700",
    pdf: typeof subject?.pdf === "string" ? subject.pdf : "",
    year: yearName,
    semester: semesterName,
    semesterNumber: extractSemesterNumber(semesterName)
  };
}

function extractSemesterNumber(semesterName) {
  const match = String(semesterName || "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function flattenData(data) {
  const years = Array.isArray(data?.years) ? data.years : [];
  const flattened = [];

  years.forEach((yearObj, yearIdx) => {
    const yearName = yearObj?.year || `Year ${yearIdx + 1}`;
    const semesters = Array.isArray(yearObj?.semesters) ? yearObj.semesters : [];

    semesters.forEach((semObj, semIdx) => {
      const semesterName = typeof semObj === "string" ? semObj : (semObj?.name || `Semester ${semIdx + 1}`);
      const subjects = typeof semObj === "string" ? [] : (Array.isArray(semObj?.subjects) ? semObj.subjects : []);

      subjects.forEach((subject, subjectIdx) => {
        flattened.push(normalizeSubject(subject, subjectIdx, yearName, semesterName));
      });
    });
  });

  return flattened;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFilteredSubjects() {
  const search = state.search.trim().toLowerCase();

  return state.subjects.filter((subject) => {
    const bySemester = state.semesterFilter === "all" || String(subject.semesterNumber) === state.semesterFilter;
    const bySearch = !search || subject.name.toLowerCase().includes(search);
    return bySemester && bySearch;
  });
}

function renderFilters() {
  const filtersEl = document.getElementById("semesterFilters");
  if (!filtersEl) return;

  const semesterNumbers = [1, 2, 3, 4, 5, 6];

  const chips = [
    `<button class="filter-btn ${state.semesterFilter === "all" ? "active" : ""}" data-semester="all">All Subjects</button>`,
    ...semesterNumbers.map((n) => `<button class="filter-btn ${state.semesterFilter === String(n) ? "active" : ""}" data-semester="${n}">Semester ${n}</button>`)
  ];

  filtersEl.innerHTML = chips.join("");
}

function renderSubjects() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  const subjects = getFilteredSubjects();

  if (subjects.length === 0) {
    grid.innerHTML = '<div class="empty-state">No subjects found for this filter.</div>';
    return;
  }

  grid.innerHTML = subjects
    .map((subject) => {
      const title = escapeHtml(subject.name);
      const subtitle = escapeHtml(`${subject.year} - ${subject.semester}`);
      const image = escapeHtml(subject.image);
      const pdf = escapeHtml(subject.pdf);

      return `
        <button class="subject-card" style="background-image: url('${image}');" data-title="${title}" data-pdf="${pdf}">
          <span class="subject-card__label">${title}</span>
          <span class="subject-card__meta">${subtitle}</span>
        </button>
      `;
    })
    .join("");
}

function renderAll() {
  renderFilters();
  renderSubjects();
}

function setupControls() {
  const searchInput = document.getElementById("searchInput");
  const filtersEl = document.getElementById("semesterFilters");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.search = event.target.value || "";
      renderSubjects();
    });
  }

  if (filtersEl) {
    filtersEl.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;

      state.semesterFilter = button.getAttribute("data-semester") || "all";
      renderAll();
    });
  }

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput?.focus();
    }
  });
}

function setupPdfViewer() {
  const grid = document.getElementById("subjectGrid");
  const viewerSection = document.getElementById("pdfViewerSection");
  const viewerTitle = document.getElementById("viewerTitle");
  const pdfFrame = document.getElementById("pdfFrame");
  const closeViewerBtn = document.getElementById("closeViewerBtn");

  if (!grid || !viewerSection || !viewerTitle || !pdfFrame || !closeViewerBtn) return;

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".subject-card");
    if (!card) return;

    const pdfPath = card.getAttribute("data-pdf") || "";
    const title = card.getAttribute("data-title") || "PDF Viewer";
    if (!pdfPath) return;

    viewerTitle.textContent = title;
    pdfFrame.src = pdfPath;
    viewerSection.classList.remove("is-hidden");
    viewerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  closeViewerBtn.addEventListener("click", () => {
    viewerSection.classList.add("is-hidden");
    pdfFrame.removeAttribute("src");
    viewerTitle.textContent = "PDF Viewer";
  });
}

async function loadData() {
  const paths = ["data/data.json", "data/subjects.json"];

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;

      const content = await response.text();
      if (!content.trim()) continue;

      return JSON.parse(content);
    } catch (error) {
      // Try next source.
    }
  }

  return fallbackData;
}

(async function init() {
  setupControls();
  setupPdfViewer();

  const data = await loadData();
  state.subjects = flattenData(data);

  if (state.subjects.length === 0) {
    state.subjects = flattenData(fallbackData);
  }

  renderAll();
})();
