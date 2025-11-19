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
      clickEventHandler,
      selector,
      updateEventName = ''
    } = config;

    Object.assign(this, {
      clickEventHandler: dtrtValidate.validate(clickEventHandler, 'function', 'FmcButtonUi.clickEventHandler'),
      selector: dtrtValidate.validate(selector, 'string', 'FmcButtonUi.selector'),
      updateEventName: dtrtValidate.validate(updateEventName, 'string', 'FmcButtonUi.updateEventName')
    });

    if (this.clickEventHandler) {
      document.addEventListener('click', this.clickEventHandler.bind(this));
    }

    if (this.updateEventName !== '') {
      window.addEventListener(this.updateEventName, this.handleUpdateEvent.bind(this));
    }
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

  /**
   * updateEventName
   * @type {string}
   * @memberof FmcButtonUi
   */
  get updateEventName() {
    return this._updateEventName;
  }

  set updateEventName(updateEventName) {
    this._updateEventName = dtrtValidate.validate(updateEventName, 'string', 'FmcButtonUi.updateEventName');
  }

  /* Instance methods */

  /**
   * @function handleUpdateEvent
   * @param {object} event - Custom event
   * @memberof FmcButtonUi
   */
  handleUpdateEvent(event) {
    const {
      detail = {}
    } = event;

    const {
      title = ''
    } = detail;

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
   * @memberof FmcButtonUi
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
   * @memberof FmcButtonUi
   */
  disable() {
    this.element.removeAttribute('title');
    this.element.setAttribute('disabled', '');
  }

  /**
   * @function handleCopyPath
   * @param {object} event - Click event
   * @memberof FmcButtonUi
   * @static
   */
  static handleCopyPath(event) {
    event.preventDefault();

    if (typeof window.electronAPI === 'undefined') {
      FmcButtonUi.emitElementEvent(window, 'message', {
        msg: 'Error: Clipboard operations require Electron',
        type: 'warning'
      });

      return;
    }

    const eventTarget = FmcButtonUi.getTargetElementOfType(event, 'button');

    if (eventTarget) {
      const title = eventTarget.getAttribute('title');

      if (title) {
        window.electronAPI.copyToClipboard({
          text: title
        });

        FmcButtonUi.emitElementEvent(window, 'message', {
          msg: 'Value copied to clipboard',
          type: 'success'
        });
      }
    }
  }

  /**
   * @function handleLinkToPath
   * @param {object} event - Click event
   * @memberof FmcButtonUi
   * @static
   */
  static async handleLinkToPath(event) {
    event.preventDefault();

    if (typeof window.electronAPI === 'undefined') {
      FmcButtonUi.emitElementEvent(window, 'message', {
        msg: 'Error: Finder links require Electron',
        type: 'warning'
      });

      return;
    }

    const eventTarget = FmcButtonUi.getTargetElementOfType(event, 'button');

    if (eventTarget) {
      const { href } = eventTarget.dataset;

      if (href && (href !== '#')) {
        window.electronAPI.openInFinder({
          href
        });
      }
    }
  }

  /**
   * @function emitElementEvent
   * @summary Emit a custom event
   * @param {HTMLElement} element - element that will dispatch the event
   * @param {string} eventName - Event names are case-sensitive
   * @param {object} eventDetail - name-value pair
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent}
   * @see {@link https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/}
   * @memberof FmcButtonUi
   * @static
   */
  static emitElementEvent(element, eventName, eventDetail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, // stop with event.stopPropagation()
      cancelable: true, // cancel with event.preventDefault()
      // composed // web components only
      detail: eventDetail
    });

    element.dispatchEvent(event);
  }

  /**
   * @function getTargetElementOfType
   * @summary Ensures that the target element matches the expected element type (rather than a child element)
   * @param {object} event - Event
   * @param {string} elementType - Element type (tagName)
   * @returns {HTMLElement} targetElement
   * @memberof FmcButtonUi
   * @static
   */
  static getTargetElementOfType(event, elementType) {
    let targetElement = event.target; // event.currentTarget

    if (targetElement) {
      while (targetElement && targetElement.tagName.toLowerCase() !== elementType) {
        targetElement = targetElement.parentElement;
      }
    }

    return targetElement;
  }
}
