import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './layouts/client';
import AuthLayout from './layouts/auth';

function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="dashboard/*" element={<ClientLayout />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
