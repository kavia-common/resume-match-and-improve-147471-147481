import { useEffect, useState } from 'react';
import { get } from '../api/client';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function MatchDashboard() {
  /** Shows example matches; calls backend if available */
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await get('/matches');
        if (!mounted) return;
        setMatches(Array.isArray(data) ? data : []);
        setStatus('');
      } catch {
        if (!mounted) return;
        // Fallback placeholder
        setMatches([
          { id: 'r1', resume: 'Resume A', job: 'Software Engineer', score: 0.82 },
          { id: 'r2', resume: 'Resume B', job: 'Data Analyst', score: 0.76 },
        ]);
        setStatus('');
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="card">
      <div className="topbar">
        <h2 className="h1">Matches</h2>
        <span className="muted">Review candidate-job fit and suggestions</span>
      </div>
      {status && <p className="muted">{status}</p>}
      <div className="list">
        {matches.map((m, idx) => (
          <div key={idx} className="list-item">
            <div>
              <div><strong>{m.resume}</strong> → {m.job}</div>
              <div className="muted">Score: {(m.score * 100).toFixed(1)}%</div>
            </div>
            <Link className="btn" to={`/suggestions/${m.id}`}>View suggestions</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
