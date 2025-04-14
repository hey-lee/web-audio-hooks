import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface DynamicsCompressorProps {
  knee?: number
  ratio?: number
  attack?: number
  release?: number
  threshold?: number
}

export const useDynamicsCompressor = ({
  attack = 0.03,
  knee = 30,
  ratio = 12,
  release = 0.25,
  threshold = -24,
}: DynamicsCompressorProps) => {
  const context = useAudioContext()
  const [dynamicsCompressor, setDynamicsCompressor] = useState<DynamicsCompressorNode | null>(null)

  useEffect(() => {
    if (!context) return

    const dynamicsCompressor = context.createDynamicsCompressor()

    dynamicsCompressor.attack.setValueAtTime(attack, context.currentTime)
    dynamicsCompressor.knee.setValueAtTime(knee, context.currentTime)
    dynamicsCompressor.ratio.setValueAtTime(ratio, context.currentTime)
    dynamicsCompressor.release.setValueAtTime(release, context.currentTime)
    dynamicsCompressor.threshold.setValueAtTime(threshold, context.currentTime)

    setDynamicsCompressor(dynamicsCompressor)

    return () => dynamicsCompressor.disconnect()
  }, [context, knee, ratio, attack, release, threshold])

  return dynamicsCompressor
}
