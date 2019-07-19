import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

import { getResult } from '../actions/app.js';

import './button-element.js';

class ResultElement extends connect(store)(LitElement) {
  static get properties() {
    return {
      display: { type: Boolean },
      value: { type: String },
      _result: { type: String },
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .display-img {
          max-height: 4rem;
          max-width: 4rem;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this.display ? html`
        <div>
          <h2>You picked: ${this._result.label}</h2>
          <img 
            class="display-img" 
            alt="${this._result.alt}" 
            src="${this._result.custom ?
          `${this._result.image}` : `./images/${this._result.image}`
        }"/>
          <p>${this._result.description}</p>
          <button-element .handleClick=${this._refresh} label="Do it again"></button-element>
        <div>` : null
      }`;
  }

  updated() {
    store.dispatch(getResult(this.value));
  }

  stateChanged(state) {
    this._pickerValue = state.picker.value;
    this._result = state.app.result;
  }

  _refresh() {
    location.reload();
  }
}

window.customElements.define('result-element', ResultElement);
