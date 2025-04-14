import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface ConvolverProps {
  buffer?: AudioBuffer
  normalize?: boolean
}

export const useConvolver = ({
  buffer,
  normalize = true,
}: ConvolverProps) => {
  const context = useAudioContext()
  const [convolver, setConvolver] = useState<ConvolverNode | null>(null)

  useEffect(() => {
    if (!context) return

    const convolver = context.createConvolver()

    buffer && (convolver.buffer = buffer)
    convolver.normalize = normalize

    setConvolver(convolver)

    return () => convolver.disconnect()
  }, [context, buffer, normalize])

  return convolver
}
