# DOM methods

## `append()` and `prepend()` methods

Use `append()` instead of `appendChild()` to add one or more nodes or strings to the end of a parent element
and `prepend()` to add one or more nodes or strings to the beginning of a parent element.

```js
const parent = document.querySelector('.parent');
const child = document.createElement('div');
child.textContent = 'Hello, world!';
parent.append(child);
```

```js
const parent = document.querySelector('.parent');
const child = document.createElement('div');
child.textContent = 'Hello, world!';
parent.prepend(child);
```

## `insertAdjacentElement()` method

Use `insertAdjacentElement()` to insert an element into the DOM relative to another element.

```js
const parent = document.querySelector('.parent');
const child = document.createElement('div');
child.textContent = 'Hello, world!';
parent.insertAdjacentElement('beforebegin', child);
```

## `replaceWith()` method

Use `replaceWith()` to replace an element by one or more nodes or strings.

```js
const parent = document.querySelector('.parent');
const child = document.createElement('div');
child.textContent = 'Hello, world!';
parent.replaceWith(child);
```

## `replaceChildren()` method

Use `replaceChildren()` to replace the children of an element with new nodes.

```js
const parent = document.querySelector('.parent');
const child1 = document.createElement('div');
child1.textContent = 'Hello, world!';
const child2 = document.createElement('div');
child2.textContent = 'Goodbye, world!';
parent.replaceChildren(child1, child2);
```

## `cloneNode()` method

Use `cloneNode()` to create a copy of an element.

```js
const parent = document.querySelector('.parent');
const clone = parent.cloneNode(true);
document.body.append(clone);
```

## `closest()` method

Use `closest()` to find the closest ancestor element that matches a selector.

```js
const element = document.querySelector('.element');
const parent = element.closest('.parent');
```

## `getAttributeNode()` method

Use `getAttributeNode()` to get an attribute node of an element.

```js
const element = document.querySelector('.element');
const attributeNode = element.getAttributeNode('data-attribute');
attributeNode.value = 'new value';
```

## `toggleAttribute()` method

Use `toggleAttribute()` to toggle an attribute on an element.

```js
const element = document.querySelector('.element');
element.toggleAttribute('disabled');
```

## `matches()` method

Use `matches()` to check if an element matches a selector.

```js
const element = document.querySelector('.element');
if (element.matches('.parent')) {
  console.log('Element matches .parent selector');
}
```

## `checkVisibility()` method

Use `checkVisibility()` to check if an element is visible in the viewport.

```js
const element = document.querySelector('.element');
if (element.checkVisibility()) {
  console.log('Element is visible in the viewport');
}
```

## `requestFullscreen()` method

Use `requestFullscreen()` to make an element full screen.

```js
const element = document.querySelector('.element');
element.requestFullscreen();
```

## `requestPointerLock()` method

Use `requestPointerLock()` to lock the pointer to an element.

```js
const element = document.querySelector('.element');
element.requestPointerLock();
```

# APIs

## `AbortController` interface

Use `AbortController` to create a controller that can be used to abort an asynchronous operation.

```js
const controller = new AbortController();
const signal = controller.signal;

document.querySelector('.abort').addEventListener('click', () => {
	controller.abort();
});

fetch('https://api.example.com/data', { signal })
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((error) => console.error(error));
```

## Custom events

Use custom events to trigger custom behavior in your application.

```js
const event = new CustomEvent('customEvent', { detail: { key: 'value' }, bubbles: true, cancelable: true });

element = document.querySelector('.element');
element.addEventListener('customEvent', (evt) => {
  console.log('element', evt.detail.key);
});
document.body.addEventListener('customEvent', (evt) => {
  console.log('body', evt);
});

element.dispatchEvent(event);
```

## `DOMParser` interface

Use `DOMParser` to parse an XML or HTML string into a DOM document.

```js
const parser = new DOMParser();
const doc = parser.parseFromString('<div>Hello, world!</div>', 'text/html');
```

## `DocumentFragment` interface

Use `DocumentFragment` to create a lightweight container for DOM nodes.

```js
const fragment = new DocumentFragment();
const div = document.createElement('div');
div.textContent = 'Hello, world!';
fragment.append(div);
```

## `Element.animate()` method

Use `Element.animate()` to animate an element using CSS animations.

```js
const element = document.querySelector('.element');
element.animate([
  { transform: 'translateX(0)' },
  { transform: 'translateX(100px)' }
], {
  duration: 1000,
  iterations: Infinity
});
```

## `MutationObserver` interface

Use `MutationObserver` to observe changes to the DOM.

```js
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
	console.log(mutation.type);
  });
});

observer.observe(document.body, { childList: true, subtree: true });
```

# Intersection Observer API

This API allows you to observe changes to the intersection of a target element with an ancestor element or with a top-level document's viewport.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
	if (entry.isIntersecting) {
	  console.log('Element is intersecting');
	}
  });
});

observer.observe(document.querySelector('.element'));
```

# Resize Observer API

This API allows you to observe changes to the size of an element.

```js
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
	console.log(entry.contentRect.width, entry.contentRect.height);
  });
});

