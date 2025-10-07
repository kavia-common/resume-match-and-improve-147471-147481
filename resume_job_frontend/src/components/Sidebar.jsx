import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Sidebar({ onToggleTheme, currentTheme }) {
  /** Sidebar with navigation and theme toggle */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <span className="dot" />
          <span>Resume AI</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/dashboard">Dashboard</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/upload-resume">Upload Resume</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/upload-job">Upload Job</NavLink>
        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/matches">Matches</NavLink>
      </nav>
      <div style={{ marginTop: 'auto', padding: 14, borderTop: '1px solid var(--border)' }}>
        <button className="btn ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          Toggle {currentTheme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </aside>
  );
}
