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
      element: document.querySelector(selector),
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

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
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
   * @type {HTMLElement}
   * @memberof FmcTextfieldUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcTextfieldUi.element');
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

    this.element.value = value;

    // fire 'change' event so that change is picked up by listener
    FmcUi.emitElementEvent(this.element, 'change'); // for both X and Y
  }
}
