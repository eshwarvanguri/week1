/* Portfolio behaviour: theme toggle, mobile nav, scroll-spy, form validation.
   Written with ES6+ syntax — const/let, arrow functions, template literals,
   destructuring and modules-free IIFE scoping. */

(() => {
  'use strict';

  /* ---------------- dark mode toggle ----------------
     The stored choice wins; with nothing stored we fall through to the OS
     preference, which the stylesheet already handles. An inline script in
     <head> applies the stored value before first paint to avoid a flash. */

  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const themeBtn = document.querySelector('#theme-toggle');

  const currentTheme = () =>
    root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    themeBtn?.setAttribute('aria-pressed', String(theme === 'dark'));
    themeBtn?.setAttribute(
      'aria-label',
      `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
    );
  };

  applyTheme(currentTheme());

  themeBtn?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Follow the OS while the visitor has not made an explicit choice.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ---------------- mobile navigation ---------------- */

  const navToggle = document.querySelector('#nav-toggle');
  const navLinks = document.querySelector('#nav-links');

  const closeNav = () => {
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks?.addEventListener('click', (e) => {
    if (e.target.matches('a')) closeNav();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------------- scroll spy ----------------
     Highlights the nav link for whichever section is nearest the top of the
     viewport. IntersectionObserver keeps this off the scroll event loop. */

  const sections = [...document.querySelectorAll('main section[id]')];
  const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries
          .filter(({ isIntersecting }) => isIntersecting)
          .forEach(({ target }) => {
            document
              .querySelectorAll('.nav-links a.active')
              .forEach((a) => a.classList.remove('active'));
            linkFor(target.id)?.classList.add('active');
          });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- contact form validation ----------------
     Client-side only — there is no backend in week 1, so a valid submit is
     acknowledged in the UI rather than sent anywhere. */

  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    subject: (v) => (v.trim().length >= 3 ? '' : 'Please add a short subject.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'),
  };

  const validateField = (field) => {
    const message = rules[field.name]?.(field.value) ?? '';
    const slot = document.querySelector(`#${field.name}-error`);
    if (slot) slot.textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [...form.querySelectorAll('input[name], textarea[name]')];
    const invalid = fields.filter((f) => !validateField(f));

    if (invalid.length) {
      status.textContent = '';
      invalid[0].focus();
      return;
    }

    const { name } = Object.fromEntries(new FormData(form));
    status.textContent = `Thanks, ${name}! Your message has been recorded.`;
    form.reset();
    fields.forEach((f) => f.removeAttribute('aria-invalid'));
  });

  // Re-check a field once it has been touched, so errors clear as you type.
  form?.addEventListener('input', (e) => {
    if (e.target.hasAttribute('aria-invalid')) validateField(e.target);
  });

  /* ---------------- footer year ---------------- */

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
