import Reveal from 'reveal.js';
import Highlight from 'highlight';
import Markdown from 'markdown';

Reveal.initialize({
	plugins: [ Highlight, Markdown ],
	hash: true,
	respondToHashChanges: true,
	controls: false,
	disableLayout: false,
	view: 'scroll',
});
