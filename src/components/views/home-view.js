import { html } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { PageViewElement } from '../page-view-element.js';

import { store } from '../../store.js';

import { getAllCharacters } from '../../actions/app.js';

import { changeSelected } from '../../actions/picker.js';
import picker from '../../reducers/picker.js';

store.addReducers({
  picker
});

import '../picker-element.js';

class HomeView extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _characters: { type: Array },
      _pickerValue: { type: Number },
    }
  }

  render() {
    return html`
      <section>
        <h2>Characters</h2>
        <picker-element
          legend="Who is your favorite?"
          name="characters"
          .options="${this._characters}"
          @picker-value-changed="${this._pickerValueChanged}"
          value="${this._pickerValue}">
        </picker-element>
        <div>Current selection: ${this._pickerValue}</div>
        <div>Don't like the options available? <button>Add your own character!</button></div>
      </section>
    `;
  }

  firstUpdated() {
    store.dispatch(getAllCharacters());
  }

  _pickerValueChanged(e) {
    store.dispatch(changeSelected(e.detail.value));
  }

  stateChanged(state) {
    this._characters = state.app.characters;
    this._pickerValue = state.picker.value;
  }
}

window.customElements.define('home-view', HomeView);
