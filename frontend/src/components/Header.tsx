import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import type { User } from '../types';
import { UserMenu } from './UserMenu';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onManageAccount: () => void;
    onDeleteAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onManageAccount, onDeleteAccount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return '...';
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-9 h-9" />
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              DumpLinks
            </h1>
          </div>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 font-bold border border-white/10 hover:border-primary-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500"
            >
              {user.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt={user.name || user.email} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{getInitials(user.name, user.email)}</span>
              )}
            </button>
            {isMenuOpen && (
              <UserMenu 
                user={user} 
                onLogout={onLogout} 
                onManageAccount={() => { setIsMenuOpen(false); onManageAccount(); }}
                onDeleteAccount={() => { setIsMenuOpen(false); onDeleteAccount(); }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};