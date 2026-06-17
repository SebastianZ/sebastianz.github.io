import Reveal from 'reveal.js';
import Highlight from 'highlight';
import Markdown from 'markdown';
import cfml from './cfml.js';

Reveal.initialize({
	plugins: [ Highlight, Markdown ],
	hash: true,
	transition: 'slide',
	disableLayout: false,
	view: 'scroll',
	highlight: {
		beforeHighlight: (hljs) => hljs.registerLanguage('cfml', cfml),
	}
});
