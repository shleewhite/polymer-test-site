/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../../store.js';
import picker from '../../reducers/picker.js';

store.addReducers({
  picker
});

class MyView2 extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _pickerValue: { type: Number }
    };
  }

  // static get styles() {
  //   return [
  //     SharedStyles
  //   ];
  // }

  render() {
    return html`
      <section>
        <h2>Redux example: simple counter</h2>
        
      </section>
    `;
  }

  // constructor() {
  //   super();

  // }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    console.log(state)
    //   this._clicks = state.counter.clicks;
    //   this._value = state.counter.value;
  }
}

window.customElements.define('results-view', MyView2);
