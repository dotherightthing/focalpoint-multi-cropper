import dtrtValidate from 'dtrt-type-validate';

export class FmcDialogUi {
  /**
   * @class FmcDialogUi
   * @summary Manages UI dialogs
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      appendedSelector,
      openHandler,
      selector
    } = config;

    Object.assign(this, {
      appendedElement: document.querySelector(appendedSelector),
      appendedSelector,
      closerElement: document.querySelector(`${selector}-close`),
      element: document.querySelector(selector),
      openerElement: document.querySelector(`${selector}-open`),
      openHandler,
      selector
    });

    this.closerElement.addEventListener('click', this.close.bind(this));
    this.openerElement.addEventListener('click', this.open.bind(this));

    if (this.openHandler) {
      const [ instance, method ] = this.openHandler;

      this.openerElement.addEventListener('click', instance[method].bind(instance));
    }
  }

  /* Getters and Setters */

  /**
   * appendedElement
   * @type {HTMLElement}
   * @memberof FmcDialogUi
   */
  get appendedElement() {
    return this._appendedElement;
  }

  set appendedElement(appendedElement) {
    this._appendedElement = dtrtValidate.validate(appendedElement, 'htmlelement', 'FmcDialogUi.appendedElement');
  }

  /**
   * appendedSelector
   * @summary Selector of element to append to dialog when open
   * @type {string}
   * @memberof FmcDialogUi
   */
  get appendedSelector() {
    return this._appendedSelector;
  }

  set appendedSelector(appendedSelector) {
    this._appendedSelector = dtrtValidate.validate(appendedSelector, 'string', 'FmcDialogUi.appendedSelector');
  }

  /**
   * closerElement
   * @type {HTMLElement}
   * @memberof FmcDialogUi
   */
  get closerElement() {
    return this._closerElement;
  }

  set closerElement(closerElement) {
    this._closerElement = dtrtValidate.validate(closerElement, 'htmlelement', 'FmcDialogUi.closerElement');
  }

  /**
   * element
   * @type {HTMLElement}
   * @memberof FmcDialogUi
   */
  get element() {
    return this._element;
  }

  set element(element) {
    this._element = dtrtValidate.validate(element, 'htmlelement', 'FmcDialogUi.element');
  }

  /**
   * openerElement
   * @type {HTMLElement}
   * @memberof FmcDialogUi
   */
  get openerElement() {
    return this._openerElement;
  }

  set openerElement(openerElement) {
    this._openerElement = dtrtValidate.validate(openerElement, 'htmlelement', 'FmcDialogUi.openerElement');
  }

  /**
   * selector
   * @type {string}
   * @memberof FmcDialogUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcDialogUi.selector');
  }

  /* Instance methods */

  /**
   * @function open
   * @memberof FmcUi
   */
  async open() {
    const {
      appendedElement,
      element
    } = this;

    element.appendChild(appendedElement);
    element.showModal();
  }

  /**
   * @function close
   * @memberof FmcUi
   */
  close() {
    const {
      appendedElement,
      element
    } = this;

    document.body.appendChild(appendedElement);
    element.close();
  }
}
