/**
 * @file CrThumbsUi.js
 */

import dtrtValidate from 'dtrt-type-validate';

export class CrThumbsUi { // eslint-disable-line no-unused-vars
  /**
   * @class CrThumbsUi
   * @summary Manages thumbs component
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      selectedClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbMetaClass,
      thumbsCountId,
      thumbsFolderId,
      thumbsId
    } = config;

    Object.assign(this, {
      selectedClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbMetaClass,
      thumbsCountId,
      thumbsFolderId,
      thumbsId
    });
  }

  /* Getters and Setters */

  /**
   * selectedClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get selectedClass() {
    return this._selectedClass;
  }

  set selectedClass(selectedClass) {
    this._selectedClass = dtrtValidate.validate(selectedClass, 'string', 'CrThumbsUi.selectedClass');
  }

  /**
   * thumbButtonClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbButtonClass() {
    return this._thumbButtonClass;
  }

  set thumbButtonClass(thumbButtonClass) {
    this._thumbButtonClass = dtrtValidate.validate(thumbButtonClass, 'string', 'CrThumbsUi.thumbButtonClass');
  }

  /**
   * thumbClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbClass() {
    return this._thumbClass;
  }

  set thumbClass(thumbClass) {
    this._thumbClass = dtrtValidate.validate(thumbClass, 'string', 'CrThumbsUi.thumbClass');
  }

  /**
   * thumbImgClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbImgClass() {
    return this._thumbImgClass;
  }

  set thumbImgClass(thumbImgClass) {
    this._thumbImgClass = dtrtValidate.validate(thumbImgClass, 'string', 'CrThumbsUi.thumbImgClass');
  }

  /**
   * thumbMetaClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbMetaClass() {
    return this._thumbMetaClass;
  }

  set thumbMetaClass(thumbMetaClass) {
    this._thumbMetaClass = dtrtValidate.validate(thumbMetaClass, 'string', 'CrThumbsUi.thumbMetaClass');
  }

  /**
   * thumbsCountId
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbsCountId() {
    return this._thumbsCountId;
  }

  set thumbsCountId(thumbsCountId) {
    this._thumbsCountId = dtrtValidate.validate(thumbsCountId, 'string', 'CrThumbsUi.thumbsCountId');
  }

  /**
   * thumbsFolderId
   * @type {string}
   * @memberof CrCroppersUi
   */
  get thumbsFolderId() {
    return this._thumbsFolderId;
  }

  set thumbsFolderId(thumbsFolderId) {
    this._thumbsFolderId = dtrtValidate.validate(thumbsFolderId, 'string', 'CrThumbsUi.thumbsFolderId');
  }

  /* Instance methods */

  /**
   * @function applySelectedClass
   * @summary Apply the 'selected' class to the selected thumb
   * @param {HTMLElement} target - Selected thumb
   * @memberof CrThumbsUi
   */
  applySelectedClass(target) {
    const { selectedClass } = this;

    this.removeSelectedClass();

    target.classList.add(selectedClass);
  }

  /**
   * @function containsThumbs
   * @summary Whether the thumb area of the UI contains any thumbs
   * @returns {number} thumbLength (truthy|falsy)
   * @memberof CrThumbsUi
   */
  containsThumbs() {
    const { thumbImgClass } = this;

    const thumbLength = document.querySelectorAll(`.${thumbImgClass}`).length;

    return thumbLength;
  }

  /**
   * @function getSelectedIndex
   * @summary Get the index of the selected node in a nodelist
   * @param {NodeList} nodeList = NodeList
   * @returns {number} selectedIndex | -1
   * @memberof CrThumbsUi
   */
  getSelectedIndex(nodeList) {
    const { selectedClass } = this;

    let selectedIndex = -1;

    nodeList.forEach((node, index) => {
      if (node.classList.contains(selectedClass)) {
        selectedIndex = index;
      }
    });

    return selectedIndex;
  }

