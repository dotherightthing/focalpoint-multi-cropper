import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

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
   * @summary Element to append to the dialog when it is opened, and to document.body when it is closed
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
   * @summary Selector of the element to append to the dialog when it is opened, and to document.body when it is closed
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
   * @summary Element (button) which closes the dialog
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
   * @summary The dialog element
   * @type {HTMLDialogElement}
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
   * @summary Element (button) which opens the dialog
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
   * openHandler
   * @summary Function to run when the dialog is opened
   * @type {Array}
   * @memberof FmcDialogUi
   */
  get openHandler() {
    return this._openHandler;
  }

  set openHandler(openHandler) {
    // FIXME Error: FmcDialogUi.openHandler must be an array, not an undefined
    // this._openHandler = dtrtValidate.validate(openHandler, 'array', 'FmcDialogUi.openHandler');
    this._openHandler = openHandler;
  }

  /**
   * selector
   * @summary DOM selector
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
   * @summary Open the dialog
   * @memberof FmcUi
   */
  async open() {
    const {
      appendedElement,
      element
    } = this;

    element.appendChild(appendedElement);
    element.showModal();

    const msgObj = {
      statusMessage: '',
      statusType: ''
    };

    FmcUi.emitElementEvent('FmcUi.open', window, 'updateStatus', msgObj);
  }

  /**
   * @function close
   * @summary Close the dialog
   * @memberof FmcUi
   */
  close() {
    const {
      appendedElement,
      element
    } = this;

    document.body.appendChild(appendedElement);
    element.close();

    const msgObj = {
      statusMessage: '',
      statusType: ''
    };

    FmcUi.emitElementEvent('FmcUi.close', window, 'updateStatus', msgObj);
  }
}
