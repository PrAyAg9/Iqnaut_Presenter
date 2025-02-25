// // UserManagement.tsx
// import React, { useState } from 'react';
// import { Pencil, Trash2 } from 'lucide-react';
// import AddUserModal from './AddUserModal';
// import EditUserModal from './EditUserModal';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'Admin' | 'Presenter';
// }

// interface Props {
//   users: User[];
//   onAddUser: (user: User & { password: string }) => void;
//   onEditUser: (user: User) => void;
//   onDeleteUser: (id: string) => void;
// }

// const UserManagement = ({ users, onAddUser, onEditUser, onDeleteUser }: Props) => {
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [localUsers, setLocalUsers] = useState<User[]>(users);

//   const handleAddSubmit = (user: User & { password: string }) => {
//     const newUser = { id: user.id, name: user.name, email: user.email, role: user.role };
//     setLocalUsers([...localUsers, newUser]);
//     onAddUser(user);
//     setIsAddModalOpen(false);
//   };

//   const handleEditSubmit = (updatedUser: User) => {
//     const updatedUsers = localUsers.map(user => 
//       user.id === updatedUser.id ? updatedUser : user
//     );
//     setLocalUsers(updatedUsers);
//     onEditUser(updatedUser);
//     setIsEditModalOpen(false);
//   };

//   return (
//     <div className="mx-16 mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
//           <p className="text-gray-600">Manage system users and their roles</p>
//         </div>
//         <button
//           onClick={() => setIsAddModalOpen(true)}
//           className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
//         >
//           + Add User
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <table className="min-w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">NAME</th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">EMAIL</th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ROLE</th>
//               <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localUsers.map((user) => (
//               <tr key={user.id} className="border-b">
//                 <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
//                 <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
//                 <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
//                 <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
//                 <td className="px-6 py-4 text-sm">
//                   <div className="flex space-x-3">
//                     <button
//                       className="text-blue-600 hover:text-blue-800"
//                       onClick={() => {
//                         setSelectedUser(user);
//                         setIsEditModalOpen(true);
//                       }}
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => onDeleteUser(user.id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AddUserModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSubmit={handleAddSubmit}
//         lastId={localUsers.length > 0 ? localUsers[localUsers.length - 1].id : '000'}
//       />

//       <EditUserModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSubmit={handleEditSubmit}
//         user={selectedUser}
//       />
//     </div>
//   );
// };

// export default UserManagement;