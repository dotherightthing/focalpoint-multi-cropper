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
   * @summary Function to run when text is added or removed from the textfield
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
   * @summary Textfield element
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
   * @summary DOM selector
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
   * @summary Custom event to listen for, before responding with handleUpdate
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
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcTextfieldUi
   */
  handleUpdate(event) {
    FmcUi.log(`👂🏽 Custom event "${this.updateListener}" handled by FmcTextfieldUi.handleUpdate`);
    const {
      detail = {}
    } = event;

    const {
      targetFile, // for Finder browse
      targetFolder, // for Finder browse
      value
    } = detail;

    const {
      element
    } = this;

    if (targetFile) {
      element.dataset.targetFile = targetFile;
    }

    if (targetFolder) {
      element.dataset.targetFolder = targetFolder;
    }

    if (typeof value !== 'undefined') {
      element.value = value;
    }

    // fire 'change' event so that change is picked up by listener
    FmcUi.emitElementEvent('FmcTextfieldUi.handleUpdate', element, 'change');
  }
}
