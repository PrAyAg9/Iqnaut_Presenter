import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/LoginPage';
import Templates from './pages/templates'; 
import Showcase from './pages/showcase';    
import UserManagement from './pages/Users'; // Create if needed

function App() {
  return (
    <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Navbar is always visible */}
          <Navbar />

          <main className="container mx-auto">
            <Routes>

              <Route path="/" element={<Login />} />

              {/* Login route */}
              <Route path="/login" element={<Login />} />

              {/* Templates route */}
              <Route path="/templates" element={<Templates />} />

              {/* Showcase route */}
              <Route path="/showcase" element={<Showcase />} />

              {/* User Management route */}
              <Route path="/user-management" element={<UserManagement />} />
            </Routes>
          </main>

          {/* Footer */}
          {/* <footer className="fixed bottom-0 w-full text-center text-gray-600 bg-white border-t">
            © 2024 All Rights Reserved
          </footer> */}
        </div>
    </AuthProvider>
  );
}

export default App;
