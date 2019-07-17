import { LitElement, html, css } from 'lit-element';

export class FooterElement extends LitElement {
  static get properties() {
    return {
      backButton: { type: Object },
      nextButton: { type: Object }
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

  render() {
    return html`
      <div>
        ${this.backButton.disabled ?
        html`<button disabled>${this.backButton.label}</button>` :
        html`<button @click=${this.backButton.onClick}>${this.backButton.label}</button>`}
        ${this.nextButton.disabled ?
        html`<button disabled>${this.nextButton.label}</button>` :
        html`<button @click=${this.nextButton.onClick}>${this.nextButton.label}</button>`}
      </div>
    `;
  }
}

window.customElements.define('footer-element', FooterElement);
