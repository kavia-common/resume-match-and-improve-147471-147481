import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../api/client';

// PUBLIC_INTERFACE
export default function SuggestionsView() {
  /** Displays ATS improvement suggestions for a given resumeId */
  const { resumeId } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await get(`/resumes/${resumeId}/suggestions`);
        if (!mounted) return;
        setSuggestions(Array.isArray(data) ? data : []);
        setStatus('');
      } catch {
        if (!mounted) return;
        setSuggestions([
          { title: 'Add measurable metrics', detail: 'Quantify achievements with numbers (e.g., improved processing speed by 20%).' },
          { title: 'Use role-specific keywords', detail: 'Include keywords from job description to improve ATS ranking.' },
          { title: 'Optimize section headers', detail: 'Use standard headers such as Experience, Education, Skills.' },
        ]);
        setStatus('');
      }
    })();
    return () => { mounted = false; };
  }, [resumeId]);

  return (
    <div className="card">
      <div className="topbar">
        <h2 className="h1">Suggestions</h2>
        <span className="muted">Resume ID: {resumeId}</span>
      </div>
      {status && <p className="muted">{status}</p>}
      <div className="list">
        {suggestions.map((s, idx) => (
          <div key={idx} className="list-item">
            <div>
              <div><strong>{s.title}</strong></div>
              <div className="muted">{s.detail}</div>
            </div>
            <span className="badge status-warn">ATS Tip</span>
          </div>
        ))}
      </div>
    </div>
  );
}
