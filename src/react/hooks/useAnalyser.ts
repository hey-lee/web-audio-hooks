import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface AnalyserProps {
  fftSize?: number
  minDecibels?: number
  maxDecibels?: number
  smoothingTimeConstant?: number
}

export const useAnalyser = ({
  fftSize = 256,
  minDecibels = -100,
  maxDecibels = -30,
  smoothingTimeConstant = 0.8,
}: AnalyserProps) => {
  const context = useAudioContext()
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [data, setData] = useState<Uint8Array>(new Uint8Array(0))

  useEffect(() => {
    if (!context) return

    const analyser = context.createAnalyser()

    analyser.fftSize = fftSize
    analyser.minDecibels = minDecibels
    analyser.maxDecibels = maxDecibels
    analyser.smoothingTimeConstant = smoothingTimeConstant

    setAnalyser(analyser)

    return () => analyser.disconnect()
  }, [context, fftSize, minDecibels, maxDecibels, smoothingTimeConstant])

  useEffect(() => {
    if (!analyser) return

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const update = () => {
      analyser.getByteFrequencyData(dataArray)
      setData(dataArray)
      requestAnimationFrame(update)
    }

    const raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [analyser])

  return { analyser, data }
}
