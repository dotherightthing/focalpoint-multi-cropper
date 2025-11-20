/**
 * @file FmcThumbsUi.js
 */

import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcThumbsUi {
  /**
   * @class FmcThumbsUi
   * @summary Manages thumbs component
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      elements,
      fmcCroppersUiInstance,
      selectors
    } = config;

    Object.assign(this, {
      elements,
      fmcCroppersUiInstance,
      selectors
    });
  }

  /* Getters and Setters */

  /**
   * elements
   * @type {object}
   * @memberof FmcThumbsUi
   */
  get elements() {
    return this._elements;
  }

  set elements(elements) {
    this._elements = dtrtValidate.validate(elements, 'object', 'FmcThumbsUi.elements');
  }

  /**
   * fmcCroppersUiInstance
   * @type {object}
   * @memberof FmcThumbsUi
   */
  get fmcCroppersUiInstance() {
    return this._fmcCroppersUiInstance;
  }

  set fmcCroppersUiInstance(fmcCroppersUiInstance) {
    this._fmcCroppersUiInstance = dtrtValidate.validate(fmcCroppersUiInstance, 'object', 'FmcThumbsUi.fmcCroppersUiInstance');
  }

  /**
   * selectors
   * @type {object}
   * @memberof FmcThumbsUi
   */
  get selectors() {
    return this._selectors;
  }

  set selectors(selectors) {
    this._selectors = dtrtValidate.validate(selectors, 'object', 'FmcThumbsUi.selectors');
  }

  /* Instance methods */

  /**
   * @function applySelectedClass
   * @summary Apply the 'selected' class to the selected thumb
   * @param {HTMLElement} target - Selected thumb
   * @memberof FmcThumbsUi
   */
  applySelectedClass(target) {
    const {
      selectors
    } = this;

    const {
      selectedClass
    } = selectors;

    this.removeSelectedClass();

    target.classList.add(selectedClass);
  }

  /**
   * @function changeSelectedImageSrc
   * @param {string} src - New src
   */
  changeSelectedImageSrc(src) {
    const {
      selectors
    } = this;

    const {
      selectedClass
    } = selectors;

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
    thumbButton,
    thumbImg,
    thumbIndex,
    imagePercentX,
    imagePercentY
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
    const {
      selectors
    } = this;

    const {
      thumbImgClass
    } = selectors;

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
    const {
      selectors
    } = this;

    const {
      thumbsCountId
    } = selectors;

    const el = document.getElementById(thumbsCountId);

    let str = '';

    el.dataset.thumbIndex = thumbIndex;

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
   * @function filterByFilenameAndCropped
   * @param {string} searchStr - Search string
   * @memberof FmcThumbsUi
   */
  filterByFilenameAndCropped(searchStr) {
    const {
      elements,
      selectors
    } = this;

    const {
      thumbsAutoSelectFilteredRadios,
      thumbsFilterUncroppedRadios
    } = elements;

    const {
      hideClass,
      thumbClass,
      thumbButtonClass,
      thumbImgClass,
      thumbsContainerId
    } = selectors;

    const autoSelectFiltered = thumbsAutoSelectFilteredRadios.getState() === 'on';
    const hideUncropped = thumbsFilterUncroppedRadios.getState() === 'on';
    const thumbButtons = document.querySelectorAll(`#${thumbsContainerId} .${thumbButtonClass}`);
    const thumbImages = document.querySelectorAll(`#${thumbsContainerId} .${thumbImgClass}`);
    const thumbs = document.querySelectorAll(`#${thumbsContainerId} .${thumbClass}`);
    const thumbsHidden = [];
    const thumbsShown = [];

    thumbImages.forEach((thumbImg, index) => {
      if (searchStr === '') {
        if (hideUncropped && (!thumbButtons[index].style.getPropertyValue('--image-percent-x'))) {
          // hide thumbs if uncropped
          thumbsHidden.push(thumbs[index]);
        } else {
          // show thumbs by default
          thumbsShown.push(thumbs[index]);
        }
      } else {
        const { src } = thumbImg;
        const filename = FmcUi.getFileNameFromPath(src);

        if (filename.match(searchStr)) {
          // show thumbs that match the filename filter
          thumbsShown.push(thumbs[index]);
        } else {
          // hide thumbs that don't match the filename filter
          thumbsHidden.push(thumbs[index]);
        }
      }
    });

    // reset
    thumbsHidden.forEach(thumb => {
      thumb.classList.add(hideClass);
    });

    thumbsShown.forEach(thumb => {
      thumb.classList.remove(hideClass);
    });

    if (thumbsShown.length && autoSelectFiltered) {
      const target = thumbsShown[0].querySelector(`.${thumbButtonClass}`);

      target.focus();
      target.click();
    }
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
   * @summary Inject the thumb images and their scaffolding, then select the selected thumb
   * @param {Array} imagesData - Images data
   * @param {number} selectedThumbIndex - Selected thumb index
   * @memberof FmcThumbsUi
   */
  generateThumbsHtml(imagesData, selectedThumbIndex) {
    const {
      fmcCroppersUiInstance,
      selectors
    } = this;

    const {
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbImgWrapperClass,
      thumbMetaClass,
      thumbsContainerId
    } = selectors;

    let html = '';

    imagesData.forEach((loadedThumb, i) => {
      const {
        src,
        dateTimeOriginal,
        filesize,
        latitude,
        longitude
      } = loadedThumb;

      const latLongStr = ((latitude !== '') && (longitude !== '')) ? `${latitude},${longitude}` : '';
      const latLongIcon = (latLongStr !== '') ? '<div class="thumb-lat-long"><abbr title="Location">L</abbr></div>' : '';

      const {
        dayTimeStr,
        dateStr
      } = this.formatDateTimeOriginal(dateTimeOriginal);

      html += `<li class="${thumbClass}">
  <div class="thumb-index">${i + 1}</div>
  ${latLongIcon}
  <button type="button" class="${thumbButtonClass}" tabindex="-1" data-lat-long="${latLongStr}">
    <div class="${thumbImgWrapperClass}">
      <img src="${src}" class="${thumbImgClass}">
    </div>
    <p class="${thumbMetaClass}">
      <span class="thumb-meta-day-time">${dayTimeStr}</span>
      <span class="thumb-meta-date">${dateStr}</span>
      <span class="thumb-meta-filesize">${filesize}</span>
    </p>  
  </button>
</li>`;

      // if last
      if (i === imagesData.length - 1) {
        document.getElementById(thumbsContainerId).innerHTML = html;

        this.clickSelectedThumb(selectedThumbIndex);
      }
    });

    const thumbButtons = this.getButtons();
    const thumbImgs = document.querySelectorAll(`.${thumbImgClass}`);

    // add focalpoint overlays to thumbs
    setTimeout(() => {
      thumbButtons.forEach((thumbButton, index) => {
        const thumbImg = thumbImgs[index];
        const { src } = thumbImg;
        const { imagePercentX, imagePercentY } = fmcCroppersUiInstance.getImagePercentXYFromImage(src);

        this.setCssImagePercentXY({
          thumbButton,
          thumbImg,
          thumbIndex: index + 1,
          imagePercentX,
          imagePercentY
        });
      });
    }, 500);

    this.displayCount({
      thumbTotal: imagesData.length,
      thumbIndex: selectedThumbIndex - 1
    });
  }

  /**
   * @function clickSelectedThumb
   * @summary Click the selected thumb
   * @param {number} selectedThumbIndex - Selected thumb index
   * @memberof FmcThumbsUi
   */
  clickSelectedThumb(selectedThumbIndex) {
    const thumbsButtons = this.getButtons();
    const selectedThumb = thumbsButtons[selectedThumbIndex - 1];

    selectedThumb.setAttribute('tabindex', '-1');
    selectedThumb.focus();

    FmcUi.emitElementEvent(selectedThumb, 'click', {});
  }

  /**
   * @function getButtons
   * @returns {NodeList} thumbsButtons - Thumb buttons
   * @memberof FmcThumbsUi
   */
  getButtons() {
    const {
      selectors
    } = this;

    const {
      thumbButtonClass
    } = selectors;

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
    const thumbsButtons = this.getButtons();

    if (!thumbsButtons.length) {
      return null;
    }

    const clickedButton = FmcUi.getTargetElementOfType(event, 'button');

    return {
      clickedButton, // can be null
      clickedButtonIndex: clickedButton ? (Array.from(thumbsButtons).indexOf(clickedButton) + 1) : -1
    };
  }

  /**
   * @function getSelectedThumbIndex
   * @returns {string} thumbIndex
   * @memberof FmcThumbsUi
   */
  getSelectedThumbIndex() {
    const {
      selectors
    } = this;

    const {
      thumbsCountId
    } = selectors;

    const countEl = document.getElementById(thumbsCountId);
    const {
      thumbIndex = ''
    } = countEl.dataset;

    return thumbIndex;
  }

  /**
   * @function formatDateTimeOriginal
   * @summary Convert '2015:08:23 11:28:48' into a human readable date
   * @param {string} dateTimeOriginal - DateTimeOriginal.description
   * @returns {object} { dayTimeStr, dateStr }
   * @memberof FmcThumbsUi
   */
  formatDateTimeOriginal(dateTimeOriginal) {
    let dayTimeStr = '-';
    let dateStr = '-';

    if (dateTimeOriginal !== '') {
      const [ date, time ] = dateTimeOriginal.split(' ');
      const validDate = [ date.replace(':', '-'), time ].join(' ');
      const timeStamp = Date.parse(validDate);
      const dt = new Date(timeStamp);
      const day3 = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ][dt.getDay()];
      const date2 = dt.getDate().toString().padStart(2, '0');
      const month2 = (dt.getMonth() + 1).toString().padStart(2, '0');
      const year4 = dt.getFullYear().toString();
      const hours2 = dt.getHours().toString().padStart(2, '0');
      const minutes2 = dt.getMinutes().toString().padStart(2, '0');

      dayTimeStr = `${day3} &middot; ${hours2}:${minutes2}`;
      dateStr = `${date2}.${month2}.${year4}`;
    }

    return {
      dayTimeStr,
      dateStr
    };
  }

  /**
   * @function removeSelectedClass
   * @summary Remove the 'selected' class from the selected thumb
   * @memberof FmcThumbsUi
   */
  removeSelectedClass() {
    const {
      selectors
    } = this;

    const {
      selectedClass
    } = selectors;

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
