/**
 * /js/code-copy.js
 * Handles clipboard interactions for code blocks.
 * Zero dependency. Triggers GTM custom events on successful copy.
 */

const SVG_CLIPBOARD = `<svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
const SVG_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="var(--status-cure)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.code-container .copy-btn');

  copyButtons.forEach(button => {
    // Inject default clipboard SVG
    button.innerHTML = SVG_CLIPBOARD;

    button.addEventListener('click', async () => {
      const codeBlock = button.closest('.code-container').querySelector('code');
      if (!codeBlock) return;

      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        
        // Push custom event to GTM dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'copy_code_click' });

        // State change to checkmark
        button.innerHTML = SVG_CHECK;
        
        // Revert to clipboard after 2 seconds
        setTimeout(() => {
          button.innerHTML = SVG_CLIPBOARD;
        }, 2000);
      } catch (err) {
        console.error('StackHeal Diagnostic: Failed to copy text.', err);
      }
    });
  });
});