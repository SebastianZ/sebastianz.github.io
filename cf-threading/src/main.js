import Reveal from 'reveal.js';
import Highlight from 'highlight';
import Markdown from 'markdown';
import cfml from './cfml.js';

Reveal.initialize({
	plugins: [ Highlight, Markdown ],
	hash: true,
	transition: 'slide',
	disableLayout: false,
	fragments: true,
	highlight: {
		beforeHighlight: (hljs) => hljs.registerLanguage('cfml', cfml),
	}
});
