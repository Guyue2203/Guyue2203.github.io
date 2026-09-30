(() => {
  const storageKey = 'guyue-cv-theme';
  const choices = new Set(['auto', 'light', 'dark']);
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let choice = 'auto';

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (choices.has(saved)) choice = saved;
  } catch {
    // The page remains usable when storage is unavailable.
  }

  function applyTheme() {
    if (choice === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', choice);

    const dark = choice === 'dark' || (choice === 'auto' && systemTheme.matches);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', dark ? '#171b17' : '#ffffff');

    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice));
    });
  }

  applyTheme();

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        choice = button.dataset.themeChoice;
        try {
          if (choice === 'auto') window.localStorage.removeItem(storageKey);
          else window.localStorage.setItem(storageKey, choice);
        } catch {
          // The choice still applies to the current page.
        }
        applyTheme();
      });
    });
    applyTheme();
  });

  systemTheme.addEventListener?.('change', () => {
    if (choice === 'auto') applyTheme();
  });
})();
