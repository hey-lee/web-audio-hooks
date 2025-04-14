import { useEffect, useState } from 'react'
import { useAudioContext } from './useAudioContext'

interface PannerProps {
  coneInnerAngle?: number
  coneOuterAngle?: number
  coneOuterGain?: number
  distanceModel?: DistanceModelType
  maxDistance?: number
  panningModel?: PanningModelType
  refDistance?: number
  rolloffFactor?: number
}

export const usePanner = ({
  coneInnerAngle = 360,
  coneOuterAngle = 0,
  coneOuterGain = 0,
  distanceModel,
  maxDistance = 10000,
  panningModel,
  refDistance = 1,
  rolloffFactor = 1,
}: PannerProps) => {
  const context = useAudioContext()
  const [panner, setPanner] = useState<PannerNode | null>(null)

  useEffect(() => {
    if (!context) return

    const panner = context.createPanner()

    panner.coneInnerAngle = coneInnerAngle
    panner.coneOuterAngle = coneOuterAngle
    panner.coneOuterGain = coneOuterGain
    distanceModel && (panner.distanceModel = distanceModel)
    panner.maxDistance = maxDistance
    panningModel && (panner.panningModel = panningModel)
    panner.refDistance = refDistance
    panner.rolloffFactor = rolloffFactor

    setPanner(panner)

    return () => panner.disconnect()
  }, [
    context,
    coneInnerAngle,
    coneOuterAngle,
    coneOuterGain,
    distanceModel,
    maxDistance,
    panningModel,
    refDistance,
    rolloffFactor,
  ])

  return panner
}
