// Local Posts Data
const posts = [
  {
    id: 1,
    title: "Getting Started with Blogging",
    date: "2025-09-01",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=60",
    tags: ["blogging", "writing", "beginner"],
    content:
      "Blogging is one of the easiest ways to express your thoughts online. This post explains how to start, what tools you need, and how to keep consistency."
  },
  {
    id: 2,
    title: "Responsive Design Basics",
    date: "2025-09-10",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    tags: ["web", "css", "responsive"],
    content:
      "Responsive design ensures your website looks good on all devices. Learn the basics of mobile-first design, flexible grids, and media queries."
  },
  {
    id: 3,
    title: "Why Writers Love Minimal Platforms",
    date: "2025-09-15",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60",
    tags: ["writers", "tools", "minimalism"],
    content:
      "Writers need focus, not distraction. Minimal platforms cut the noise and let you do what you love most — write and share."
  },
  {
    id: 4,
    title: "Top 5 CSS Tricks Every Developer Should Know",
    date: "2025-09-18",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=60",
    tags: ["css", "design", "web"],
    content:
      "CSS can do magic if used correctly. From flexbox tricks to grid layouts, here are 5 tips to make your website stand out."
  },
  {
    id: 5,
    title: "JavaScript for Beginners",
    date: "2025-09-20",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=60",
    tags: ["javascript", "programming", "beginner"],
    content:
      "JavaScript is the brain of modern web apps. If you are new to coding, start with these basics to build dynamic and interactive websites."
  },
  {
    id: 6,
    title: "Productivity Hacks for Writers",
    date: "2025-09-23",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
    tags: ["writing", "productivity", "tools"],
    content:
      "Every writer faces writer's block sometimes. These simple productivity hacks will help you write more consistently and effectively."
  }
];

// DOM Elements
const postsContainer = document.getElementById("postsContainer");
const tagsContainer = document.getElementById("tags");
const recentContainer = document.getElementById("recent");
const yearEl = document.getElementById("year");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Modal elements
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalImage = document.getElementById("modalImage");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

// Render Posts
function renderPosts(list) {
  postsContainer.innerHTML = "";
  if (list.length === 0) {
    postsContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  list.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post";
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <h3>${post.title}</h3>
        <p style="color: var(--muted); font-size: 0.9rem;">${post.date}</p>
        <p>${post.content.substring(0, 100)}...</p>
      `;
    card.addEventListener("click", () => openModal(post));
    postsContainer.appendChild(card);
  });
}

// Render Tags
function renderTags() {
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  tagsContainer.innerHTML = "";
  allTags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    span.addEventListener("click", () => {
      const filtered = posts.filter((p) => p.tags.includes(tag));
      renderPosts(filtered);
    });
    tagsContainer.appendChild(span);
  });
}

// Render Recent Posts
function renderRecent() {
  recentContainer.innerHTML = "";
  const recent = posts.slice(-3).reverse();
  recent.forEach((p) => {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = p.title;
    link.addEventListener("click", () => openModal(p));
    recentContainer.appendChild(link);
  });
}

// Search Function
function searchPosts() {
  const q = searchInput.value.toLowerCase();
  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );
  renderPosts(filtered);
}

// Modal Functions
function openModal(post) {
  modalTitle.textContent = post.title;
  modalMeta.textContent = post.date + " · " + post.tags.join(", ");
  modalImage.src = post.image;
  modalBody.textContent = post.content;
  overlay.style.display = "flex";
}

function closeModalFn() {
  overlay.style.display = "none";
}

// Event Listeners
searchBtn.addEventListener("click", searchPosts);
closeModal.addEventListener("click", closeModalFn);
window.addEventListener("click", (e) => {
  if (e.target === overlay) closeModalFn();
});

// Initialize
renderPosts(posts);
renderTags();
renderRecent();
yearEl.textContent = new Date().getFullYear();

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

