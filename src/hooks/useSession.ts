import { useState, useEffect } from 'react'

const SESSION_DURATION = 4 * 60 * 60 * 1000 // 4 hours
const WARNING_THRESHOLD = 5 * 60 * 1000 // 5 minutes

export function useSession() {
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [remainingMs, setRemainingMs] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && startTime > 0) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, SESSION_DURATION - elapsed)
        setRemainingMs(remaining)
        if (remaining === 0) {
          setIsActive(false)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, startTime])

  const start = (email?: string) => {
    setStartTime(Date.now())
    setIsActive(true)
  }

  const extend = () => {
    setStartTime(Date.now())
    setIsActive(true)
  }

  const end = () => {
    setIsActive(false)
    setStartTime(0)
    setRemainingMs(0)
  }

  const warningVisible = remainingMs > 0 && remainingMs <= WARNING_THRESHOLD

  return { isActive, warningVisible, remainingMs, start, extend, end }
}
