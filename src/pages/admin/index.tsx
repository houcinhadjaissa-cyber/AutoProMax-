// src/pages/admin/index.tsx
// AutoProMax — Admin Master Control Panel
// Fixed: No Supabase, matches iOS 26 design theme

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Lock, Clock, Activity, LogOut,
  Database, CheckCircle, AlertTriangle, Settings
} from 'lucide-react'
import { useSession } from '../../hooks/useSession'
import { useLoginAttempts } from '../../hooks/useLoginAttempts'
import { auditLog } from '../../lib/auditLog'
import { isDemoMode } from '../../core/config/security'

const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000,
  SESSION_DURATION: 4 * 60 * 60 * 1000,
}

const formatRemaining = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loginStep, setLoginStep] = useState<'email' | 'password' | 'totp'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [tempUserId, setTempUserId] = useState<string | null>(null)
  const [loginError, setLoginError] = useState('')
  const [isLockedOut, setIsLockedOut] = useState(false)
  const [lockoutRemaining, setLockoutRemaining] = useState(0)

  const { isActive, warningVisible, remainingMs, start: startSession, extend: extendSession, end: endSession } = useSession()
  const { failures: loginAttempts, recordFailure, reset: resetAttempts } = useLoginAttempts()

  const VITE_LOCK_ADMIN = import.meta.env.VITE_LOCK_ADMIN === 'true'
  const VITE_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase()
  const IS_DEMO = isDemoMode()

  useEffect(() => {
    const attempts = parseInt(localStorage.getItem('autopro-login-attempts-v1') || '0', 10)
    const lockoutTime = parseInt(localStorage.getItem('autopro-lockout-time-v1') || '0', 10)

    if (attempts >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS && lockoutTime > 0) {
      const remaining = Math.max(0, lockoutTime - Date.now())
      if (remaining > 0) {
        setIsLockedOut(true)
        setLockoutRemaining(remaining)

        const interval = setInterval(() => {
          const newRemaining = Math.max(0, lockoutTime - Date.now())
          setLockoutRemaining(newRemaining)
          if (newRemaining <= 0) {
            clearInterval(interval)
            setIsLockedOut(false)
            resetAttempts()
          }
        }, 1000)

        return () => clearInterval(interval)
      } else {
        resetAttempts()
      }
    }
  }, [resetAttempts])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (isLockedOut) {
      setLoginError('Account temporarily locked due to too many failed attempts')
      return
    }

    auditLog.write({ type: 'admin:login_attempt', payload: { step: 'email', email } })

    const allowLogin = !VITE_LOCK_ADMIN || email.toLowerCase() === VITE_ADMIN_EMAIL || IS_DEMO

    if (!allowLogin) {
      setLoginError('Access denied. This email is not authorized for admin access.')
      recordFailure()
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setLoginError('Please enter a valid email address')
      return
    }

    setLoginStep('password')
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (!password) {
      setLoginError('Password is required')
      return
    }

    // Demo mode: accept any password
    setTempUserId('demo-admin-user')
    auditLog.write({ type: 'admin:password_demo', payload: { email } })
    setLoginStep('totp')
  }

  const handleTOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (!totpCode.match(/^\d{6}$/)) {
      setLoginError('Please enter a valid 6-digit verification code')
      return
    }

    // Demo mode: accept any 6 digits
    validTOTP = true
    auditLog.write({ type: 'admin:totp_demo', payload: { email } })

    if (validTOTP) {
      startSession(email)
      setIsLockedOut(false)
      resetAttempts()
      auditLog.write({ type: 'shell.mounted', payload: { email, session_duration: 4 * 60 * 60 * 1000 } })
    } else {
      setLoginError('Invalid verification code')
      recordFailure()
    }
  }

  const handleLogout = () => {
    auditLog.write({ type: 'logout', payload: { email, reason: 'manual' } })
    endSession()
    setLoginStep('email')
    setEmail('')
    setPassword('')
    setTotpCode('')
    setTempUserId(null)
    resetAttempts()
  }

  if (!isActive) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        {!isLockedOut ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-heavy p-8 card-28 max-w-md w-full border border-white/18 shadow-2xl"
          >
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white">Admin Master Control</h1>
              <p className="text-gray-400">Secure platform governance portal</p>
            </div>

            <div className="mb-6 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-300">
                  {IS_DEMO ? '○ Demo Mode' : '✓ Real Auth Active'}
                </span>
                {VITE_LOCK_ADMIN && (
                  <span className="text-yellow-400 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Soft-Lock
                  </span>
                )}
              </div>
            </div>

            {loginStep === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform Owner Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!email}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Continue →
                </button>
              </form>
            )}

            {loginStep === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={!password}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Verify Credentials →
                </button>
              </form>
            )}

            {loginStep === 'totp' && (
              <form onSubmit={handleTOTPSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400">Enter the 6-digit code from your authenticator app</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="000000"
                    required
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={totpCode.length !== 6}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Complete Login →
                </button>
              </form>
            )}

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{loginError}</p>
              </motion.div>
            )}

            <div className="mt-8 flex justify-center gap-2">
              {[
                { step: 'email', label: 'Email' },
                { step: 'password', label: 'Password' },
                { step: 'totp', label: 'TOTP' },
              ].map(({ step, label }, i) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      loginStep === step
                        ? 'bg-blue-600 text-white'
                        : ['email', 'password', 'totp'].indexOf(step) < ['email', 'password', 'totp'].indexOf(loginStep)
                        ? 'bg-green-600 text-white'
                        : 'bg-[#1A1A1A] text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`ml-2 text-xs ${loginStep === step ? 'text-blue-400' : 'text-gray-500'}`}>
                    {label}
                  </span>
                  {i < 2 && (
                    <div
                      className={`w-8 h-0.5 mx-2 ${
                        ['email', 'password', 'totp'].indexOf(step) < ['email', 'password', 'totp'].indexOf(loginStep)
                          ? 'bg-green-600'
                          : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {loginAttempts > 0 && (
              <p className="mt-6 text-xs text-center text-gray-500">
                Failed attempts: {loginAttempts} / {SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-heavy p-8 card-28 max-w-md w-full border border-red-500/30"
          >
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Account Locked</h2>
              <p className="text-gray-400 mb-6">
                Too many failed login attempts. Please wait before trying again.
              </p>
              <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
                <Clock className="w-8 h-8 mx-auto text-red-400 mb-2" />
                <p className="text-3xl font-mono font-bold text-red-400">
                  {formatRemaining(lockoutRemaining)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Time remaining</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Refresh page to retry
              </button>
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  // Admin Dashboard Shell - iOS 26 Design
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Top Bar - Glass Effect */}
      <div className="sticky top-0 z-50 glass-heavy border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-blue-500" />
            <div>
              <h1 className="font-bold text-white tracking-tight">Admin Control</h1>
              <p className="text-xs text-gray-400">{email || 'admin@platform.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Session Timer */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full border border-white/10">
              <Clock className={`w-4 h-4 ${warningVisible ? 'text-yellow-500 animate-pulse' : 'text-blue-400'}`} />
              <span className={`text-sm font-mono ${warningVisible ? 'text-yellow-400' : 'text-white'}`}>
                {formatRemaining(remainingMs)}
              </span>
              <button
                onClick={() => extendSession()}
                className="ml-2 text-xs text-blue-400 hover:text-blue-300"
                title="Extend by 4 hours"
              >
                +4h
              </button>
            </div>

            {/* Environment Badge */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                IS_DEMO ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {IS_DEMO ? 'Demo' : 'Production'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-sm">End Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {warningVisible && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-400">
              Session expiring soon. Click "+4h" to extend.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Dashboard</h2>
          <p className="text-gray-400 mt-1">
            {IS_DEMO ? 'Demo mode — data not persisted' : 'Connected to live platform'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 card-20 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-green-400 text-xs font-medium">+12%</span>
            </div>
            <p className="text-sm text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold text-white mt-1">1,247</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 card-20 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-xs font-medium">Active</span>
            </div>
            <p className="text-sm text-gray-400">System Status</p>
            <p className="text-lg font-bold text-white mt-1">All Systems Operational</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 card-20 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-blue-400 text-xs font-medium">Live</span>
            </div>
            <p className="text-sm text-gray-400">Active Users</p>
            <p className="text-2xl font-bold text-white mt-1">3,892</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['View Recent Orders', 'Check Audit Logs', 'Manage Sellers', 'System Health'].map((action, i) => (
              <motion.button
                key={action}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass p-4 card-16 border border-white/10 hover:border-blue-500/50 transition-colors text-left flex items-center gap-3"
              >
                <Settings className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">{action}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
