/* Task 6 — counter app.

   One `state` object is the single source of truth; every interaction goes
   through update() and then render(). Keeping the DOM a pure function of
   state is the habit that makes frameworks feel familiar later. */

(() => {
  'use strict';

  const STORAGE_KEY = 'counter-app-state';

  const el = {
    value: document.querySelector('#value'),
    limitMsg: document.querySelector('#limit-msg'),
    inc: document.querySelector('#increment'),
    dec: document.querySelector('#decrement'),
    reset: document.querySelector('#reset'),
    step: document.querySelector('#step'),
    min: document.querySelector('#min'),
    max: document.querySelector('#max'),
    clicks: document.querySelector('#clicks'),
    highest: document.querySelector('#highest'),
    lowest: document.querySelector('#lowest'),
  };

  const defaults = { count: 0, step: 1, min: -50, max: 50, clicks: 0, highest: 0, lowest: 0 };

  const load = () => {
    try {
      // Spreading over the defaults means an older saved shape still works.
      return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
    } catch {
      return { ...defaults };
    }
  };

  let state = load();

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  /* ---------------- rendering ---------------- */

  let bumpTimer;
  const bump = () => {
    el.value.classList.add('bump');
    clearTimeout(bumpTimer);
    bumpTimer = setTimeout(() => el.value.classList.remove('bump'), 120);
  };

  const render = ({ animate = false } = {}) => {
    el.value.textContent = state.count;
    el.clicks.textContent = state.clicks;
    el.highest.textContent = state.highest;
    el.lowest.textContent = state.lowest;

    el.inc.disabled = state.count >= state.max;
    el.dec.disabled = state.count <= state.min;

    if (state.count >= state.max) el.limitMsg.textContent = `Maximum of ${state.max} reached.`;
    else if (state.count <= state.min) el.limitMsg.textContent = `Minimum of ${state.min} reached.`;
    else el.limitMsg.textContent = '';

    if (animate) bump();
  };

  /* ---------------- state changes ---------------- */

  const clamp = (n) => Math.min(state.max, Math.max(state.min, n));

  const change = (direction) => {
    const next = clamp(state.count + direction * state.step);
    if (next === state.count) return;          // already at a limit

    state.count = next;
    state.clicks += 1;
    state.highest = Math.max(state.highest, next);
    state.lowest = Math.min(state.lowest, next);

    save();
    render({ animate: true });
  };

  const resetAll = () => {
    state = { ...defaults, step: state.step, min: state.min, max: state.max };
    state.count = clamp(0);
    save();
    render({ animate: true });
  };

  /* ---------------- events ---------------- */

  el.inc.addEventListener('click', () => change(1));
  el.dec.addEventListener('click', () => change(-1));
  el.reset.addEventListener('click', resetAll);

  // Press and hold to repeat: 420ms before the first repeat, then every 90ms.
  const holdable = [
    [el.inc, 1],
    [el.dec, -1],
  ];

  holdable.forEach(([button, direction]) => {
    let delay, repeat;

    const stop = () => {
      clearTimeout(delay);
      clearInterval(repeat);
    };

    button.addEventListener('pointerdown', () => {
      delay = setTimeout(() => {
        repeat = setInterval(() => {
          if (button.disabled) return stop();
          change(direction);
        }, 90);
      }, 420);
    });

    ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((evt) =>
      button.addEventListener(evt, stop)
    );
  });

  /* settings — each input clamps itself and then re-clamps the count */

  const readSetting = (input, key, { minimum = -Infinity } = {}) => {
    const parsed = Number(input.value);
    const valid = Number.isFinite(parsed) && parsed >= minimum;
    input.setAttribute('aria-invalid', String(!valid));
    if (!valid) return;

    state[key] = parsed;
    if (state.min > state.max) [state.min, state.max] = [state.max, state.min];
    state.count = clamp(state.count);
    save();
    render();
  };

  el.step.addEventListener('input', () => readSetting(el.step, 'step', { minimum: 1 }));
  el.min.addEventListener('change', () => readSetting(el.min, 'min'));
  el.max.addEventListener('change', () => readSetting(el.max, 'max'));

  /* keyboard shortcuts — ignored while a settings input has focus */

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input')) return;

    const actions = {
      ArrowUp: () => change(1),
      ArrowRight: () => change(1),
      ArrowDown: () => change(-1),
      ArrowLeft: () => change(-1),
      r: resetAll,
      R: resetAll,
    };

    const action = actions[e.key];
    if (!action) return;
    e.preventDefault();
    action();
  });

  /* ---------------- boot ---------------- */

  el.step.value = state.step;
  el.min.value = state.min;
  el.max.value = state.max;
  render();
})();
