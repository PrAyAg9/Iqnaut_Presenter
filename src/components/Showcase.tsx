import React, { useState, useMemo } from 'react';
import { Template } from '../types';

interface ShowcaseProps {
  templates: Template[];
}

const Showcase: React.FC<ShowcaseProps> = ({ templates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // Show 27 items per page (9 columns * 3 rows)
  const itemsPerPage = 27;

  const filteredTemplates = useMemo(() => {
    return templates.filter(t =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 min-h-screen">
      {/* Compact Search Bar */}
      <div className="mb-5">
        <div className="flex justify-center">
          <input
            type="text"
            className="w-full max-w-md px-3 py-1.5 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Grid Layout with 9 columns */}
      <div className="grid grid-cols-9 gap-1 mb-8">
        {currentTemplates.map((template) => (
          <a
            key={template.id}
            href={template.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <div className="bg-white rounded-sm shadow-xs hover:shadow-sm transition-shadow duration-150 p-1">
              <div className="aspect-square bg-gray-50 rounded-sm mb-1 flex items-center justify-center">
                {template.icon ? (
                  <img
                    src={template.icon}
                    alt={template.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-gray-300 text-lg">○</span>
                )}
              </div>
              <div className="text-center text-[11px] font-medium text-gray-600 leading-tight">
                {template.name}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-2 border-t border-gray-200">
        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded-sm border text-xs disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 py-1 rounded-sm text-xs ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded-sm border text-xs disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
