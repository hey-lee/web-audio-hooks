import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useIIRFilter = (feedforward: number[], feedback: number[]) => {
  const context = useAudioContext()
  const [iirFilterNode, setIIRFilter] = useState<IIRFilterNode | null>(null)

  useEffect(() => {
    if (!context) return

    const iirFilterNode = context.createIIRFilter(feedforward, feedback)

    setIIRFilter(iirFilterNode)

    return () => iirFilterNode.disconnect()
  }, [context, feedforward, feedback])

  return iirFilterNode
}
