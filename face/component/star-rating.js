class StarRating extends HTMLElement {
	static formAssociated = true;
	static observedAttributes = ['value', 'disabled', 'required'];

	#internals = null;
	#value = '';
	#language = navigator.language;

	#errorMessages = {
		'de': {
			valueMissing: 'Bitte wählen Sie eine Bewertung',
			rangeOverflow: 'Bitte wählen Sie eine Bewertung zwischen 1 und 5'
		},
		'en': {
			valueMissing: 'Please select a rating',
			rangeOverflow: 'Please select a rating between 1 and 5'
		}
	};

	constructor() {
		super();

		if (!(this.#language in this.#errorMessages)) {
			this.#language = 'en';
		}

		this.#internals = this.attachInternals();

		this.attachShadow({mode: 'open', delegatesFocus: true});
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					font-size: 0;
				}

				.star {
					display: inline-block;
					font-size: 24px;
					color: #ddd;
					cursor: pointer;
				}

				.star.active {
					color: #f90;
				}

				:host(:not(:disabled)) .star:focus {
					outline: 2px solid blue;
				}

				:host(:disabled) [part="stars"] {
					pointer-events: none;
					opacity: 0.4;
				}
			</style>
			<div part="stars">
				<span class="star" tabindex="0" autofocus>★</span>
				<span class="star" tabindex="0">★</span>
				<span class="star" tabindex="0">★</span>
				<span class="star" tabindex="0">★</span>
				<span class="star" tabindex="0">★</span>
				<slot></slot>
			</div>
		`;
	}

	connectedCallback() {
		this.#validate();
		this.shadowRoot.querySelectorAll('.star').forEach((star, index) => {
			star.addEventListener('click', () => this.value = index + 1);
			star.addEventListener('keydown', event => {
				if (event.code === 'Enter' || event.code === 'Space') {
					this.value = index + 1;
				}
			});
		});

		this.setAttribute('role', 'radiogroup');
		this.setAttribute('tabindex', '0');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'value' && oldValue !== newValue) {
			this.value = newValue;
		}
		if (name === 'required' && oldValue !== newValue) {
			this.#validate();
		}
	}

	set value(value) {
		// Validate the value
		if (value < 0 || value > 5 || isNaN(value)) {
			this.#internals.setValidity({rangeOverflow: true}, this.#errorMessages[this.#language].rangeOverflow);
			this.#internals.setFormValue('');
			this.#value = '';
			this.shadowRoot.querySelectorAll('.star').forEach((star) => {
				star.classList.toggle('active', false);
			});
			return;
		}

		this.#value = String(value);
		this.#validate();
		this.#internals.setFormValue(value);
		this.shadowRoot.querySelectorAll('.star').forEach((star, index) => {
			star.classList.toggle('active', index < value);
		});
	}

	get value() {
		return this.#value;
	}

	formResetCallback() {
		this.value = '';
	}

	formStateRestoreCallback(state) {
		this.value = state;
	}

	formStateSaveCallback() {
		return this.value;
	}

	formDisabledCallback(disabled) {
		this.shadowRoot.querySelectorAll('.star').forEach((star) => {
			star.setAttribute('tabindex', disabled ? '-1' : '0');
		});
		this.shadowRoot.querySelector('.star').toggleAttribute('autofocus', !disabled);
	}

	#validate() {
		if (this.hasAttribute('required') && !this.value) {
			this.#internals.setValidity({valueMissing: true}, this.#errorMessages[this.#language].valueMissing);
			return false;
		}
		this.#internals.setValidity({});
		return true;
	}

	get validity() {
		return this.#internals.validity;
	}

	get validationMessage() {
		return this.#internals.validationMessage;
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity() {
		return this.#internals.reportValidity();
	}
}

customElements.define('star-rating', StarRating);