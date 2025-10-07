import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, Login } from '../components/AuthGuard';
import UploadResume from '../components/UploadResume';
import UploadJob from '../components/UploadJob';
import MatchDashboard from '../components/MatchDashboard';
import SuggestionsView from '../components/SuggestionsView';

// PUBLIC_INTERFACE
export default function RoutesIndex() {
  /** Defines application routes and guards */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <MatchDashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/upload-resume"
        element={
          <AuthGuard>
            <UploadResume />
          </AuthGuard>
        }
      />
      <Route
        path="/upload-job"
        element={
          <AuthGuard>
            <UploadJob />
          </AuthGuard>
        }
      />
      <Route
        path="/matches"
        element={
          <AuthGuard>
            <MatchDashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/suggestions/:resumeId"
        element={
          <AuthGuard>
            <SuggestionsView />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
