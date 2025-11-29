import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcCropperImgUi {
  /**
   * @class FmcCropperImgUi
   * @summary Manages UI cropper (see also FmcCroppersUi)
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      readyHandler,
      selector,
      updateListener = ''
    } = config;

    Object.assign(this, {
      readyHandler,
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
   * @summary Image element within the (last) cropper
   * @type {HTMLElement}
   * @memberof FmcCropperImgUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcCropperImgUi.element');
  }

  /**
   * readyHandler
   * @summary Function to run after cropperjs fires a "ready" event for the (last) cropper image - each time an image is loaded into the cropper
   * @type {Array}
   * @memberof FmcCropperImgUi
   */
  get readyHandler() {
    return this._readyHandler;
  }

  set readyHandler(readyHandler) {
    this._readyHandler = dtrtValidate.validate(readyHandler, 'array', 'FmcCropperImgUi.readyHandler');
  }

  /**
   * selector
   * @summary DOM selector
   * @type {string}
   * @memberof FmcCropperImgUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcCropperImgUi.selector');
  }

  /**
   * updateListener
   * @summary Custom event to listen for, before responding with handleUpdate
   * @type {string}
   * @memberof FmcCropperImgUi
   */
  get updateListener() {
    return this._updateListener;
  }

  set updateListener(updateListener) {
    this._updateListener = dtrtValidate.validate(updateListener, 'string', 'FmcCropperImgUi.updateListener');
  }

  /* Instance methods */

  /**
   * @function handleUpdate
   * @summary Respond to an emitted custom event which matches this.updateListener
   * @param {object} event - Custom event which matches this.updateListener
   * @memberof FmcCropperImgUi
   */
  handleUpdate(event) {
    FmcUi.log(`👂🏽 Custom event "${this.updateListener}" handled by FmcCropperImgUi.handleUpdate`);
    const [ instance, method ] = this.readyHandler;

    const {
      detail = {}
    } = event;

    const {
      addListener = false,
      removeListener = false
    } = detail;

    if (addListener) {
      this.element.addEventListener('ready', instance[method].bind(instance));
    } else if (removeListener) {
      this.element.removeEventListener('ready', instance[method].bind(instance));
    }
  }
}
