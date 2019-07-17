import { LitElement, html, css } from 'lit-element';

// this component is not connected to redux store.

class PickerElement extends LitElement {
  static get properties() {
    return {
      legend: { type: String },
      name: { type: String },
      options: { type: Array },
      value: { type: String },
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      <link rel="stylesheet" href="./salesforce-lightning-design-system.min.css">
      <fieldset class="slds-form-element">
        <legend class="slds-form-element__legend slds-form-element__label">
          ${this.legend}
        </legend>
        <div class="slds-form-element__control">
          ${this.options.map((opt) => (html`
            <div class="slds-visual-picker slds-visual-picker_medium">
              <input
                type="radio"
                id="opt-${opt.value}"
                value="${opt.value}"
                .name="${this.name}" 
                @click="${this._onSelect}"
                opt-input />
              <label for="opt-${opt.value}">
                <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                  <span class="slds-is-selected">
                    <span class="slds-icon_container">
                      <img class="slds-icon slds-icon_large" alt="" src="./images/${opt.image}"/>
                    </span>
                  </span>
                  <span class="slds-is-not-selected">
                    <span class="slds-icon_container">
                      <img class="slds-icon slds-icon-utility-custom_apps slds-icon_large slds-icon-text-default" alt="" src="./images/${opt.image}"/>
                    </span>
                  </span>
                </span>
                <span class="slds-visual-picker__body">
                  <span class="slds-text-title">${opt.label}</span>
                </span>
              </label>
              </div>
          `))}
        </div>
      </fieldset>
    `;
  }

  constructor() {
    super();
    this.value = '';
  }

  _onSelect(e) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new CustomEvent('picker-value-changed', {
      detail: {
        value: e.currentTarget.value,
      },
    }));
  }
}

window.customElements.define('picker-element', PickerElement);
