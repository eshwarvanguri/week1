/* Task 7 — dark mode toggle.

   The inline script in <head> has already applied any saved theme. This file
   syncs the switch to that state and handles changes from here on. */

(() => {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const input = document.querySelector('#theme-switch');
  const status = document.querySelector('#status');
  const osDark = window.matchMedia('(prefers-color-scheme: dark)');

  // With no explicit choice on <html>, the effective theme is the OS one.
  const effectiveTheme = () => root.dataset.theme || (osDark.matches ? 'dark' : 'light');

  const sync = () => {
    const theme = effectiveTheme();
    input.checked = theme === 'dark';
    status.textContent = theme;
  };

  input.addEventListener('change', () => {
    const theme = input.checked ? 'dark' : 'light';
    root.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    sync();
  });

  // Only follow the OS while the visitor has not overridden it.
  osDark.addEventListener('change', () => {
    if (!localStorage.getItem(STORAGE_KEY)) sync();
  });

  sync();
})();
