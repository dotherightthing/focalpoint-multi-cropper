import dtrtValidate from 'dtrt-type-validate';

export class FmcButtonUi {
  /**
   * @class FmcButtonUi
   * @summary Manages UI radio button pairs
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selector
    } = config;

    Object.assign(this, {
      selector
    });
  }

  /* Getters and Setters */

  /**
   * element
   * @type {object}
   * @memberof FmcButtonUi
   */
  get element() {
    this._element = document.querySelector(this.selector);

    return this._element;
  }

  /**
   * @function enable
   * @param {object} attrs - Attributes
   * @param {string} attrs.href - href attribute
   * @param {string} attrs.title - title attribute
   * @memberof FmcButtonUi
   */
  enable(attrs) {
    const el = this.element;

    const {
      href,
      title
    } = attrs;

    if (href) {
      el.dataset.href = href;
    }

    if (title) {
      el.dataset.title = title;
      el.setAttribute('title', title);
    } else if (el.dataset.title) {
      el.setAttribute('title', el.dataset.title);
    }

    el.removeAttribute('disabled');
  }

  /**
   * @function disable
   * @memberof FmcButtonUi
   */
  disable() {
    const el = this.element;

    el.removeAttribute('title');

    el.setAttribute('disabled', '');
  }

  /**
   * selector
   * @type {object}
   * @memberof FmcButtonUi
   */
  get selector() {
    return this._selector;
  }

  set selector(selector) {
    this._selector = dtrtValidate.validate(selector, 'string', 'FmcButtonUi.selector');
  }

  /* Instance methods */
}
