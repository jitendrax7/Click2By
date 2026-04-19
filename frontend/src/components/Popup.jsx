import React from 'react'

const Popup = ({ onClose, status = 'red', message = '' }) => {
  const isError = status === 'red'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-dark/70 backdrop-blur-sm"
        onClick={() => onClose(false)}
      />
      <div className="relative card-dark p-6 max-w-sm w-full animate-scale-in text-center !transform-none">
        <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${isError ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
          {isError ? (
            <svg width="28" height="28" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          )}
        </div>
        <p className="text-text-primary font-medium mb-1">
          {isError ? 'Oops!' : 'Success!'}
        </p>
        <p className="text-text-muted text-sm mb-5">{message}</p>
        <button
          onClick={() => onClose(false)}
          className={`btn-primary w-full justify-center ${isError ? '!bg-red-500 hover:!bg-red-400' : ''}`}
        >
          {isError ? 'Got it' : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Popup
