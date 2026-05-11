/**
 * /js/theme.js
 * Lightweight UI State Manager for StackHeal.
 * Enforces Dark Mode persistence and global DOM triggers.
 * Strictly Vanilla ES6. No dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lock the root attribute for CSS variable targeting
  document.documentElement.setAttribute('data-theme', 'dark');

  // 2. Global Search Interface Logic
  const searchInput = document.querySelector('[data-search-trigger]');
  
  if (searchInput) {
    // Implement standard developer shortcut (CMD/CTRL + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // Glassmorphic state transitions based on focus
    searchInput.addEventListener('focus', () => {
      const container = searchInput.closest('.search-container');
      if (container) container.classList.add('search-active');
    });

    searchInput.addEventListener('blur', () => {
      const container = searchInput.closest('.search-container');
      if (container) container.classList.remove('search-active');
    });
  }

  console.info('StackHeal Architect: UI State Initialized. Theme locked.');
});