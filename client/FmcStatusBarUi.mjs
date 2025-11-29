import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcStatusBarUi {
  /**
   * @class FmcStatusBarUi
   * @summary Manages UI status bar
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selector,
      statusTypes = [ 'info', 'success', 'warning' ],
      updateListener = ''
    } = config;

    Object.assign(this, {
      element: document.querySelector(selector),
      selector,
      statusTypes,
      updateListener
    });

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * element
   * @summary The status bar container element
   * @type {HTMLElement}
   * @memberof FmcStatusBarUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcStatusBarUi.element');
  }

  /**
   * statusMessageElement
   * @summary The status bar element which displays messages
   * @type {HTMLElement}
   * @memberof FmcStatusBarUi
   */
  get statusMessageElement() {
    return document.querySelector(`${this.selector}-msg`);
  }

  /**
   * statusTypeElement
   * @summary The status bar element which displays the message type
   * @type {HTMLElement}
   * @memberof FmcStatusBarUi
   */
  get statusTypeElement() {
    return document.querySelector(`${this.selector}-msg-type`);
  }

  /**
   * selector
   * @summary DOM selector
   * @type {string}
   * @memberof FmcStatusBarUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcStatusBarUi.selector');
  }

  /**
   * statusTypes
   * @summary Types of status messages
   * @type {Array}
   * @memberof FmcStatusBarUi
   */
  get statusTypes() {
    return this._statusTypes;
  }

  set statusTypes(statusTypes) {
    this._statusTypes = dtrtValidate.validate(statusTypes, 'array', 'FmcStatusBarUi.statusTypes');
  }

  /**
   * updateListener
   * @summary Custom event to listen for, before responding with handleUpdate
   * @type {string}
   * @memberof FmcStatusBarUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcStatusBarUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function handleUpdate
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcStatusBarUi
   * @see {link https://www.macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous}
   * @see {link https://stackoverflow.com/a/65144294}
   */
  async handleUpdate(event) {
    FmcUi.log(`👂🏽 Custom event "${this.updateListener}" handled by FmcStatusBarUi.handleUpdate`);
    const {
      statusMessageElement,
      statusTypeElement,
      statusTypes
    } = this;

    const {
      statusMessage,
      statusType = 'info' // info|success|warning
    } = event.detail;

    const statusTypeClasses = statusTypes.map(st => `msg-${st}`);

    // ensure each message is displayed
    await new Promise(resolve => {
      // fires before the next repaint (when queued UI changes are applied)
      requestAnimationFrame(() => {
        statusTypeClasses.forEach(stc => {
          statusTypeElement.classList.remove(stc);
        });
        statusTypeElement.classList.add(`msg-${statusType}`);
        statusTypeElement.textContent = statusType;
        statusMessageElement.textContent = (statusMessage !== '') ? `${statusMessage}.` : statusMessage;

        // fires before the _next_ next repaint
        // ...which is effectively _after_ the next repaint
        // i.e. when the console has been updated
        requestAnimationFrame(resolve);
      });
    });
  }
}
