/* Shared shell: top bar, site search, theme toggle, footer, small helpers.
   Every page loads its data files first (data/*.js set window.ARC.*), then this file, then its own script. */
(function () {
  const PAGES = [
    ['index.html', 'Home'], ['weapons.html', 'Guns'], ['arc.html', 'ARC'], ['skills.html', 'Skills'],
    ['maps.html', 'Maps'], ['benches.html', 'Benches'], ['outpost.html', 'Outpost'],
    ['quests.html', 'Quests'], ['items.html', 'Items'], ['gear.html', 'Gear'], ['traders.html', 'Traders'],
    ['endgame.html', 'Endgame'], ['guides.html', 'Guides']
  ];
  const here = location.pathname.split('/').pop() || 'index.html';
  const UPDATED = (window.ARC && window.ARC.meta && window.ARC.meta.updated) || '2026-11-03';
  const PATCH = (window.ARC && window.ARC.meta && window.ARC.meta.patch) || '2.4.0';

  // Theme: remember the viewer's choice; default follows the system.
  try { const t = localStorage.getItem('rfm-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}

  const top = document.createElement('header');
  top.className = 'top';
  top.innerHTML = `<div class="top-in">
    <a class="brand" href="index.html"><i></i>Raider Field Manual</a>
    <nav class="main" aria-label="Sections">${PAGES.map(([h, n]) =>
      `<a href="${h}"${h === here ? ' aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
    <div class="search"><input id="q" type="search" placeholder="Search guns, ARC, skills…" autocomplete="off" aria-label="Search the site">
      <div class="results" id="qr" hidden></div></div>
    <button class="theme-btn" id="theme" type="button" aria-label="Switch light or dark theme">◐</button>
  </div>`;
  document.body.prepend(top);

  const foot = document.createElement('footer');
  foot.className = 'site';
  foot.innerHTML = `<div class="in">
    <div><b>Unofficial fan site.</b> Not affiliated with or endorsed by Embark Studios. ARC Raiders is a trademark of Embark Studios AB.</div>
    <div>Data from the <a href="https://arcraiders.wiki/">ARC Raiders Wiki</a> (community-edited), official <a href="https://arcraiders.com/news">patch notes</a>, the <a href="https://github.com/RaidTheory/arcraiders-data">RaidTheory arcraiders-data</a> project (MIT), and community guides credited on each page.</div>
    <div>Last updated <b>${UPDATED}</b> · game patch <b>${PATCH}</b>. Embark patches weekly; the in-game screen has the final say.</div>
  </div>`;
  document.body.append(foot);

  document.getElementById('theme').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('rfm-theme', root.dataset.theme); } catch (e) {}
  });

  // Site search: built from whatever data is loaded plus a static index of every page section.
  const idx = [];
  const add = (title, sub, href) => idx.push({ title, sub, href, k: (title + ' ' + sub).toLowerCase() });
  const D = window.ARC || {};
  (D.weapons || []).forEach(w => add(w.name, `Gun · ${w.type} · ${w.ammo}`, `weapons.html#${w.id}`));
  (D.arc || []).forEach(a => add(a.name, `ARC · ${a.health || '?'} HP · weak: ${a.weakness || '—'}`, `arc.html#${a.id}`));
  Object.keys(D.benches || {}).forEach(b => add(b, 'Workshop bench · upgrade costs', `benches.html#${slug(b)}`));
  ((window.REF_QUESTS || {}).quests || []).forEach(x => add(x.name, `Quest · ${x.trader}`, `quests.html#${x.id}`));
  ((window.REF_ITEMS || {}).items || []).forEach(x => add(x.name, `Item · ${x.verdict || ''} · ${x.type || ''}`, `items.html#${x.id}`));
  (window.ARC_SEARCH || []).forEach(s => add(s[0], s[1], s[2]));
  const q = document.getElementById('q'), qr = document.getElementById('qr');
  let sel = -1;
  q.addEventListener('input', () => {
    const v = q.value.trim().toLowerCase(); sel = -1;
    if (v.length < 2) { qr.hidden = true; return; }
    const terms = v.split(/\s+/);
    const hits = idx.filter(i => terms.every(t => i.k.includes(t))).slice(0, 12);
    qr.innerHTML = hits.length ? hits.map(h => `<a href="${h.href}">${esc(h.title)}<small>${esc(h.sub)}</small></a>`).join('')
      : `<a href="#" aria-disabled="true">No matches<small>Try a gun, ARC, map, skill or material name</small></a>`;
    qr.hidden = false;
  });
  q.addEventListener('keydown', e => {
    const links = [...qr.querySelectorAll('a')];
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach((l, i) => l.classList.toggle('sel', i === sel));
    } else if (e.key === 'Enter' && links.length) { location.href = links[Math.max(sel, 0)].href; }
    else if (e.key === 'Escape') { qr.hidden = true; q.blur(); }
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) qr.hidden = true; });

  function esc(s) { return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  const IMG = window.IMG || {};
  function img(kind, id) { return (IMG[kind] || {})[id] || ''; }
  function itemImg(name) { return img('items', String(name || '').toLowerCase().replace(/['’.]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '')); }
  function pic(src, alt, cls) { return src ? `<img class="${cls || 'thumb'}" src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">` : ''; }
  window.RFM = { esc, slug, img, itemImg, pic };
  // Open a linked <details> when arriving via #anchor.
  function openHash() { const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (el && el.tagName === 'DETAILS') el.open = true; }
  window.addEventListener('hashchange', openHash); window.addEventListener('load', () => setTimeout(openHash, 0));
})();
