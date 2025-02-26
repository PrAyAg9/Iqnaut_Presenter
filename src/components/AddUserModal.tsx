import React, { useState } from 'react';
import { X } from 'lucide-react';
import { NewUser } from '../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => Promise<void>;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewUser>({
    name: '',
    email: '',
    password: '',
    role: 'Presenter',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);
    await onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Presenter',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Role */}
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
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
