import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcTextfieldUi {
  /**
   * @class FmcTextfieldUi
   * @summary Manages UI textfields
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
      const [ instance, method, debounceDelayMs ] = this.changeHandler;

      if (debounceDelayMs) {
        this.element.addEventListener('change', FmcUi.debounce(instance[method].bind(instance), debounceDelayMs));
      } else {
        this.element.addEventListener('change', instance[method].bind(instance));
      }
    }
  }

  /* Getters and Setters */

  /**
   * changeHandler
   * @type {Array}
   * @memberof FmcTextfieldUi
   */
  get changeHandler() {
    return this._changeHandler;
  }

  set changeHandler(changeHandler) {
    this._changeHandler = dtrtValidate.validate(changeHandler, 'array', 'FmcTextfieldUi.changeHandler');
  }

  /**
   * element
   * @type {object}
   * @memberof FmcTextfieldUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcTextfieldUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcTextfieldUi.selector');
  }

  /**
   * updateListener
   * @type {string}
   * @memberof FmcTextfieldUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcTextfieldUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function handleUpdate
   * @param {object} event - Custom event
   * @memberof FmcTextfieldUi
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
   * @memberof FmcTextfieldUi
   */
  enable(value) {
    this.element.dataset.href = value;
    this.element.setAttribute('title', value);
    this.element.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcTextfieldUi
   */
  disable() {
    this.element.dataset.href = '#';
    this.element.removeAttribute('title');
    this.element.setAttribute('disabled', '');
  }
}
