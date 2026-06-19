import React from 'react'
import { Deck } from '@revealjs/react'
import Slides from './slides'
import RevealHighlight from 'reveal.js/plugin/highlight';
import cfml from './cfml.js';

export default function App() {
  const slides = Slides();
  return (
    <Deck
		plugins={[RevealHighlight]}
		config={{
			theme: 'moon',
			hash: true,
			transition: 'slide',
			disableLayout: false,
			controls: true,
			progress: true,
			center: true,
			highlight: {
				beforeHighlight: (hljs) => hljs.registerLanguage('cfml', cfml),
			}
		}}
    >
      {slides}
    </Deck>
  )
}
