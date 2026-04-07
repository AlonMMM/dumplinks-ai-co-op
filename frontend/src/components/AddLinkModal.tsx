import React, { useState, useEffect, useRef } from 'react';

interface AddLinkModalProps {
  onSubmit: (url: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ onSubmit, onClose, isLoading }) => {
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    try {
      new URL(url);
      onSubmit(url);
    } catch {
      // keep modal open, let user correct
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
    } catch {
      inputRef.current?.focus();
    }
  };

  const isValidUrl = (() => {
    try { new URL(url); return true; } catch { return false; }
  })();

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(9,9,11,0.1)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Gradient shell */}
      <div
        className="w-full max-w-xl rounded-[32px] p-[6px] border border-white/30"
        style={{
          background: 'linear-gradient(135deg, #9381FF 0%, #76C893 100%)',
          boxShadow: '0 32px 64px -12px rgba(0,0,0,0.3)',
        }}
      >
        {/* Inner frosted panel */}
        <div className="rounded-[28px] p-8 space-y-8" style={{ background: 'rgba(0,0,0,0.08)', backdropFilter: 'blur(12px)' }}>

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">Add Link</h3>
                <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>Capture inspiration instantly</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  className="w-5 h-5 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/inspiration"
                className="w-full pl-14 pr-28 py-5 rounded-3xl text-lg font-medium outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  border: 'none',
                  boxShadow: `0 0 0 1px ${isValidUrl ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}`,
                  color: 'white',
                }}
                onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.9)')}
                onBlur={e => (e.currentTarget.style.boxShadow = `0 0 0 1px ${isValidUrl ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}`)}
                disabled={isLoading}
              />
              <div className="absolute right-3 inset-y-3">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="h-full px-4 rounded-2xl font-['Space_Grotesk'] text-[11px] tracking-widest uppercase font-bold text-white transition-all active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                >
                  Paste
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValidUrl || isLoading}
              className="w-full py-5 rounded-3xl font-['Space_Grotesk'] text-lg font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl"
              style={{
                background: isValidUrl && !isLoading ? 'white' : 'rgba(255,255,255,0.5)',
                color: '#5D4AC5',
                cursor: isValidUrl && !isLoading ? 'pointer' : 'not-allowed',
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Save Link
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="flex justify-center items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>Press</span>
              <kbd className="px-2 py-1 rounded text-[10px] font-bold text-white border" style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.2)' }}>ENTER</kbd>
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>To Save</span>
            </div>
            <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>Auto-Tagging</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
