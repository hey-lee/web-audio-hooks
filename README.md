# Web Audio Hooks

A collection of React hooks for working with the Web Audio API.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/hey-lee/web-audio-hooks/refs/heads/main/LICENSE)

## Installation

```bash
npm install web-audio-hooks
```

## Usage

Wrap your application with the AudioProvider to create an audio context:

```tsx
import { AudioProvider } from 'web-audio-hooks'

function App() {
  return (
    <AudioProvider>
      <YourComponent />
    </AudioProvider>
  )
}
```

Then use the hooks in your components:

```tsx
import { useGain, useOscillator } from 'web-audio-hooks'

function Synth() {
  const oscillator = useOscillator({ frequency: 440, type: 'sine' })
  const gain = useGain(0.5)
  
  useEffect(() => {
    if (oscillator && gain) {
      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      oscillator.start()
      
      return () => {
        oscillator.stop()
      }
    }
  }, [oscillator, gain])
  
  return <div>Synth playing...</div>
}
```

## Available Hooks

### `useAudioContext`

Returns the current audio context.

```ts
const audioContext = useAudioContext()
```

### `useAnalyser`

Creates an AnalyserNode for visualizing audio data.

```tsx
const analyser = useAnalyser({
  fftSize: 2048,
  minDecibels: -90,
  maxDecibels: -10,
  smoothingTimeConstant: 0.85,
})
```

### `useBiquadFilter`

Creates a BiquadFilterNode for filtering audio.

```tsx
const filter = useBiquadFilter({
  Q: 1,
  gain: 0,
  detune: 0
  type: 'lowpass',
  frequency: 1000,
})
```

### `useChannelMerger`

Creates a ChannelMergerNode for combining multiple audio channels.

```tsx
const merger = useChannelMerger(2) // number of inputs
```

### `useChannelSplitter`

Creates a ChannelSplitterNode for separating audio channels.

```tsx
const splitter = useChannelSplitter(2) // number of outputs
```

### `useConvolver`

Creates a ConvolverNode for applying reverb or other impulse responses.

```tsx
const convolver = useConvolver({
  buffer: impulseResponseBuffer,
  normalize: true,
})
```

### `useDelay`

Creates a DelayNode for delaying audio.

```tsx
const delay = useDelay(5) // max delay time in seconds
```

### `useDynamicsCompressor`

Creates a DynamicsCompressorNode for audio compression.

```tsx
const compressor = useDynamicsCompressor({
  knee: 30,
  ratio: 12,
  attack: 0.003,
  release: 0.25,
  threshold: -24,
})
```

### `useGain`

Creates a GainNode for controlling volume.

```tsx
const gain = useGain(0.5) // initial gain value
```

### `useIIRFilter`

Creates an IIRFilterNode for custom filtering.

```tsx
const iirFilter = useIIRFilter(
  [0.00020298, 0.0004059599, 0.00020298], // feedforward coefficients
  [1.0126964558, -1.9991880801, 0.9873035442]  // feedback coefficients
)
```

### `useOscillator`

Creates an OscillatorNode for generating audio.

```tsx
const oscillator = useOscillator({
  detune: 0,
  type: 'sine',
  frequency: 440,
})
```

### `usePanner`

Creates a PannerNode for 3D audio positioning.

```tsx
const panner = usePanner({
  panningModel: 'HRTF',
  distanceModel: 'inverse',
  refDistance: 1,
  maxDistance: 10000,
  rolloffFactor: 1,
  coneInnerAngle: 360,
  coneOuterAngle: 0,
  coneOuterGain: 0,
})
```

### `useStereoPanner`

Creates a StereoPannerNode for simple left/right panning.

```tsx
const stereoPanner = useStereoPannerNode(0) // pan value (-1 to 1)
```

### `useWaveShaper`

Creates a WaveShaperNode for applying distortion.

```tsx
const waveShaper = useWaveShaper({
  curve: distortionCurve,
  oversample: '4x',
})
```

## License

MIT © [Lee](https://github.com/hey-lee)