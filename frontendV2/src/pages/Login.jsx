import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentState, setCurrentState] = useState('Login')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Left Brand Panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-dark/60 to-dark/40" />
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-dark font-display font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-2xl text-text-primary">
              Click<span className="text-primary">2</span>Buy
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary mb-4 leading-tight">
            Style that speaks<br /><span className="italic text-primary">for itself.</span>
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-sm">
            Join thousands of fashion lovers who trust Click2Buy for their wardrobe essentials.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-dark font-display font-bold text-sm">C</span>
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              Click<span className="text-primary">2</span>Buy
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-text-primary mb-1">
              {currentState === 'Login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-text-muted text-sm">
              {currentState === 'Login'
                ? 'Sign in to continue shopping'
                : 'Join us and start your style journey'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            {currentState === 'Sign Up' && (
              <div className="animate-fade-up">
                <label className="block text-xs uppercase tracking-widest text-text-faint mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="input-dark"
                  id="signup-name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-text-faint mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input-dark"
                id="login-email"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-text-faint mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="input-dark pr-10"
                  id="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted transition-colors"
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {currentState === 'Login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:text-primary-light transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              id="auth-submit-btn"
              disabled={loading}
              className="btn-primary w-full justify-center mt-6 !py-3.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  {currentState === 'Login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                currentState === 'Login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted text-sm">
              {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-primary hover:text-primary-light font-semibold transition-colors"
              >
                {currentState === 'Login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
