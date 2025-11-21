import dtrtValidate from 'dtrt-type-validate';

export class FmcSelectUi {
  /**
   * @class FmcSelectUi
   * @summary Manages UI select menus
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      changeHandler = [],
      selector,
      updateListener = ''
    } = config;

    Object.assign(this, {
      changeHandler,
      selector,
      updateListener
    });

    if (this.changeHandler.length) {
      const [ instance, method ] = this.changeHandler;

      this.element.addEventListener('change', instance[method].bind(instance));
    }
  }

  /* Getters and Setters */

  /**
   * changeHandler
   * @type {Array}
   * @memberof FmcSelectUi
   */
  get changeHandler() {
    return this._changeHandler;
  }

  set changeHandler(changeHandler) {
    this._changeHandler = dtrtValidate.validate(changeHandler, 'array', 'FmcSelectUi.changeHandler');
  }

  /**
   * element
   * @type {object}
   * @memberof FmcSelectUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcSelectUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcSelectUi.selector');
  }

  /**
   * updateListener
   * @type {string}
   * @memberof FmcSelectUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcSelectUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function enable
   * @memberof FmcSelectUi
   */
  enable() {
    this.element.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcSelectUi
   */
  disable() {
    this.element.setAttribute('disabled', '');
  }
}
