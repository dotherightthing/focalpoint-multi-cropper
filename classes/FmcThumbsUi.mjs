/**
 * @file FmcThumbsUi.js
 */

import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcThumbsUi { // eslint-disable-line no-unused-vars
  /**
   * @class FmcThumbsUi
   * @summary Manages thumbs component
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      hideClass,
      selectedClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbImgWrapperClass,
      thumbMetaClass,
      thumbsCountId,
      thumbsId
    } = config;

    Object.assign(this, {
      hideClass,
      selectedClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbImgWrapperClass,
      thumbMetaClass,
      thumbsCountId,
      thumbsId
    });
  }

  /* Getters and Setters */

  /**
   * hideClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get hideClass() {
    return this._hideClass;
  }

  set hideClass(hideClass) {
    this._hideClass = dtrtValidate.validate(hideClass, 'string', 'FmcThumbsUi.hideClass');
  }

  /**
   * selectedClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get selectedClass() {
    return this._selectedClass;
  }

  set selectedClass(selectedClass) {
    this._selectedClass = dtrtValidate.validate(selectedClass, 'string', 'FmcThumbsUi.selectedClass');
  }

  /**
   * thumbButtonClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbButtonClass() {
    return this._thumbButtonClass;
  }

  set thumbButtonClass(thumbButtonClass) {
    this._thumbButtonClass = dtrtValidate.validate(thumbButtonClass, 'string', 'FmcThumbsUi.thumbButtonClass');
  }

  /**
   * thumbClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbClass() {
    return this._thumbClass;
  }

  set thumbClass(thumbClass) {
    this._thumbClass = dtrtValidate.validate(thumbClass, 'string', 'FmcThumbsUi.thumbClass');
  }

  /**
   * thumbImgClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbImgClass() {
    return this._thumbImgClass;
  }

  set thumbImgClass(thumbImgClass) {
    this._thumbImgClass = dtrtValidate.validate(thumbImgClass, 'string', 'FmcThumbsUi.thumbImgClass');
  }

  /**
   * thumbImgWrapperClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbImgWrapperClass() {
    return this._thumbImgWrapperClass;
  }

  set thumbImgWrapperClass(thumbImgWrapperClass) {
    this._thumbImgWrapperClass = dtrtValidate.validate(thumbImgWrapperClass, 'string', 'FmcThumbsUi.thumbImgWrapperClass');
  }

  /**
   * thumbMetaClass
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbMetaClass() {
    return this._thumbMetaClass;
  }

  set thumbMetaClass(thumbMetaClass) {
    this._thumbMetaClass = dtrtValidate.validate(thumbMetaClass, 'string', 'FmcThumbsUi.thumbMetaClass');
  }

  /**
   * thumbsCountId
   * @type {string}
   * @memberof FmcThumbsUi
   */
  get thumbsCountId() {
    return this._thumbsCountId;
  }

  set thumbsCountId(thumbsCountId) {
    this._thumbsCountId = dtrtValidate.validate(thumbsCountId, 'string', 'FmcThumbsUi.thumbsCountId');
  }

  /* Instance methods */

  /**
   * @function applySelectedClass
   * @summary Apply the 'selected' class to the selected thumb
   * @param {HTMLElement} target - Selected thumb
   * @memberof FmcThumbsUi
   */
  applySelectedClass(target) {
    const { selectedClass } = this;

    this.removeSelectedClass();

    target.classList.add(selectedClass);
  }

  /**
   * @function changeSelectedImageSrc
   * @param {string} src - New src
   */
  changeSelectedImageSrc(src) {
    const { selectedClass } = this;

    document.querySelector(`.${selectedClass} img`).setAttribute('src', src);
  }

  /**
   * @function setCssImagePercentXY
   * @param {object} args - Arguments
   * @param {HTMLElement} args.thumbButton - DOM Element
   * @param {HTMLElement} args.thumbImg - DOM Element
   * @param {number} args.thumbIndex - Thumb index
   * @param {number} args.imagePercentX - Image percent X
   * @param {number} args.imagePercentY - Image percent Y
   */
  setCssImagePercentXY({
    thumbButton, thumbImg, thumbIndex, imagePercentX, imagePercentY
  }) {
    const x = (typeof imagePercentX !== 'undefined') ? imagePercentX : 50;
    const y = (typeof imagePercentY !== 'undefined') ? imagePercentY : 50;

    // suppressing default output shows the default overlay colour
    if (x !== 50) {
      thumbButton.style.setProperty('--image-percent-x', `${x}%`);
    }

    if (y !== 50) {
      thumbButton.style.setProperty('--image-percent-y', `${y}%`);
    }

    thumbImg.setAttribute('alt', `Thumbnail ${thumbIndex} with focalpoint at ${y}% top and ${x}% left. `);
  }

  /**
   * @function containsThumbs
   * @summary Whether the thumb area of the UI contains any thumbs
   * @returns {number} thumbLength (truthy|falsy)
   * @memberof FmcThumbsUi
   */
  containsThumbs() {
    const { thumbImgClass } = this;

    const thumbLength = document.querySelectorAll(`.${thumbImgClass}`).length;

    return thumbLength;
  }

  /**
   * @function displayCount
   * @param {object} args - Arguments
   * @param {number} args.thumbTotal - Thumb total
   * @param {number} args.thumbIndex - Thumb index (first is 1)
   * @memberof FmcThumbsUi
   */
  displayCount({ thumbTotal, thumbIndex }) {
    const { thumbsCountId } = this;
    const el = document.getElementById(thumbsCountId);

    let str = '';

    // store for later access
    if (typeof thumbTotal !== 'undefined') {
      el.dataset.thumbTotal = thumbTotal;
    }

    if (typeof el.dataset.thumbTotal !== 'undefined') {
      const _thumbTotal = el.dataset.thumbTotal;

      if (typeof thumbIndex !== 'undefined') {
        str = `#${thumbIndex} / ${_thumbTotal}`;
      }
    }

    el.innerHTML = str;
  }

  /**
   * @function filterByFilename
   * @param {string} searchStr - Search string
   * @memberof FmcThumbsUi
   */
  filterByFilename(searchStr) {
    const {
      hideClass,
      thumbClass,
      thumbImgClass,
      thumbsId
    } = this;

    const thumbs = document.querySelectorAll(`#${thumbsId} .${thumbClass}`);
    const thumbImages = document.querySelectorAll(`#${thumbsId} .${thumbImgClass}`);

    thumbImages.forEach((thumbImg, index) => {
      if (searchStr === '') {
        thumbs[index].classList.remove(hideClass);
      } else {
        const { src } = thumbImg;
        const filename = FmcUi.getFileNameFromPath(src);

        if (filename.match(searchStr)) {
          thumbs[index].classList.remove(hideClass);
        } else {
          thumbs[index].classList.add(hideClass);
        }
      }
    });
  }

  /**
   * @function focusThumb
   * @summary Click then scroll the appropriate thumb into view
   * @param {string} position - Position of thumb (previous|next|selected)
   * @memberof FmcThumbsUi
   */
  focusThumb(position) {
    const thumbsButtons = this.getButtons();

    if (!thumbsButtons.length) {
      return;
    }

    const focussedElement = document.activeElement;
    const thumbsButtonCurrentIndex = FmcUi.getElementIndex(focussedElement, thumbsButtons);
    let thumbsButtonNewIndex = -1;

    if (position === 'previous') {
      thumbsButtonNewIndex = FmcThumbsUi.getPreviousIndex(thumbsButtons, thumbsButtonCurrentIndex);
    } else if (position === 'next') {
      thumbsButtonNewIndex = FmcThumbsUi.getNextIndex(thumbsButtons, thumbsButtonCurrentIndex);
    } else if (position === 'selected') {
      thumbsButtonNewIndex = thumbsButtonCurrentIndex;
    }

    if (thumbsButtonNewIndex > -1) {
      if (position !== 'selected') {
        // dispatchEvent doesn't apply :focus
        thumbsButtons[thumbsButtonNewIndex].focus();
      }
    }
  }

  /**
   * @function generateThumbsHtml
   * @summary Inject the thumb images and their scaffolding, then select the first thumb
   * @param {Array} imagesData - Images data
   * @param {number} selectedThumbIndex - Selected thumb index
   * @memberof FmcThumbsUi
   */
  generateThumbsHtml(imagesData, selectedThumbIndex) {
    const {
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbImgWrapperClass,
      thumbMetaClass,
      thumbsId
    } = this;

    let html = '';

    imagesData.forEach((loadedThumb, i) => {
      const {
        src,
        dateTimeOriginal
      } = loadedThumb;

      const dateTimeOriginalStr = (dateTimeOriginal !== '') ? dateTimeOriginal : '-';

      html += `<li class="${thumbClass}">
  <div class="thumb-index">${i + 1}</div>
  <button type="button" class="${thumbButtonClass}" tabindex="-1">
    <div class="${thumbImgWrapperClass}">
      <img src="${src}" class="${thumbImgClass}">
    </div>
    <p class="${thumbMetaClass}">${dateTimeOriginalStr}</p>  
  </button>
</li>`;

      if (i === imagesData.length - 1) {
        document.getElementById(thumbsId).innerHTML = html;

        const thumbsButtons = this.getButtons();
        const selectedThumb = thumbsButtons[selectedThumbIndex - 1];

        selectedThumb.setAttribute('tabindex', '-1');
        selectedThumb.focus();
        FmcUi.emitElementEvent(selectedThumb, 'click', {});
      }
    });

    this.displayCount({
      thumbTotal: imagesData.length,
      thumbIndex: selectedThumbIndex - 1
    });
  }

  /**
   * @function getButtons
   * @returns {NodeList} thumbsButtons - Thumb buttons
   * @memberof FmcThumbsUi
   */
  getButtons() {
    const {
      thumbButtonClass
    } = this;

    const thumbButtons = document.querySelectorAll(`.${thumbButtonClass}`);

    return thumbButtons;
  }

  /**
   * @function getClickedButton
   * @param {object} event - Event
   * @returns {HTMLElement} button
   * @memberof FmcThumbsUi
   */
  getClickedButton(event) {
    const e = event || window.event;
    const thumbsButtons = this.getButtons();
    let clickedButton = e.target || e.srcElement;

    if (!thumbsButtons.length) {
      return null;
    }

    while (clickedButton.tagName.toLowerCase() !== 'button') {
      clickedButton = clickedButton.parentNode;
    }

    const clickedButtonIndex = Array.from(thumbsButtons).indexOf(clickedButton) + 1;

    return {
      clickedButton,
      clickedButtonIndex
    };
  }

  /**
   * @function removeSelectedClass
   * @summary Remove the 'selected' class from the selected thumb
   * @memberof FmcThumbsUi
   */
  removeSelectedClass() {
    const {
      selectedClass
    } = this;

    const thumbButtons = this.getButtons();

    thumbButtons.forEach(button => {
      button.classList.remove(selectedClass);
    });
  }

  /* Static methods */

  /**
   * @function getNextIndex
   * @summary Get the index of the next node in a nodelist
   * @param {NodeList} nodeList - List of thumb items
   * @param {number} selectedIndex - Index of selected thumb item
   * @returns {number} nextIndex | -1
   * @memberof FmcThumbsUi
   * @static
   */
  static getNextIndex(nodeList, selectedIndex) {
    let nextIndex = -1;

    if ((selectedIndex + 1) < nodeList.length) {
      nextIndex = selectedIndex + 1;
    } else {
      nextIndex = 0;
    }

    return nextIndex;
  }

  /**
   * @function getPreviousIndex
   * @summary Get the index of the previous node in a nodelist
   * @param {NodeList} nodeList - List of thumb items
   * @param {number} selectedIndex - Index of selected thumb item
   * @returns {number} previousIndex | -1
   * @memberof FmcThumbsUi
   * @static
   */
  static getPreviousIndex(nodeList, selectedIndex) {
    let previousIndex = -1;

    if (selectedIndex > 0) {
      previousIndex = selectedIndex - 1;
    } else {
      previousIndex = nodeList.length - 1; // loop around to last item
    }

    return previousIndex;
  }
}
