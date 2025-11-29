import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

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
      element: document.querySelector(selector),
      selector,
      updateListener
    });

    if (this.changeHandler.length) {
      const [ instance, method ] = this.changeHandler;

      this.element.addEventListener('change', instance[method].bind(instance));
    }

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * changeHandler
   * @summary Function to run when an option is selected
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
   * @summary The select element
   * @type {HTMLElement}
   * @memberof FmcSelectUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcSelectUi.element');
  }

  /**
   * selector
   * @summary DOM selector
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
   * @summary Custom event to listen for, before responding with handleUpdate
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
   * @function handleUpdate
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcSelectUi
   */
  handleUpdate(event) {
    FmcUi.log(`👂🏽 Custom event "${this.updateListener}" handled by FmcSelectUi.handleUpdate`);
    const {
      detail = {}
    } = event;

    const {
      label = 'Select',
      options,
      value = 'default'
    } = detail;

    let html = `<option value="default">${label}</option>`;

    if (options) {
      html += options.map(item => `<option value="${item}">${item}</option>`).join('');

      this.element.innerHTML = html;
    }

    this.element.value = value;
  }
}
