import { useState } from 'react';
import { post } from '../api/client';

// PUBLIC_INTERFACE
export default function UploadJob() {
  /** Upload job description to backend placeholder */
  const [jobText, setJobText] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await post('/jobs', { content: jobText });
      setStatus(`Uploaded. ID: ${res?.id ?? 'N/A'}`);
    } catch (err) {
      setStatus(`Error: ${err?.payload?.detail || err.message}`);
    }
  };

  return (
    <div className="card">
      <div className="topbar">
        <h2 className="h1">Upload Job</h2>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <textarea className="textarea" placeholder="Paste job description..." value={jobText} onChange={(e) => setJobText(e.target.value)} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn secondary" type="submit">Save</button>
          <button className="btn ghost" type="button" onClick={() => setJobText('')}>Clear</button>
        </div>
      </form>
      {status && <p className="muted" style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
