import dtrtValidate from 'dtrt-type-validate';

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
   * readyHandler
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
   * element
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
   * selector
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
   * @param {object} event - Custom event
   * @memberof FmcCropperImgUi
   */
  handleUpdate(event) {
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
      this.element.removeListener('ready', instance[method].bind(instance));
    }
  }
}
