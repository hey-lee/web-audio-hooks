import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface OscillatorProps {
  type?: OscillatorType
  detune?: number
  frequency?: number
}

export const useOscillator = ({
  type,
  detune,
  frequency,
}: OscillatorProps) => {
  const context = useAudioContext()
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null)

  useEffect(() => {
    if (!context) return

    const oscillator = context.createOscillator()

    type && (oscillator.type = type)
    detune && oscillator.detune.setValueAtTime(detune, context.currentTime)
    frequency && oscillator.frequency.setValueAtTime(frequency, context.currentTime)

    setOscillator(oscillator)

    return () => {
      oscillator.stop()
      oscillator.disconnect()
    }
  }, [context, type, detune, frequency])

  return oscillator
}
