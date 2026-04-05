import React from 'react';
import type { User } from '../types';
import { UserIcon } from './icons/UserIcon';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onManageAccount: () => void;
  onDeleteAccount: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onManageAccount, onDeleteAccount }) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-700">
            {user.profilePictureUrl ? (
              <img src={user.profilePictureUrl} alt={user.name || user.email} className="w-full h-full rounded-full object-cover" />
            ) : (
              <UserIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="truncate">
            <p className="font-semibold text-gray-200 truncate">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <button
          onClick={onManageAccount}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-3 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Manage Account
        </button>
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-3 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </div>
      <div className="border-t border-gray-800 py-2">
        <button
          onClick={onDeleteAccount}
          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-3 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          Delete Account
        </button>
      </div>
    </div>
  );
};