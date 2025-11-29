import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

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
      element: document.querySelector(selector),
      selector,
      updateListener
    });

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * element
   * @summary Text display element
   * @type {HTMLElement}
   * @memberof FmcTextDisplayUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcTextDisplayUi.element');
  }

  /**
   * selector
   * @summary DOM selector
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
   * @summary Custom event to listen for, before responding with handleUpdate
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
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcTextDisplayUi
   */
  handleUpdate(event) {
    FmcUi.log(`👂🏽 Custom event "${this.updateListener}" handled by FmcTextDisplayUi.handleUpdate`);
    const {
      detail = {}
    } = event;

    const {
      value
    } = detail;

    this.element.innerText = value;
  }
}
