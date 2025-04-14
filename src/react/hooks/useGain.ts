import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useGain = (initialValue = 1) => {
  const context = useAudioContext()
  const [gain, setGain] = useState<GainNode | null>(null)

  useEffect(() => {
    if (!context) return

    const gain = context.createGain()

    gain.gain.setValueAtTime(initialValue, context.currentTime)

    setGain(gain)

    return () => gain.disconnect()
  }, [context, initialValue])

  return gain
}
