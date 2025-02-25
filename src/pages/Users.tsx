// src/pages/Users.tsx
import React, { useState } from 'react';
import UserManagement from '../components/UserManagement';
import AddUserModal from '../components/AddUserModal';
import { User } from '../types';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: '001', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', role: 'Presenter' }
  ]);

  const handleAddUser = (newUser: User & { password: string }) => {
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <UserManagement 
        users={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
        lastId={users.length > 0 ? users[users.length - 1].id : '000'}
      />
    </div>
  );
};

export default Users;