observer.observe(document.querySelector('.element'));
```

## Turn array-like objects into arrays

Use the array spread `[...]` syntax to turn array-like objects into arrays.

```js
const nodeList = document.querySelectorAll('.element');
const array = [...nodeList];
```

## `Range` interface

Use `Range` to represent a range of nodes in the DOM.

```js
const range = new Range();
range.setStart(document.body, 0);
range.setEnd(document.body, 1);
```

## `TreeWalker` interface

Use `TreeWalker` to traverse the DOM tree.

```js
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => NodeFilter.FILTER_ACCEPT });
```

## `XPathEvaluator` interface

Use `XPathEvaluator` to evaluate XPath expressions.

```js
const evaluator = new XPathEvaluator();
const result = evaluator.evaluate('//div', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
```

## `Element.getBoundingClientRect()` method

Use `Element.getBoundingClientRect()` to get the size and position of an element relative to the viewport.

```js
const element = document.querySelector('.element');
const rect = element.getBoundingClientRect();
```

## `Element.localName` property

Use `Element.localName` instead of `Element.tagName` to get the local name of an element.

```js
const element = document.querySelector('.element');
console.log(element.localName);
```

# Clipboard API

This API should be used instead of the deprecated `execCommand()` method.


## `Clipboard.writeText()` method

Use `Clipboard.writeText()` to write text to the clipboard.

```js
navigator.clipboard.writeText('Hello, world!');
```

## `Clipboard.readText()` method

Use `Clipboard.readText()` to read text from the clipboard.

```js
navigator.clipboard.readText().then((text) => {
  console.log(text);
});
```

## `Clipboard.write()` method

Use `Clipboard.write()` to write data to the clipboard.

```js
navigator.clipboard.write([
  new ClipboardItem({ 'text/plain': new Blob(['Hello, world!'], { type: 'text/plain' }) })
]);
```

## `Clipboard.read()` method

Use `Clipboard.read()` to read data from the clipboard.

```js
navigator.clipboard.read().then((items) => {
  items.forEach((item) => {
	item.getType().then((type) => {
	  item.getType(type).then((blob) => {
		blob.text().then((text) => {
		  console.log(text);
		});
	  });
	});
  });
});
```

# Console API

There is more than just `console.log()`!

## `console.assert()` method

Use `console.assert()` to log a message if an expression is false.

```js
console.assert(1 === 2, '1 is not equal to 2');
```

## `console.count()` method

Logs the number of times this line has been called with the given label.

```js
console.count('label');
```

## `console.dir()` method

Displays an interactive list of the properties of the specified JavaScript object.

```js
console.dir(document.body);
```

## `console.group()` method

Creates a new inline group in the console.

```js
console.group('Group');
console.log('Hello, world!');
console.groupEnd();
```

## `console.table()` method

Displays tabular data as a table.

```js
console.table([{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]);
```

## `console.time()` method

Starts a timer you can use to track how long an operation takes.

```js
console.time('Timer');
// Do something
console.timeEnd('Timer');
```

## `console.trace()` method

Outputs a stack trace to the console.

```js
console.trace();
```

# `URLSearchParams` interface

Use `URLSearchParams` to create a new URLSearchParams object.

```js
const params = new URLSearchParams('key1=value1&key2=value2');
params.append('key3', 'value3');
console.log(params.toString());
```

# Popover API

This API allows you to create popovers that display additional information when a user interacts with an element.

```js
const popover = new Popover(document.querySelector('.element'), { content: 'Hello, world!' });
popover.show();
```

# Web Speech API

This API allows you to add speech recognition and synthesis to your web applications.

## `matchMedia()` method

Use `matchMedia()` to check if a media query matches the current viewport.

```js
const mediaQuery = window.matchMedia('(min-width: 768px)');
if (mediaQuery.matches) {
  console.log('Viewport is at least 768px wide');
}
```

## `Intl` object

Use `Intl` to format dates, numbers, currencies and more according to the user's locale.

```js
const number = 123456.78;
const enUsFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const deDeFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(enUsFormatter.format(number)); // $123,456.78
console.log(deDeFormatter.format(number)); // 123.456,78 €
```

## Optional chaining

Use the optional chaining operator `?.` to safely access nested properties of an object.

```js
const user = { name: 'Alice', address: { city: 'Springfield' } };
const city = user?.address?.city;
const phone = user?.phone?.number;
console.log(city, phone); // Springfield undefined
```

## Nullish coalescing

Use the `??` operator to provide a default value for a variable that may be `null` or `undefined`.

```js
const value = null;
const defaultValue = value ?? 'default';
```

## Logical assignment operators

Use the logical assignment operators `||=` and `&&=` to assign a value to a variable only if it is `null` or `undefined`.

```js
let count = null;
count ||= 0;
```

## RegExp named capturing groups

Use named capturing groups in regular expressions to extract specific parts of a string.

```js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2022-01-01');
console.log(match.groups.year, match.groups.month, match.groups.day);
```

# Links

* https://www.geeksforgeeks.org/amazing-new-javascript-features-in-es15-2024/
* https://medium.com/@yourfuse/javascript-whats-new-with-ecmascript-2024-es15-ef056d2f4bf1
* https://thenewstack.io/whats-new-for-javascript-developers-in-ecmascript-2024/
* https://blog.openreplay.com/javascript--new-features-for-2024/