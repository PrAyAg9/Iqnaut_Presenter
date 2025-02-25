import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Template } from '../types';

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedTemplate: Template) => Promise<void>;
  templateToEdit: Template | null;
}


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddk9ybgze/image/upload";
const UPLOAD_PRESET = "prayag123"

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({ isOpen, onClose, onSubmit, templateToEdit }) => {
  const [formData, setFormData] = useState<Template>({
    id: '',
    name: '',
    url: '',
    serialNumber: '',
    icon: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (templateToEdit) {
      setFormData(templateToEdit);
    }
  }, [templateToEdit]);

  if (!isOpen || !templateToEdit) return null;

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    });
    const json = await res.json();
    console.log("Cloudinary response (edit):", json);
    if (!json.secure_url) {
      throw new Error("Upload failed: No secure_url returned");
    }
    return json.secure_url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setFormData({ ...formData, icon: url });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Template ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Template Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* Serial Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
            <input
              type="text"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <div className="mt-2 text-sm text-gray-500">
              {uploading 
                ? "Uploading..."
                : formData.icon 
                  ? "Image uploaded successfully" 
                  : "No file chosen"}
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
              disabled={uploading || !formData.icon}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTemplateModal;
