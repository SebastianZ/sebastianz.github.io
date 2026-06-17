import React from 'react'
import { Deck } from '@revealjs/react'
import Slides from './slides'

export default function App() {
  const slides = Slides();
  return (
    <Deck
      config={{
        theme: 'moon',
        controls: true,
        progress: true,
        center: true,
        hash: true,
      }}
    >
      {slides}
    </Deck>
  )
}
