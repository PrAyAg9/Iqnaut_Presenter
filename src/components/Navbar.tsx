import React, { useState, useRef, useEffect } from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, role, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Always call hooks
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  if (loading) return null;

  // Render Navbar only if a user exists and the role is "Admin"
  if (!user || role !== 'Admin') {
    return null;
  }

  const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* LEFT: Profile and navigation links for admin */}
          <div className="relative mr-6" ref={profileRef}>
            <button
              onClick={handleProfileClick}
              className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <UserCircle size={20} />
            </button>
            {isProfileOpen && (
              <div className="absolute top-12 left-0 rounded shadow-lg p-3 w-48 z-10">
                <div className="flex flex-col bg-transparent">
                  <span className="text-sm font-medium">
                    {user.displayName || 'Unknown User'}
                  </span>
                  <span className="text-xs text-gray-500">{role}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 flex justify-center items-center space-x-6">
            <Link to="/user-management" className="text-gray-600 hover:text-gray-900">
              User Management
            </Link>
            <Link to="/templates" className="text-gray-600 hover:text-gray-900">
              Templates
            </Link>
            <Link to="/showcase" className="text-gray-600 hover:text-gray-900">
              Showcase
            </Link>
          </div>
          {/* RIGHT: Sign Out button */}
          <div className="ml-auto">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
