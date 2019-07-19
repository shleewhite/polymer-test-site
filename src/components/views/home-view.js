import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { PageViewElement } from './page-view-element.js';

import { SharedStyles } from '../shared-styles.js';

import { store } from '../../store.js';

import {
  getAllCharacters,
  toggleModal,
} from '../../actions/app.js';
import { changeSelected } from '../../actions/picker.js';

import '../picker-element.js';
import '../button-element.js';
import '../result-element.js';
import '../modal-element.js';

class HomeView extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      showQuiz: { type: Boolean },
      showResult: { type: Boolean },
      _showModal: { type: Boolean },
      _pickerValue: { type: String },
      _characters: { type: Array },
    }
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        h2 {
          margin-top: 0rem;
          text-align: center;
        }

        section {
          background-color: white;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }
      `
    ];
  }

  render() {
    return html`
    <link rel="stylesheet" href="./salesforce-lightning-design-system.min.css">
      <section class="
        ${this.showQuiz ? "showing" : "hidden"} 
        ${this.showModal ? 'slds-backdrop slds-backdrop_open' : ''}"
      >
        <h2>The ultimate personality quiz.</h2>
          <picker-element
            legend="Who do you identify with most?"
            name="characters"
            .options="${this._characters}"
            @picker-value-changed="${this._pickerValueChanged}"
            value="${this._pickerValue}">
          </picker-element>
          <div class="flex">
            <button-element
              label="Add your own option" 
              .handleClick=${this._handleAddClick.bind(this)}>
            </button-element>
            ${this._pickerValue === '' ?
        html`<button-element disabled=${true} label="Show me the results!"></button-element>` :
        html`<button-element .handleClick=${this._handleSubmitClick.bind(this)} label="Show me the results!"></button-element>`
      }
          </div>
      </section>
      <section class="${this._showModal ? 'slds-backdrop slds-backdrop_open' : ''}">
        <result-element
          ?display="${this.showResult}"
          value="${this._pickerValue}">
        </result-element>
      </section>
      ${this._showModal ?
        html`<modal-element></modal-element>` : null
      }
      
    `;
  }

  constructor() {
    super();
    this.showResult = false;
    this.showQuiz = true;
  }

  firstUpdated() {
    store.dispatch(getAllCharacters());
  }

  stateChanged(state) {
    this._characters = state.app.characters;
    this._pickerValue = state.picker.value;
    this._showModal = state.app.showModal;
  }

  _handleAddClick() {
    store.dispatch(toggleModal());
  }

  _handleSubmitClick() {
    this.showResult = true;
    this.showQuiz = false;
  }

  _pickerValueChanged(e) {
    store.dispatch(changeSelected(e.detail.value));
  }
}

window.customElements.define('home-view', HomeView);
