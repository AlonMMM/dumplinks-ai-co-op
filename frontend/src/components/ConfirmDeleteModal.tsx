import React from 'react';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onClose, onConfirm, isDeleting }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-800" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 mb-5">
                 <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Delete Account</h3>
            <div className="mt-2 text-sm text-gray-400">
                <p>Are you sure you want to delete your account? All of your saved links will be permanently removed.</p>
            </div>
        </div>
        <div className="p-4 bg-gray-950/50 rounded-b-2xl flex justify-center gap-3 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-300 bg-transparent border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-red-900 transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
};