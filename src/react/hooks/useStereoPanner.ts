import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useStereoPannerNode = (pan?: number) => {
  const context = useAudioContext()
  const [stereoPanner, setStereoPanner] = useState<StereoPannerNode | null>(null)

  useEffect(() => {
    if (!context) return

    const stereoPanner = context.createStereoPanner()

    pan && stereoPanner.pan.setValueAtTime(pan, context.currentTime)

    setStereoPanner(stereoPanner)

    return () => stereoPanner.disconnect()
  }, [context, pan])

  return stereoPanner
}
