import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => void;
  isSaving: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onSave, isSaving }) => {
  const [name, setName] = useState(user.name || '');
  const [profilePictureUrl, setProfilePictureUrl] = useState(user.profilePictureUrl || '');

  useEffect(() => {
    setName(user.name || '');
    setProfilePictureUrl(user.profilePictureUrl || '');
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, profilePictureUrl });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Manage Account</h2>
          <p className="text-sm text-gray-400">Update your profile information.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-300">Profile Picture URL</label>
              <input
                id="profilePictureUrl"
                type="url"
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
                className="mt-1 w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="p-4 bg-gray-950/50 rounded-b-2xl flex justify-end gap-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-300 bg-transparent border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:bg-primary-800 disabled:text-gray-400 transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};