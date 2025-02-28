import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { User, NewUser } from '../types';

// Import functions to initialize a secondary app instance
import { initializeApp } from 'firebase/app';
import { getAuth, signOut as secondarySignOut } from 'firebase/auth';
import {firebaseConfig} from '../../firebase'; // Make sure this points to your config

// Initialize a secondary app and auth instance
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

const FirebaseUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function to fetch users from Firestore
  const fetchUsers = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData);
      console.log("Fetched users:", usersData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handler for adding a user using the secondary auth instance
  const handleAddUser = async (userData: NewUser): Promise<void> => {
    try {
      console.log("handleAddUser received:", userData);
      // Create user using the secondary auth instance
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, userData.email, userData.password);
      const uid = userCredential.user.uid;
      console.log("Created user with UID:", uid);
      // Save additional details in Firestore using uid as document ID
      await setDoc(doc(db, 'users', uid), {
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      console.log("User details saved to Firestore");
      // Sign out the newly created user from the secondary auth so the main admin session remains
      await secondarySignOut(secondaryAuth);
      await fetchUsers();
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error("Error adding user: ", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("Email id already in use");
      } else {
        alert("Error adding user: " + error.message);
      }
    }
  };

  // Handler for editing a user
  const handleEditUser = async (updatedUser: User): Promise<void> => {
    try {
      if (!updatedUser.id) return;
      const userRef = doc(db, 'users', updatedUser.id);
      await updateDoc(userRef, {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
      console.log("User updated:", updatedUser);
      await fetchUsers();
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error editing user: ", error);
    }
  };

  // Handler for deleting a user (Firestore only)
  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'users', id));
      console.log("User deleted:", id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="mx-16 mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and their roles</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          + Add User
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">NAME</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">EMAIL</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ROLE</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditClick(user)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditUser}
        user={selectedUser}
      />
    </div>
  );
};

export default FirebaseUserManagement;
