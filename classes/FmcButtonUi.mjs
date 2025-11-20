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
   * @type {Function}
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
   * @type {object}
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
      href = '',
      title = ''
    } = detail;

    this.element.dataset.href = href;

    if (title !== '') {
      this.enable({ title });
    } else {
      this.disable();
    }
  }

  /**
   * @function enable
   * @param {object} attrs - Attributes
   * @param {string} attrs.href - href attribute
   * @param {string} attrs.title - title attribute
   * @memberof FmcButtonUi
   */
  enable(attrs) {
    const {
      href,
      title
    } = attrs;

    if (href) {
      this.element.dataset.href = href;
    }

    if (title) {
      this.element.dataset.title = title;
      this.element.setAttribute('title', title);
    } else if (this.element.dataset.title) {
      this.element.setAttribute('title', this.element.dataset.title);
    }

    this.element.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcButtonUi
   */
  disable() {
    this.element.removeAttribute('title');
    this.element.setAttribute('disabled', '');
  }

  /**
   * @function handleCopyPath
   * @param {object} event - Click event
   * @memberof FmcButtonUi
   * @static
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
