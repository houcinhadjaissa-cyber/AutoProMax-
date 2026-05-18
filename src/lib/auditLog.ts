export interface AuditEntry {
  type: string
  payload: unknown
  timestamp: number
}

export const auditLog = {
  write: (entry: Omit<AuditEntry, 'timestamp'>) => {
    const fullEntry: AuditEntry = { ...entry, timestamp: Date.now() }
    try {
      const stored = localStorage.getItem('autopro-audit-log-v1')
      const entries: AuditEntry[] = stored ? JSON.parse(stored) : []
      entries.push(fullEntry)
      if (entries.length > 100) entries.shift() // Keep last 100
      localStorage.setItem('autopro-audit-log-v1', JSON.stringify(entries))
    } catch (err) {
      console.error('[AuditLog] Failed to write:', err)
    }
  },
}
