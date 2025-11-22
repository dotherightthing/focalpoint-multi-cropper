import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcButtonUi {
  /**
   * @class FmcButtonUi
   * @summary Manages UI buttons
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      clickHandler,
      selector,
      updateListener = ''
    } = config;

    Object.assign(this, {
      clickHandler,
      element: document.querySelector(selector),
      selector,
      updateListener
    });

    if (this.clickHandler) {
      const [ instance, method ] = this.clickHandler;

      this.element.addEventListener('click', instance[method].bind(instance));
    }

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * clickHandler
   * @type {Array}
   * @memberof FmcButtonUi
   */
  get clickHandler() {
    return this._clickHandler;
  }

  set clickHandler(clickHandler) {
    this._clickHandler = dtrtValidate.validate(clickHandler, 'array', 'FmcButtonUi.clickHandler');
  }

  /**
   * element
   * @type {HTMLElement}
   * @memberof FmcButtonUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcButtonUi.element');
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcButtonUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcButtonUi.selector');
  }

  /**
   * updateListener
   * @type {string}
   * @memberof FmcButtonUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcButtonUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function handleUpdate
   * @param {object} event - Custom event
   * @memberof FmcButtonUi
   */
  handleUpdate(event) {
    const {
      detail = {}
    } = event;

    const {
      value
    } = detail;

    if (value.length) {
      this.enable(value);
    } else {
      this.disable();
    }
  }

  /**
   * @function enable
   * @param {string} value - Value
   * @memberof FmcButtonUi
   */
  enable(value) {
    this.element.dataset.href = value;
    this.element.setAttribute('title', value);
    this.element.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcButtonUi
   */
  disable() {
    this.element.dataset.href = '#';
    this.element.removeAttribute('title');
    this.element.setAttribute('disabled', '');
  }

  /**
   * @function handleCopyPath
   * @summary Copy the element's title to the clipboard
   * @param {object} event - Click event
   * @memberof FmcButtonUi
   * @static
   * @todo Why is title used rather than data-title or better still data-path?
   */
  static handleCopyPath(event) {
    event.preventDefault();

    if (typeof window.electronAPI === 'undefined') {
      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'Error: Clipboard operations require Electron',
        statusType: 'warning'
      });

      return;
    }

    const eventTarget = FmcUi.getTargetElementOfType(event, 'button');

    if (eventTarget) {
      const title = eventTarget.getAttribute('title');

      if (title) {
        window.electronAPI.copyToClipboard({
          text: title
        });

        FmcUi.emitElementEvent(window, 'updateStatus', {
          statusMessage: 'Value copied to clipboard',
          statusType: 'success'
        });
      }
    }
  }

  /**
   * @function handleLinkToPath
   * @summary Open the element's data-href in Finder
   * @param {object} event - Click event
   * @memberof FmcButtonUi
   * @static
   */
  static async handleLinkToPath(event) {
    event.preventDefault();

    if (typeof window.electronAPI === 'undefined') {
      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'Error: Finder links require Electron',
        statusType: 'warning'
      });

      return;
    }

    const eventTarget = FmcUi.getTargetElementOfType(event, 'button');

    if (eventTarget) {
      const { href } = eventTarget.dataset;

      if (href && (href !== '#')) {
        window.electronAPI.openInFinder({
          href
        });
      }
    }
  }
}
