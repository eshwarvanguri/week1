/* Task 3 — navbar behaviour.
   JavaScript owns state only: open/closed plus the ARIA attributes that
   describe it. All the visual work lives in style.css. */

(() => {
  'use strict';

  const hamburger = document.querySelector('#hamburger');
  const menu = document.querySelector('#menu');
  const backdrop = document.querySelector('#backdrop');
  const dropdownBtns = [...document.querySelectorAll('.dropdown-btn')];
  const MOBILE = window.matchMedia('(max-width: 860px)');

  /* ---------- dropdowns ---------- */

  const closeDropdowns = (except = null) => {
    dropdownBtns
      .filter((btn) => btn !== except)
      .forEach((btn) => btn.setAttribute('aria-expanded', 'false'));
  };

  dropdownBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = btn.getAttribute('aria-expanded') === 'true';
      closeDropdowns(btn);
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---------- mobile drawer ---------- */

  const setDrawer = (open) => {
    menu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    backdrop.classList.toggle('show', open);
    backdrop.hidden = !open;
    // Stop the page behind the drawer from scrolling with it.
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) closeDropdowns();
  };

  const isOpen = () => menu.classList.contains('open');

  hamburger.addEventListener('click', () => setDrawer(!isOpen()));
  backdrop.addEventListener('click', () => setDrawer(false));

  // Following a link should dismiss the drawer; the dropdown button must not.
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a') && MOBILE.matches) setDrawer(false);
  });

  /* ---------- global dismissal ---------- */

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) closeDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (isOpen()) {
      setDrawer(false);
      hamburger.focus();
    }
  });

  // Leaving mobile width with the drawer open would strand the open styles.
  MOBILE.addEventListener('change', (e) => {
    if (!e.matches) setDrawer(false);
  });
})();
