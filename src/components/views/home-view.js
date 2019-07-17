import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { PageViewElement } from './page-view-element.js';

import { store } from '../../store.js';

import {
  getAllCharacters,
  navigate
} from '../../actions/app.js';
import { changeSelected } from '../../actions/picker.js';

import '../picker-element.js';
import '../footer-element.js';

class HomeView extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _characters: { type: Array },
      _pickerValue: { type: Number },
    }
  }

  static get styles() {
    return css`
      .hide {
        display: none;
      }
    `;
  }

  render() {
    const backButton = {
      label: "Previous page",
      disabled: true,
    };
    const nextButton = {
      label: "Show me my results!",
      disabled: false,
      onClick: () => {
        // console.log('test');
        // window.location.href = '/view2';
        history.pushState({}, "test", "results-view")
        store.dispatch(navigate("/results-view"))
      }
    };

    return html`
      <section class="${!this.active ? 'hide' : null}">
        <h2>Character Quiz</h2>
        <picker-element
          legend="Who is your favorite?"
          name="characters"
          .options="${this._characters}"
          @picker-value-changed="${this._pickerValueChanged}"
          value="${this._pickerValue}">
        </picker-element>
        <footer-element
          .backButton="${backButton}"
          .nextButton="${nextButton}">
        </footer-element>
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
