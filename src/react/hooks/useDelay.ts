import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useDelay = (maxDelayTime: number = 0) => {
  const context = useAudioContext()
  const [delay, setDelay] = useState<DelayNode | null>(null)

  useEffect(() => {
    if (!context) return

    const delay = context.createDelay(maxDelayTime)

    setDelay(delay)

    return () => delay.disconnect()
  }, [context, maxDelayTime])

  return delay
}
