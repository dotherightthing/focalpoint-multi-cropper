import dtrtValidate from 'dtrt-type-validate';

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
      changeEventHandler = [],
      selector,
      updateEventName = ''
    } = config;

    Object.assign(this, {
      changeEventHandler,
      selector,
      updateEventName
    });

    if (this.changeEventHandler.length) {
      const [ instance, method ] = this.changeEventHandler;

      this.element.addEventListener('change', instance[method].bind(instance));
    }
  }

  /* Getters and Setters */

  /**
   * changeEventHandler
   * @type {Function}
   * @memberof FmcTextfieldUi
   */
  get changeEventHandler() {
    return this._changeEventHandler;
  }

  set changeEventHandler(changeEventHandler) {
    this._changeEventHandler = dtrtValidate.validate(changeEventHandler, 'array', 'FmcTextfieldUi.changeEventHandler');
  }

  /**
   * element
   * @type {object}
   * @memberof FmcTextfieldUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {object}
   * @memberof FmcTextfieldUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcTextfieldUi.selector');
  }

  /**
   * updateEventName
   * @type {string}
   * @memberof FmcTextfieldUi
   */
  get updateEventName() {
    return this._updateEventName;
  }

  set updateEventName(updateEventName) {
    this._updateEventName = dtrtValidate.validate(updateEventName, 'string', 'FmcTextfieldUi.updateEventName');
  }

  /* Instance methods */

  /**
   * @function handleUpdateEvent
   * @param {object} event - Custom event
   * @memberof FmcTextfieldUi
   */
  handleUpdateEvent(event) {
    const {
      detail = {}
    } = event;

    const {
      href = '',
      title = ''
    } = detail;

    this.element.dataset.href = href;

    if (title !== '') {
      this.enable({ title });
    } else {
      this.disable();
    }
  }

  /**
   * @function enable
   * @param {object} attrs - Attributes
   * @param {string} attrs.href - href attribute
   * @param {string} attrs.title - title attribute
   * @memberof FmcTextfieldUi
   */
  enable(attrs) {
    const {
      href,
      title
    } = attrs;

    if (href) {
      this.element.dataset.href = href;
    }

    if (title) {
      this.element.dataset.title = title;
      this.element.setAttribute('title', title);
    } else if (this.element.dataset.title) {
      this.element.setAttribute('title', this.element.dataset.title);
    }

    this.element.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcTextfieldUi
   */
  disable() {
    this.element.removeAttribute('title');
    this.element.setAttribute('disabled', '');
  }
}
