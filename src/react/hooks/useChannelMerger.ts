import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

export const useChannelMerger = (numberOfInputs?: number) => {
  const context = useAudioContext()
  const [channelMerger, setChannelMerger] = useState<ChannelMergerNode | null>(null)

  useEffect(() => {
    if (!context) return

    const channelMerger = context.createChannelMerger(numberOfInputs)

    setChannelMerger(channelMerger)

    return () => channelMerger.disconnect()
  }, [context, numberOfInputs])

  return channelMerger
}
