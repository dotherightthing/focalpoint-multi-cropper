import dtrtValidate from 'dtrt-type-validate';

export class FmcTextDisplayUi {
  /**
   * @class FmcTextDisplayUi
   * @summary Manages UI text display fields (span/div/hx with dynamic text inside)
   * @param {object} config - Instance config
   * @public
   * @todo Finish integration
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selector,
      updateEventName = ''
    } = config;

    Object.assign(this, {
      selector,
      updateEventName
    });
  }

  /* Getters and Setters */

  /**
   * element
   * @type {object}
   * @memberof FmcTextDisplayUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * selector
   * @type {object}
   * @memberof FmcTextDisplayUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcTextDisplayUi.selector');
  }

  /**
   * updateEventName
   * @type {string}
   * @memberof FmcTextDisplayUi
   */
  get updateEventName() {
    return this._updateEventName;
  }

  set updateEventName(updateEventName) {
    this._updateEventName = dtrtValidate.validate(updateEventName, 'string', 'FmcTextDisplayUi.updateEventName');
  }

  /* Instance methods */

  /**
   * @function handleUpdateEvent
   * @param {object} event - Custom event
   * @memberof FmcTextDisplayUi
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
}
