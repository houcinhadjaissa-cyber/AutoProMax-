import { useState, useEffect } from 'react'

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export function useLoginAttempts() {
  const [failures, setFailures] = useState(0)
  const [lockoutEnd, setLockoutEnd] = useState<number>(0)

  useEffect(() => {
    const stored = localStorage.getItem('autopro-login-attempts-v1')
    const lockout = localStorage.getItem('autopro-lockout-time-v1')
    if (stored) setFailures(parseInt(stored, 10))
    if (lockout) setLockoutEnd(parseInt(lockout, 10))
  }, [])

  const recordFailure = () => {
    const newFailures = failures + 1
    setFailures(newFailures)
    localStorage.setItem('autopro-login-attempts-v1', newFailures.toString())
    if (newFailures >= MAX_ATTEMPTS) {
      const lockoutTime = Date.now() + LOCKOUT_DURATION
      setLockoutEnd(lockoutTime)
      localStorage.setItem('autopro-lockout-time-v1', lockoutTime.toString())
    }
  }

  const reset = () => {
    setFailures(0)
    setLockoutEnd(0)
    localStorage.removeItem('autopro-login-attempts-v1')
    localStorage.removeItem('autopro-lockout-time-v1')
  }

  return { failures, recordFailure, reset }
}
