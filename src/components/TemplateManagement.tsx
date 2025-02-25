import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Template } from '../types';
import AddTemplateModal from './AddTemplateModal';
import EditTemplateModal from './EditTemplateModal';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TemplateManagement: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState<Template | null>(null);

  // Function to fetch templates from Firestore
  const fetchTemplates = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'templates'));
      const templatesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Template[];
      setTemplates(templatesData);
    } catch (error) {
      console.error("Error fetching templates: ", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Handler for adding a template
  const handleAddTemplate = async (newTemplate: Template): Promise<void> => {
    try {
      const { id, ...dataToAdd } = newTemplate;
      await addDoc(collection(db, 'templates'), dataToAdd);
      await fetchTemplates();
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding template: ', error);
    }
  };

  // Handler for editing a template
  const handleEditSubmit = async (updatedTemplate: Template): Promise<void> => {
    if (!updatedTemplate.id) return;
    const templateRef = doc(db, 'templates', updatedTemplate.id);
    try {
      const { id, ...dataToUpdate } = updatedTemplate;
      await updateDoc(templateRef, dataToUpdate);
      await fetchTemplates();
      setIsEditModalOpen(false);
      setTemplateToEdit(null);
    } catch (error) {
      console.error('Error updating template: ', error);
    }
  };

  // Handler for deleting a template
  const handleDeleteTemplate = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'templates', id));
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting template: ', error);
    }
  };

  const handleEditClick = (template: Template) => {
    setTemplateToEdit(template);
    setIsEditModalOpen(true);
  };

  return (
    <div className="mx-16 mt-10">
      {/* Add Template Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Template Management</h1>
          <p className="text-gray-600">Manage your templates and their details</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
        >
          <span>+ Add Template</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">TEMPLATE ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">TEMPLATE NAME</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">URL</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">SERIAL NUMBER</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id} className="border-b">
                <td className="px-6 py-4 text-sm text-gray-900">{template.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{template.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{template.url}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{template.serialNumber}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEditClick(template)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteTemplate(template.id)}
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

      <AddTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTemplate}
      />

      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        templateToEdit={templateToEdit}
      />
    </div>
  );
};

export default TemplateManagement;
