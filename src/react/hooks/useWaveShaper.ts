import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface WaveShaperProps {
  curve?: Float32Array
  oversample?: OverSampleType
}

export const useWaveShaper = ({
  curve,
  oversample = 'none',
}: WaveShaperProps) => {
  const context = useAudioContext()
  const [waveShaper, setWaveShaper] = useState<WaveShaperNode | null>(null)

  useEffect(() => {
    if (!context) return

    const waveShaper = context.createWaveShaper()

    curve && (waveShaper.curve = curve)
    waveShaper.oversample = oversample

    setWaveShaper(waveShaper)

    return () => waveShaper.disconnect()
  }, [context, curve, oversample])

  return waveShaper
}
