(() => {
  const section = document.querySelector('.main-discovery');
  if (!section) return;
  const tabs = [...section.querySelectorAll('[role="tab"]')];
  const panels = [...section.querySelectorAll('[role="tabpanel"]')];
  const question = section.querySelector('#discovery-question-text');
  function select(tab, focus = false) {
    const id = tab.getAttribute('aria-controls');
    tabs.forEach(t => { const selected = t === tab; t.setAttribute('aria-selected', String(selected)); t.tabIndex = selected ? 0 : -1; });
    panels.forEach(p => { p.hidden = p.id !== id; if (!p.hidden) question.textContent = p.dataset.question; });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault(); select(tabs[next], true);
    });
  });
  section.querySelector('[role="tablist"]').hidden = false;
})();
