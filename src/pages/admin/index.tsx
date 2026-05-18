import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Clock, AlertTriangle } from 'lucide-react'
import { useSession } from '../../hooks/useSession'
import { useLoginAttempts } from '../../hooks/useLoginAttempts'
import { auditLog } from '../../lib/auditLog'

const SECURITY_CONFIG = {
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000,
}

const formatRemaining = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function AdminPage() {
  const [loginStep, setLoginStep] = useState<'email' | 'password' | 'totp'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLockedOut, setIsLockedOut] = useState(false)
  const [lockoutRemaining, setLockoutRemaining] = useState(0)

  const { isActive, warningVisible, remainingMs, start, extend, end } = useSession()
  const { failures: loginAttempts, recordFailure, reset: resetAttempts } = useLoginAttempts()

  const VITE_LOCK_ADMIN = import.meta.env?.VITE_LOCK_ADMIN === 'true'
  const VITE_ADMIN_EMAIL = (import.meta.env?.VITE_ADMIN_EMAIL || '').toLowerCase()

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

  if (!isActive) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        {!isLockedOut ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-heavy p-8 card-28 max-w-md w-full"
          >
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">Admin Master Control</h1>
              <p className="text-gray-400">Secure platform governance portal</p>
            </div>

            {loginStep === 'email' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setLoginStep('password')
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white"
                  placeholder="Admin Email"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                  Continue →
                </button>
              </form>
            )}

            {loginStep === 'password' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setLoginStep('totp')
                }}
                className="space-y-4"
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white"
                  placeholder="Password"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                  Verify →
                </button>
              </form>
            )}

            {loginStep === 'totp' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  start(email)
                  auditLog.write({ type: 'admin:login_success', payload: { email } })
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-center text-2xl tracking-widest text-white"
                  placeholder="000000"
                  required
                />
                <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">
                  Complete Login →
                </button>
              </form>
            )}

            {loginError && <p className="text-red-400 text-sm mt-4">{loginError}</p>}
          </motion.div>
        ) : (
          <div className="text-center">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Account Locked</h2>
            <p className="text-3xl font-mono text-red-400 mb-4">{formatRemaining(lockoutRemaining)}</p>
            <button onClick={() => window.location.reload()} className="text-blue-400">
              Refresh to retry
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="bg-[#1A1A1A] border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Control</h1>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-400 font-mono text-sm">{formatRemaining(remainingMs)}</span>
              <button onClick={() => extend()} className="text-xs bg-blue-600 px-2 py-1 rounded text-white">
                +4h
              </button>
            </div>
            <button onClick={() => { end(); window.location.href = '/' }} className="text-red-400">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1A1A1A] rounded-xl">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-2xl font-bold text-white mt-1">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}
