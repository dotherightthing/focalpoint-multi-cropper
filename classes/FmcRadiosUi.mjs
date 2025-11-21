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
      storeKey
    } = config;

    Object.assign(this, {
      changeHandler,
      selector,
      storeKey
    });

    if (this.changeHandler) {
      const [ instance, method ] = this.changeHandler;

      this.elements.forEach(el => el.addEventListener('change', instance[method].bind(instance)));
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
   * element
   * @type {object}
   * @memberof FmcRadiosUi
   */
  get elements() {
    this._elements = document.querySelectorAll(this.selector);

    return this._elements;
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

  /**
   * storeKey
   * @type {object}
   * @memberof FmcRadiosUi
   */
  get storeKey() {
    return this._storeKey;
  }

  set storeKey(storeKey) {
    this._storeKey = dtrtValidate.validate(storeKey, 'string', 'FmcRadiosUi.storeKey');
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
   * @function getStoredState
   * @returns {boolean} state
   * @memberof FmcRadiosUi
   */
  async getStoredState() {
    const keys = await window.electronAPI.getKeys({
      keys: [ this.storeKey ]
    });

    return keys[this.storeKey];
  }

  /**
   * @function setStoredState
   * @memberof FmcRadiosUi
   */
  async setStoredState() {
    const kvPair = {};

    kvPair[this.storeKey] = this.getState();

    await window.electronAPI.setKeys({
      keyValuePairs: [ kvPair ]
    });
  }

  /**
   * @function restoreStoredState
   * @summary Sync UI to stored state
   * @memberof FmcRadiosUi
   */
  async restoreStoredState() {
    const storedState = await this.getStoredState();
    const checkedRadio = this.setState(storedState);
    const waitForFmcCroppersUiInstance = 2000;

    if (storedState === 'on') {
      setTimeout(() => {
        FmcUi.emitElementEvent(checkedRadio, 'change');
      }, waitForFmcCroppersUiInstance);
    }
  }
}
