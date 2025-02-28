import React, { useState, useMemo } from 'react';
import { Template } from '../types';
import { Power } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // adjust path as needed

interface ShowcaseProps {
  templates: Template[];
}

const Showcase: React.FC<ShowcaseProps> = ({ templates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { role } = useAuth();

  // Filter templates based on search term
  const displayedTemplates = useMemo(() => {
    return templates.filter((t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  // Sort by serial number (assuming serialNumber can be converted to a number)
  const sortedTemplates = useMemo(() => {
    return [...displayedTemplates].sort(
      (a, b) => Number(a.serialNumber) - Number(b.serialNumber)
    );
  }, [displayedTemplates]);

  // Handle logout (only for Presenter)
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen font-sans">
      {/* Header Section */}
      <div className="relative flex items-center justify-center mb-5">
        {/* Centered Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold">Showcase</h1>
        {/* Conditionally display Logout Button only for Presenter */}
        {role === 'Presenter' && (
          <button
            onClick={handleLogout}
            className="absolute right-0 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-all flex items-center gap-2"
            title="Logout"
          >
            <Power size={20} />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          className="w-full max-w-xl px-4 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {sortedTemplates.map((template) => (
          <a
            key={template.id}
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded shadow hover:shadow-md transition-shadow duration-150 p-2"
          >
            <div className="w-full aspect-square overflow-hidden flex items-center justify-center">
              <img
                src={template.icon}
                alt={template.name}
                className="object-contain w-full h-full"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
