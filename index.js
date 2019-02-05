window.onload = function () {
  document.getElementById('component-form').addEventListener('submit', e => {
    e.preventDefault();
    const tagEl = e.currentTarget.querySelector('#tag-name');
    const tempEl = e.currentTarget.querySelector('#template');
    const styleEl = e.currentTarget.querySelector('#styles');

    const tagName = tagEl.value
    const template = tempEl.value
    const styles = styleEl.value

    // combine styles into template
    const templateTag = document.createElement('template');
    templateTag.innerHTML = template;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    templateTag.content.appendChild(styleTag);

    // subclass HTMLElement
    const Cls = class extends HTMLElement {
      constructor() {
        super();

        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        this.shadowRoot.appendChild(templateTag.content.cloneNode(true));
      }
    }

    // create custom element
    window.customElements.define(tagName, Cls);

    // clear fields
    tagEl.value = '';
    tempEl.value = '';
    styleEl.value = '';

    // append one to the sandbox
    const el = document.createElement(tagName);
    document.getElementById('sandbox').appendChild(el);
  });
}
