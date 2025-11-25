import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcRadiosUi {
  /**
   * @class FmcRadiosUi
   * @summary Manages UI radio button pairs
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      changeHandler,
      selector,
      updateListener
    } = config;

    Object.assign(this, {
      changeHandler,
      elements: document.querySelectorAll(selector),
      selector,
      updateListener
    });

    if (this.changeHandler) {
      const [ instance, method ] = this.changeHandler;

      this.elements.forEach(el => el.addEventListener('change', instance[method].bind(instance)));
    }

    if (this.updateListener !== '') {
      window.addEventListener(this.updateListener, this.handleUpdate.bind(this));
    }
  }

  /* Getters and Setters */

  /**
   * changeHandler
   * @type {Array}
   * @memberof FmcRadiosUi
   */
  get changeHandler() {
    return this._changeHandler;
  }

  set changeHandler(changeHandler) {
    this._changeHandler = dtrtValidate.validate(changeHandler, 'array', 'FmcRadiosUi.changeHandler');
  }

  /**
   * elements
   * @type {*}
   * @memberof FmcButtonUi
   * @todo Validation
   */
  get elements() {
    return this._elements;
  }

  set elements(elements) {
    this._elements = elements;
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcRadiosUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcRadiosUi.selector');
  }

  /* Instance methods */

  /**
   * @function getState
   * @returns {boolean} state
   * @memberof FmcRadiosUi
   */
  getState() {
    const state = [ ...this.elements ].filter(radio => radio.checked)[0].value;

    return state;
  }

  /**
   * @function setState
   * @summary Turn on or off
   * @param {string} state - on|off
   * @returns {HTMLElement} checkedRadio
   * @memberof FmcRadiosUi
   */
  setState(state) {
    let checkedRadio = null;

    this.elements.forEach(radio => {
      radio.checked = (radio.value === state);

      if (radio.value === state) {
        checkedRadio = radio;
      }
    });

    return checkedRadio;
  }

  /**
   * @function handleUpdate
   * @param {object} event - Custom event
   * @memberof FmcButtonUi
   */
  handleUpdate(event) {
    console.log('# X.X - EXEC handleUpdate');
    const {
      detail = {}
    } = event;

    const {
      value
    } = detail;

    this.setState(value);

    FmcUi.emitElementEvent(this.element, 'change');
  }
}
