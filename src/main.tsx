
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import { AuthProvider } from './auth';
// import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
