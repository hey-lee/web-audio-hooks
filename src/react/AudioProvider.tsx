import { useEffect, useState } from 'react'
import { AudioContextContext } from './hooks/useAudioContext'

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [context] = useState(() => {
    if (typeof window !== 'undefined') {
      return new AudioContext()
    }
    return null
  })

  useEffect(() => {
    return () => {
      context?.close()
    }
  }, [context])

  return (
    <AudioContextContext.Provider value={context}>
      {children}
    </AudioContextContext.Provider>
  )
}
