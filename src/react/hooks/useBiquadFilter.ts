import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface BiquadFilterProps {
  Q?: number
  gain?: number
  type?: BiquadFilterType
  detune?: number
  frequency?: number
}

export const useBiquadFilter = ({
  Q = 1,
  gain = 0,
  type,
  detune,
  frequency = 350,
}: BiquadFilterProps) => {
  const context = useAudioContext()
  const [biquadFilter, setBiquadFilter] = useState<BiquadFilterNode | null>(null)

  useEffect(() => {
    if (!context) return

    const biquadFilter = context.createBiquadFilter()

    type && (biquadFilter.type = type)
    biquadFilter.frequency.setValueAtTime(frequency, context.currentTime)
    biquadFilter.Q.setValueAtTime(Q, context.currentTime)
    biquadFilter.gain.setValueAtTime(gain, context.currentTime)
    detune && biquadFilter.detune.setValueAtTime(detune, context.currentTime)

    setBiquadFilter(biquadFilter)

    return () => biquadFilter.disconnect()
  }, [context, Q, type, gain, detune, frequency])

  return biquadFilter
}
