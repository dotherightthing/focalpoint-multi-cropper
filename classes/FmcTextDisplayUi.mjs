import dtrtValidate from 'dtrt-type-validate';

export class FmcTextDisplayUi {
  /**
   * @class FmcTextDisplayUi
   * @summary Manages UI text display fields (span/div/hx with dynamic text inside)
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selector,
      updateListener = ''
    } = config;

    Object.assign(this, {
      selector,
      updateListener
    });
  }

  /* Getters and Setters */

  /**
   * element
   * @type {object}
   * @memberof FmcTextDisplayUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcTextDisplayUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcTextDisplayUi.selector');
  }

  /**
   * updateListener
   * @type {string}
   * @memberof FmcTextDisplayUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcTextDisplayUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function handleUpdate
   * @param {object} event - Custom event
   * @memberof FmcTextDisplayUi
   */
  handleUpdate(event) {
    const {
      detail = {}
    } = event;

    const {
      value
    } = detail;

    this.element.innerText = value;
  }
}
