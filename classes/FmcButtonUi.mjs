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
      clickEventHandler,
      selector,
      updateEventName = ''
    } = config;

    Object.assign(this, {
      clickEventHandler,
      selector,
      updateEventName
    });

    if (this.clickEventHandler) {
      const [ instance, method ] = this.clickEventHandler;

      this.element.addEventListener('click', instance[method].bind(instance));
    }

    if (this.updateEventName !== '') {
      window.addEventListener(this.updateEventName, this.handleUpdateEvent.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * clickEventHandler
   * @type {Array}
   * @memberof FmcButtonUi
   */
  get clickEventHandler() {
    return this._clickEventHandler;
  }

  set clickEventHandler(clickEventHandler) {
    this._clickEventHandler = dtrtValidate.validate(clickEventHandler, 'array', 'FmcButtonUi.clickEventHandler');
  }

  /**
   * element
   * @type {object}
   * @memberof FmcButtonUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
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
   * updateEventName
   * @type {string}
   * @memberof FmcButtonUi
   */
  get updateEventName() {
    return this._updateEventName;
  }

  set updateEventName(updateEventName) {
    this._updateEventName = dtrtValidate.validate(updateEventName, 'string', 'FmcButtonUi.updateEventName');
  }

  /* Instance methods */

  /**
   * @function handleUpdateEvent
   * @param {object} event - Custom event
   * @memberof FmcButtonUi
   */
  handleUpdateEvent(event) {
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
      FmcUi.emitElementEvent(window, 'message', {
        msg: 'Error: Clipboard operations require Electron',
        type: 'warning'
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

        FmcUi.emitElementEvent(window, 'message', {
          msg: 'Value copied to clipboard',
          type: 'success'
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
      FmcUi.emitElementEvent(window, 'message', {
        msg: 'Error: Finder links require Electron',
        type: 'warning'
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
