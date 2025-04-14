import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useChannelSplitter = (numberOfOutputs?: number) => {
  const context = useAudioContext()
  const [channelSplitter, setChannelSplitter] = useState<ChannelSplitterNode | null>(null)

  useEffect(() => {
    if (!context) return

    const channelSplitter = context.createChannelSplitter(numberOfOutputs)

    setChannelSplitter(channelSplitter)

    return () => channelSplitter.disconnect()
  }, [context, numberOfOutputs])

  return channelSplitter
}
