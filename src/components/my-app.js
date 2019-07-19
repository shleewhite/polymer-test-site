/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
} from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 1rem;
        }

        [main-title] {
          font-family: 'Acme', sans-serif;
          padding: 1rem 0px 0px 1rem;
          margin: 0rem;
          font-size: 1.5rem;
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
          padding: 1rem;
        }

        [container] {
          background-color: white;
        }
      `
    ];
  }

  render() {
    return html`
      <div container>
        <h1 main-title>${this.appTitle}</h1>
        <main>
          <home-view ?active="${this._page === 'home-view'}"></home-view>
          <my-view404 ?active="${this._page === 'view404'}"></my-view404>
        </main>
      </div>
    `;
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
  }
}

window.customElements.define('my-app', MyApp);
