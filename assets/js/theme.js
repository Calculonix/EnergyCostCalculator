const themeToggle = document.querySelector('#theme-toggle');
let storedTheme = null;
try { storedTheme = localStorage.getItem('wattcost-theme'); } catch (error) { storedTheme = null; }
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

document.documentElement.dataset.theme = initialTheme;

function updateThemeToggle() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.querySelector('.theme-toggle-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀' : '☾';
}

updateThemeToggle();
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('wattcost-theme', nextTheme); } catch (error) { /* Continue without persistence when storage is unavailable. */ }
  updateThemeToggle();
});
