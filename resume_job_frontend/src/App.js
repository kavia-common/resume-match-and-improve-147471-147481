import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './routes';
import Sidebar from './components/Sidebar';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './supabaseClient';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component. Provides theme handling, Supabase Session context,
   * and the main layout with a sidebar and routed views.
   */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={null}>
      <BrowserRouter>
        <div className="app-shell">
          <Sidebar onToggleTheme={toggleTheme} currentTheme={theme} />
          <main className="app-content">
            <RoutesIndex />
          </main>
        </div>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
