import { LitElement, html, css } from 'lit-element';

class ButtonElement extends LitElement {
  static get properties() {
    return {
      disabled: { type: Boolean },
      label: { type: String },
      handleClick: { type: Function },
      id: { type: String },
      handleKeyPress: { type: Function },
      focus: { type: Boolean },
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        div {
          display: flex;
          justify-content: space-between;
        }
      
        button {
          display: inline-block;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0;
          text-decoration: none;
          cursor: pointer;
          text-align: center;
          transition: background 250ms ease-in-out, 
                      transform 150ms ease;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: #FFCF40;
          vertical-align: middle;
        }

        button:focus {
          background: #ffb800;
          outline-offset: 0.1rem;
          outline: 3px solid #01295f;
        }
      `
    ]
  }

  constructor() {
    super();
    this.focus = false;
  }

  render() {
    return html`
      ${this.disabled ?
        html`<button disabled>${this.label}</button>` :
        html`<button @click=${this.handleClick}" .id="${this.id}" @keydown=${this.handleKeyPress}>${this.label}</button>`
      }
    `;
  }

  updated(changedProps) {
    // console.log('changed', changedProps)
    // if (changedProps.has('focus') && !changedProps.focus) {
    //   console.log(changedProps.focus)
    //   this.shadowRoot.querySelector('button').focus();
    //   changedProps.focus = !changedProps.focus;
    // }
  }
}

window.customElements.define('button-element', ButtonElement);