  /**
   * @function generateThumbsHtml
   * @summary Inject the thumb images and their scaffolding, then select the first thumb
   * @param {string} folderPath - Folder path
   * @param {Array} imagesData - Images data
   * @memberof CrThumbsUi
   */
  generateThumbsHtml(folderPath, imagesData) {
    const {
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbMetaClass,
      thumbsCountId,
      thumbsFolderId,
      thumbsId
    } = this;

    let html = '';

    imagesData.forEach((loadedThumb, i) => {
      const { src, dateTimeOriginal } = loadedThumb;

      html += `<li class="${thumbClass}">
    <button type="button" class="${thumbButtonClass}">
      <img src="${src}" class="${thumbImgClass}">
      <p class="meta ${thumbMetaClass}">${dateTimeOriginal}</p>  
    </button>
  </li>`;

      if (i === imagesData.length - 1) {
        document.getElementById(thumbsId).innerHTML = html;
        this.selectFirstThumb();
      }
    });

    document.getElementById(thumbsCountId).textContent = imagesData.length;
    document.getElementById(thumbsFolderId).textContent = folderPath;
  }

  /**
   * @function removeSelectedClass
   * @summary Remove the 'selected' class from the selected thumb
   * @memberof CrThumbsUi
   */
  removeSelectedClass() {
    const {
      selectedClass,
      thumbButtonClass
    } = this;

    const thumbItems = document.querySelectorAll(`.${thumbButtonClass}`);

    thumbItems.forEach(thumbItem => {
      thumbItem.classList.remove(selectedClass);
    });
  }

  /**
   * @function scrollToThumb
   * @summary Click then scroll the appropriate thumb into view
   * @param {string} position - Position of thumb (previous|next|selected)
   * @memberof CrThumbsUi
   * @todo Would programmatically shifting the focus make this redundant? (#7)
   */
  scrollToThumb(position) {
    const { thumbButtonClass } = this;
    const thumbsButtons = document.querySelectorAll(`.${thumbButtonClass}`);

    if (!thumbsButtons.length) {
      return;
    }

    const thumbsButtonSelectedIndex = this.getSelectedIndex(thumbsButtons);
    let thumbsButtonNextIndex = -1;

    // let masterCropper = getMasterCropper();

    // if (!masterCropper) {
    //   return;
    // }

    if (position === 'previous') {
      thumbsButtonNextIndex = CrThumbsUi.getPreviousIndex(thumbsButtons, thumbsButtonSelectedIndex);
    } else if (position === 'next') {
      thumbsButtonNextIndex = CrThumbsUi.getNextIndex(thumbsButtons, thumbsButtonSelectedIndex);
    } else if (position === 'selected') {
      thumbsButtonNextIndex = this.getSelectedIndex(thumbsButtons);
    }

    if (thumbsButtonNextIndex > -1) {
      if (position !== 'selected') {
        thumbsButtons[thumbsButtonNextIndex].click();
      }

      thumbsButtons[thumbsButtonNextIndex].scrollIntoView({
        behavior: 'auto'
      });
    }
  }

  /**
   * @function selectFirstThumb
   * @summary Select the first thumb
   * @memberof CrThumbsUi
   */
  selectFirstThumb() {
    const { thumbButtonClass } = this;

    document.querySelectorAll(`.${thumbButtonClass}`)[0].click();
  }

  /**
   * @function getClickedButton
   * @param {object} event - Event
   * @returns {HTMLElement} button
   * @memberof CrThumbsUi
   */
  getClickedButton(event) {
    const e = event || window.event;
    let target = e.target || e.srcElement;

    if (!document.querySelectorAll('#thumbs img').length) {
      return null;
    }

    while (target.tagName.toLowerCase() !== 'button') {
      target = target.parentNode;
    }

    return target;
  }

  /**
   * @function changeSelectedImageSrc
   * @param {string} newFileName - New file name
   */
  changeSelectedImageSrc(newFileName) {
    const { selectedClass } = this;

    document.querySelector(`.${selectedClass} img`).src = newFileName;
  }

  /* Static methods */

  /**
   * @function getNextIndex
   * @summary Get the index of the next node in a nodelist
   * @param {NodeList} nodeList - List of thumb items
   * @param {number} selectedIndex - Index of selected thumb item
   * @returns {number} nextIndex | -1
   * @memberof CrThumbsUi
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
   * @memberof CrThumbsUi
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