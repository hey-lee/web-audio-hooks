import { createContext, useContext } from 'react'

export const AudioContextContext = createContext<AudioContext | null>(null)

export const useAudioContext = () => {
  const context = useContext(AudioContextContext)
  
  if (!context) {
    console.log(`"useAudioContext" must be used within an "AudioProvider"`)
  }
  return context
}
