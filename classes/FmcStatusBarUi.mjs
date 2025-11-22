import dtrtValidate from 'dtrt-type-validate';

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
   * @type {object}
   * @memberof FmcStatusBarUi
   */
  get element() {
    return document.querySelector(this.selector);
  }

  /**
   * statusMessageElement
   * @type {string}
   * @memberof FmcStatusBarUi
   */
  get statusMessageElement() {
    return document.querySelector(`${this.selector}-msg`);
  }

  /**
   * statusTypeElement
   * @type {string}
   * @memberof FmcStatusBarUi
   */
  get statusTypeElement() {
    return document.querySelector(`${this.selector}-msg-type`);
  }

  /**
   * selector
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
   * @type {string}
   * @memberof FmcButtonUi
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
   * @param {object} event - Message event
   * @memberof FmcStatusBarUi
   * @see {link https://www.macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous}
   * @see {link https://stackoverflow.com/a/65144294}
   */
  async handleUpdate(event) {
    const {
      statusMessageElement,
      statusTypeElement,
      statusTypes
    } = this;

    const {
      statusMessage,
      statusType = 'message' // message|success|warning
    } = event.detail;

    const statusTypeClasses = statusTypes.map(st => `msg-${st}`).join('","');

    // ensure each message is displayed
    await new Promise(resolve => {
      // fires before the next repaint (when queued UI changes are applied)
      requestAnimationFrame(() => {
        statusTypeElement.classList.remove(statusTypeClasses);
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
