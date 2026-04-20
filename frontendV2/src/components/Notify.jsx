import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react'

/* ── Context ─────────────────────────────────────────── */
const NotifyContext = createContext(null)

/* ── Icon helpers ─────────────────────────────────────── */
const icons = {
  success: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
}

const styles = {
  success: {
    icon: 'text-emerald-400',
    bar:  'bg-emerald-400',
    border: 'border-l-emerald-400/60',
  },
  error: {
    icon: 'text-red-400',
    bar:  'bg-red-400',
    border: 'border-l-red-400/60',
  },
  info: {
    icon: 'text-sky-400',
    bar:  'bg-sky-400',
    border: 'border-l-sky-400/60',
  },
  warning: {
    icon: 'text-amber-400',
    bar:  'bg-amber-400',
    border: 'border-l-amber-400/60',
  },
}

/* ── Single Toast Item ─────────────────────────────────── */
const DURATION = 3500 // ms before auto-dismiss

const ToastItem = ({ id, type = 'info', message, onRemove }) => {
  const [visible, setVisible] = useState(false)   // slide-in flag
  const [leaving, setLeaving] = useState(false)   // slide-out flag
  const timerRef = useRef(null)
  const s = styles[type] || styles.info

  const dismiss = useCallback(() => {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => onRemove(id), 320)
  }, [leaving, id, onRemove])

  useEffect(() => {
    // Slight delay so the element is mounted before slide-in
    requestAnimationFrame(() => setVisible(true))
    timerRef.current = setTimeout(dismiss, DURATION)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div
      style={{
        transform: visible && !leaving ? 'translateY(0)' : leaving ? 'translateY(-110%)' : 'translateY(-110%)',
        opacity: visible && !leaving ? 1 : 0,
        transition: 'transform 0.32s cubic-bezier(0.34,1.26,0.64,1), opacity 0.28s ease',
        pointerEvents: 'auto',
      }}
      className={`
        flex items-start gap-3
        w-full max-w-[320px] min-w-[220px]
        bg-[#1a1a24] border border-[#2a2a38] border-l-4 ${s.border}
        rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.55)]
        px-4 py-3
      `}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <span className={`shrink-0 mt-0.5 ${s.icon}`}>{icons[type]}</span>

      {/* Message */}
      <p className="flex-1 text-[13px] leading-snug text-[#f5f0e8] font-medium break-words">{message}</p>

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 -mt-0.5 -mr-1 w-5 h-5 flex items-center justify-center rounded text-[#555566] hover:text-[#9b9b9b] transition-colors"
      >
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  )
}

/* ── Provider + Portal Container ───────────────────────── */
let _addToast = null

export const NotifyProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Expose globally for toast() helper outside React tree
  _addToast = addToast

  return (
    <NotifyContext.Provider value={{ addToast }}>
      {children}

      {/* ── Portal: fixed top-center ── */}
      <div
        aria-label="Notifications"
        style={{
          position: 'fixed',
          top: '72px',         // below navbar
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none',
          width: '100%',
          maxWidth: '340px',
          padding: '0 16px',
        }}
      >
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            id={t.id}
            type={t.type}
            message={t.message}
            onRemove={removeToast}
          />
        ))}
      </div>
    </NotifyContext.Provider>
  )
}

/* ── Hook ──────────────────────────────────────────────── */
export const useNotify = () => {
  const ctx = useContext(NotifyContext)
  if (!ctx) throw new Error('useNotify must be used inside <NotifyProvider>')
  return ctx
}

/* ── Global helper (usable outside components, e.g. context files) ── */
export const toast = {
  success: (msg) => _addToast?.(msg, 'success'),
  error:   (msg) => _addToast?.(msg, 'error'),
  info:    (msg) => _addToast?.(msg, 'info'),
  warning: (msg) => _addToast?.(msg, 'warning'),
}
