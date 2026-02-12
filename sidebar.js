(function() {
  // Sidebar CSS
  var css = [
    '.sidebar {',
    '  position: fixed;',
    '  top: 0;',
    '  left: 0;',
    '  width: 240px;',
    '  height: 100vh;',
    '  background: #0b1120;',
    '  border-right: 1px solid #192240;',
    '  overflow-y: auto;',
    '  z-index: 1000;',
    '  padding: 20px 0;',
    '  scrollbar-width: thin;',
    '  scrollbar-color: #192240 transparent;',
    '}',
    '.sidebar::-webkit-scrollbar { width: 4px; }',
    '.sidebar::-webkit-scrollbar-track { background: transparent; }',
    '.sidebar::-webkit-scrollbar-thumb { background: #192240; border-radius: 2px; }',
    '.sidebar-header {',
    '  padding: 0 20px 16px;',
    '  border-bottom: 1px solid #192240;',
    '  margin-bottom: 8px;',
    '}',
    '.sidebar-header a {',
    '  font-family: "JetBrains Mono", monospace;',
    '  font-size: 0.72rem;',
    '  letter-spacing: 0.1em;',
    '  text-transform: uppercase;',
    '  color: #22d3ee;',
    '  text-decoration: none;',
    '  transition: color 0.3s;',
    '}',
    '.sidebar-header a:hover { color: #4a9eff; }',
    '.sidebar-nav { list-style: none; margin: 0; padding: 0; }',
    '.sidebar-nav li a {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  padding: 10px 20px;',
    '  text-decoration: none;',
    '  color: #8295b5;',
    '  font-size: 0.8rem;',
    '  transition: all 0.2s;',
    '  border-left: 3px solid transparent;',
    '  line-height: 1.4;',
    '}',
    '.sidebar-nav li a:hover {',
    '  color: #dce4f0;',
    '  background: rgba(74,158,255,0.05);',
    '  border-left-color: #4a9eff;',
    '}',
    '.sidebar-nav li a.active {',
    '  color: #4a9eff;',
    '  background: rgba(74,158,255,0.08);',
    '  border-left-color: #4a9eff;',
    '  font-weight: 600;',
    '}',
    '.sidebar-nav .s-num {',
    '  font-family: "JetBrains Mono", monospace;',
    '  font-size: 0.62rem;',
    '  color: #4a5f80;',
    '  min-width: 22px;',
    '  flex-shrink: 0;',
    '}',
    '.sidebar-nav li a.active .s-num { color: #22d3ee; }',
    '.sidebar-toggle {',
    '  display: none;',
    '  position: fixed;',
    '  top: 12px;',
    '  left: 12px;',
    '  z-index: 1001;',
    '  background: #0b1120;',
    '  border: 1px solid #192240;',
    '  color: #dce4f0;',
    '  width: 36px;',
    '  height: 36px;',
    '  border-radius: 8px;',
    '  cursor: pointer;',
    '  font-size: 1.1rem;',
    '  align-items: center;',
    '  justify-content: center;',
    '  transition: border-color 0.3s;',
    '}',
    '.sidebar-toggle:hover { border-color: #4a9eff; }',
    '.sidebar-overlay {',
    '  display: none;',
    '  position: fixed;',
    '  inset: 0;',
    '  background: rgba(6,10,18,0.7);',
    '  z-index: 999;',
    '}',
    '.sidebar-overlay.open { display: block; }',
    '@media (max-width: 860px) {',
    '  body { padding-left: 0 !important; }',
    '  .sidebar {',
    '    transform: translateX(-100%);',
    '    transition: transform 0.3s ease;',
    '    box-shadow: none;',
    '  }',
    '  .sidebar.open {',
    '    transform: translateX(0);',
    '    box-shadow: 4px 0 24px rgba(0,0,0,0.5);',
    '  }',
    '  .sidebar-toggle { display: flex; }',
    '}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Determine current page
  var path = location.pathname;
  var currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // Page definitions
  var pages = [
    { file: 'index.html',                num: '00', title: '首页' },
    { file: 'tools-compare.html',        num: '01', title: '工具全景与选型' },
    { file: 'context-engineering.html',   num: '02', title: 'Context Engineering' },
    { file: 'skills.html',               num: '03', title: 'Skills 体系' },
    { file: 'mcp-ecosystem.html',        num: '04', title: 'MCP 生态与推荐' },
    { file: 'agent-hooks.html',          num: '05', title: 'Agent Hooks' },
    { file: 'dev-standards.html',        num: '06', title: 'Vibe Coding 规范' },
    { file: 'advanced-practice.html',    num: '07', title: '进阶实战' }
  ];

  // Build nav items
  var navHTML = pages.map(function(p) {
    var isActive = currentPage === p.file;
    return '<li><a href="' + p.file + '"' + (isActive ? ' class="active"' : '') + '>' +
      '<span class="s-num">' + p.num + '</span>' + p.title + '</a></li>';
  }).join('\n');

  // Create toggle button
  var toggle = document.createElement('button');
  toggle.className = 'sidebar-toggle';
  toggle.innerHTML = '&#9776;';
  toggle.setAttribute('aria-label', '切换导航');

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';

  // Create sidebar
  var sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = '<div class="sidebar-header"><a href="index.html">AI CLI</a></div>' +
    '<ul class="sidebar-nav">' + navHTML + '</ul>';

  // Insert into DOM
  document.body.insertBefore(sidebar, document.body.firstChild);
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(toggle, document.body.firstChild);

  // Toggle events
  toggle.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
})();
