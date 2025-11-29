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
   * @summary Function to run when a radio button is checked
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
   * @summary Radio button elements
   * @type {HTMLElement[]}
   * @memberof FmcRadiosUi
   */
  get elements() {
    return this._elements;
  }

  set elements(elements) {
    // TODO Validation
    this._elements = elements;
  }

  /**
   * selector
   * @summary DOM selector
   * @type {string}
   * @memberof FmcRadiosUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcRadiosUi.selector');
  }

  /**
   * updateListener
   * @summary Custom event to listen for, before responding with handleUpdate
   * @type {string}
   * @memberof FmcRadiosUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcButtonUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function getState
   * @summary Get the state of the radio button set by determining which one is checked
   * @returns {boolean} state
   * @memberof FmcRadiosUi
   */
  getState() {
    const state = [ ...this.elements ].filter(radio => radio.checked)[0].value;

    return state;
  }

  /**
   * @function handleUpdate
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcRadiosUi
   */
  handleUpdate(event) {
    FmcUi.log(`FmcRadiosUi.handleUpdate following "${this.updateListener}"`);
    const {
      detail = {}
    } = event;

    const {
      value
    } = detail;

    const {
      elements
    } = this;

    this.setState(value);

    const elementsArray = Array.from(elements);
    let checkedElement = elementsArray.filter(el => el.checked);

    if (!checkedElement.length) {
      checkedElement = elementsArray[0];
    }

    FmcUi.emitElementEvent(checkedElement[0], 'change');
  }

  /**
   * @function setState
   * @summary Change the state of the radio button set by checking one of the radios
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
}
