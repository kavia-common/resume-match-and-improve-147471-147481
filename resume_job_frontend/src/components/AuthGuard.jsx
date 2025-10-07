import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '../supabaseClient';

// PUBLIC_INTERFACE
export function AuthGuard({ children }) {
  /**
   * Protects routes by ensuring a Supabase session exists.
   * If not authenticated, redirects to /login.
   */
  const session = useSession();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setChecking(false);
  }, [session]);

  if (checking) return null;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}

// PUBLIC_INTERFACE
export function Login() {
  /**
   * Simple login page supporting email OTP (magic link) and password sign-in.
   * For magic link, set REACT_APP_SITE_URL in deployment so Supabase can redirect.
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('magic'); // 'magic' | 'password'
  const [message, setMessage] = useState('');

  const signInMagic = async (e) => {
    e.preventDefault();
    setMessage('Sending magic link...');
    const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: siteUrl,
      },
    });
    setMessage(error ? `Error: ${error.message}` : 'Check your email for the login link.');
  };

  const signInPassword = async (e) => {
    e.preventDefault();
    setMessage('Signing in...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? `Error: ${error.message}` : 'Signed in. Redirecting...');
    // Let router guard redirect
  };

  return (
    <div className="card" style={{ maxWidth: 460, margin: '40px auto' }}>
      <div className="topbar">
        <h2 className="h1">Sign in</h2>
        <button className="btn ghost" onClick={() => setMode(mode === 'magic' ? 'password' : 'magic')}>
          Use {mode === 'magic' ? 'Password' : 'Magic Link'}
        </button>
      </div>

      <form className="form" onSubmit={mode === 'magic' ? signInMagic : signInPassword}>
        <div>
          <label className="muted">Email</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        {mode === 'password' && (
          <div>
            <label className="muted">Password</label>
            <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
        )}
        <button className="btn" type="submit">{mode === 'magic' ? 'Send Magic Link' : 'Sign In'}</button>
      </form>
      {message && <p className="muted" style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
