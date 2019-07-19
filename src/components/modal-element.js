import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

import { toggleModal, addCharacter } from '../actions/app.js'

import './button-element';

class ModalElement extends connect(store)(LitElement) {
  static get styles() {
    return css`
      .flex {
        display: flex;
        justify-content: space-between;
      }

      .form-element {
        margin-bottom: 1rem;
        font-size: 0.75rem;
      }
      .form-element:last-of-type {
        margin-bottom: 0rem;
      }
    `
  }

  render() {
    return html`
      <link rel="stylesheet" href="./salesforce-lightning-design-system.min.css">
      <div role="dialog" aria-modal="true" aria-labelledby="mdl-head" class="slds-modal slds-fade-in-open">
        <div class="slds-modal__container">
          <header class="slds-modal__header">
            <h2 id="mdl-head" class="slds-text-heading_medium slds-hyphenate">Add a new character</h2>
          </header>
          <div class="slds-modal__content slds-p-around_medium">
            <div class="form-element">  
              <label for="label">Character Name</label>
              <input @keydown=${this._handleWrap} id="label" type="text"/>
            </div>
            <div class="form-element">  
              <label for="value">API Name</label>
              <input id="value" type="text"/>
            </div>
            <div class="form-element">
              <label for="ddescriptionesc">Description</label>
              <input id="description" type="text"/>
            </div>
            <div class="form-element">
              <label for="image">Image URL</label>
              <input id="image" type="text"/>
            </div>
            <div class="form-element">
              <label for="alt">Image Alt Text</label>
              <input id="alt" type="text"/>
            </div>
          </div>
          <footer class="slds-modal__footer flex">
            <button-element
              .handleClick=${this._handleClose.bind(this)}
              label="Cancel">
            </button-element>
            <button-element 
              .handleKeyPress=${this._handleWrap.bind(this)} 
              .handleClick=${this._handleAdd.bind(this)}
              id="add-btn" 
              label="Add">
            </button-element>
          </footer
        </div>  
      </div>
    `;
  }

  firstUpdated() {
    this.shadowRoot.querySelectorAll('input')[0].focus();
  }

  _handleWrap(e) {
    if (e.key === 'Tab') {
      if (e.target.id === 'add-btn' && !e.shiftKey) {
        e.preventDefault();
        let nameInput = this.shadowRoot.querySelectorAll('input')[0];
        nameInput.focus();
      } else if (e.target.id === 'label' && e.shiftKey) {
        e.preventDefault();
        let addBtn = this.shadowRoot.querySelectorAll('button-element')[1];
        addBtn.shadowRoot.querySelector('button').focus();
      }
    }
  }

  _handleAdd() {
    let newCharacter = { custom: true };
    let inputs = [...this.shadowRoot.querySelectorAll('input')];
    inputs.map((input) => (newCharacter[`${input.id}`] = input.value));

    store.dispatch(addCharacter(newCharacter));
    store.dispatch(toggleModal());
  }

  _handleClose() {
    store.dispatch(toggleModal());
  }
}

window.customElements.define('modal-element', ModalElement);