import dtrtValidate from 'dtrt-type-validate';

export class FmcDialogUi {
  /**
   * @class FmcDialogUi
   * @summary Manages UI dialogs
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selector
    } = config;

    Object.assign(this, {
      selector
    });
  }

  /* Getters and Setters */

  /**
   * element
   * @type {object}
   * @memberof FmcDialogUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcDialogUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcDialogUi.selector');
  }

  /* Instance methods */

  open() {}

  close() {}
}
