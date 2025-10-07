import { useState } from 'react';
import { post } from '../api/client';

// PUBLIC_INTERFACE
export default function UploadResume() {
  /** Upload resume by text or file; currently sends text as placeholder to backend */
  const [resumeText, setResumeText] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await post('/resumes', { content: resumeText });
      setStatus(`Uploaded. ID: ${res?.id ?? 'N/A'}`);
    } catch (err) {
      setStatus(`Error: ${err?.payload?.detail || err.message}`);
    }
  };

  return (
    <div className="card">
      <div className="topbar">
        <h2 className="h1">Upload Resume</h2>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <textarea className="textarea" placeholder="Paste resume text..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn" type="submit">Save</button>
          <button className="btn ghost" type="button" onClick={() => setResumeText('')}>Clear</button>
        </div>
      </form>
      {status && <p className="muted" style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
