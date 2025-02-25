// EditUserModal.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User } from './UserManagement';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  user: User | null;
}

const EditUserModal = ({ isOpen, onClose, onSubmit, user }: Props) => {
  const [formData, setFormData] = useState<User | null>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="w-full px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                required
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                required
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={formData.role === 'Admin'}
                    onChange={() => setFormData({ ...formData, role: 'Admin' })}
                    className="mr-2"
                  />
                  Admin
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Presenter"
                    checked={formData.role === 'Presenter'}
                    onChange={() => setFormData({ ...formData, role: 'Presenter' })}
                    className="mr-2"
                  />
                  Presenter
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;