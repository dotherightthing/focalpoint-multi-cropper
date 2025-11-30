import dtrtValidate from 'dtrt-type-validate';
import { FmcUi } from './FmcUi.mjs';

export class FmcCroppersUi {
  /**
   * @class FmcCroppersUi
   * @summary Manages croppers component, containing instances of cropperjs
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // TODO Add a subscribe method

    // select the relevant arguments from the config object passed in
    const {
      croppersOptions,
      elements,
      selectors,
      updateDelay
    } = config;

    Object.assign(this, {
      croppersOptions,
      elements,
      selectors,
      updateDelay
    });

    const {
      cropperImageClass,
      croppersId
    } = selectors;

    // container for the 4 croppers
    const croppersEl = document.getElementById(croppersId);

    this.cropperImageElements = document.querySelectorAll(`#${croppersId} .${cropperImageClass}`);

    // assign Expando property to expose methods during E2E testing
    // An expando property is a dynamic property that can be added to an object at runtime
    if (typeof Cypress !== 'undefined') {
      // @ts-ignore
      // Property 'fmcCroppersUi' does not exist on type 'HTMLElement'.
      croppersEl.fmcCroppersUi = this;
    }

    this.croppers = [];
    this.resizers = [];
    this.masterCropperCropBoxWasDragged = false;
  }

  /* Getters and Setters */

  /**
   * cropperImageElements
   * @summary 4x src-less image placeholders which are replaced by 4x croppers
   * @type {HTMLElement[]}
   * @memberof FmcCroppersUi
   */
  get cropperImageElements() {
    return this._cropperImageElements;
  }

  set cropperImageElements(cropperImageElements) {
    this._cropperImageElements = dtrtValidate.validate(cropperImageElements, 'Array', 'FmcCroppersUi.cropperImageElements');
  }

  /**
   * croppers
   * @summary Multiple visible instances of Cropper, including one master and several with unique proportions
   * @type {Array}
   * @memberof FmcCroppersUi
   */
  get croppers() {
    return this._croppers;
  }

  set croppers(croppers) {
    this._croppers = dtrtValidate.validate(croppers, 'Array', 'FmcCroppersUi.croppers');
  }

  /**
   * croppersOptions
   * @summary Options supplied to the Cropper constructor when creating a new Cropper instance
   * @type {object}
   * @memberof FmcCroppersUi
   */
  get croppersOptions() {
    return this._croppersOptions;
  }

  set croppersOptions(croppersOptions) {
    this._croppersOptions = dtrtValidate.validate(croppersOptions, 'object', 'FmcCroppersUi.croppersOptions');
  }

  /**
   * elements
   * @summary DOM elements shared between fmcCroppersUiInstance, fmcThumbsUiInstance, fmcUi
   * @type {object}
   * @memberof FmcCroppersUi
   */
  get elements() {
    return this._elements;
  }

  set elements(elements) {
    this._elements = dtrtValidate.validate(elements, 'object', 'FmcCroppersUi.elements');
  }

  /**
   * imageSrc
   * @summary Stores the value of the current cropper image source, via this.changeSourceImage
   * @type {string}
   * @memberof FmcCroppersUi
   */
  get imageSrc() {
    return this._imageSrc;
  }

  set imageSrc(imageSrc) {
    this._imageSrc = dtrtValidate.validate(imageSrc, 'string', 'FmcCroppersUi.imageSrc');
  }

  /**
   * masterCropper
   * @summary The object containing the master cropper instance
   * @type {object}
   * @memberof FmcCroppersUi
   */
  get masterCropper() {
    return this._masterCropper;
  }

  set masterCropper(masterCropper) {
    this._masterCropper = dtrtValidate.validate(masterCropper, 'object', 'FmcCroppersUi.masterCropper');
  }

  /**
   * masterCropperCropBoxWasDragged
   * @summary Tracks whether the cropbox was dragged
   * @type {boolean}
   * @memberof FmcCroppersUi
   */
  get masterCropperCropBoxWasDragged() {
    return this._masterCropperCropBoxWasDragged;
  }

  set masterCropperCropBoxWasDragged(masterCropperCropBoxWasDragged) {
    this._masterCropperCropBoxWasDragged = dtrtValidate.validate(masterCropperCropBoxWasDragged, 'boolean', 'FmcCroppersUi.masterCropperCropBoxWasDragged');
  }

  /**
   * resizers
   * @summary Multiple hidden instances of resizer, which resizes images without cropping
   * @type {Array}
   * @memberof FmcCroppersUi
   */
  get resizers() {
    return this._resizers;
  }

  set resizers(resizers) {
    this._resizers = dtrtValidate.validate(resizers, 'Array', 'FmcCroppersUi.resizers');
  }

  /**
   * selectors
   * @summary DOM selectors
   * @type {object}
   * @memberof FmcCroppersUi
   */
  get selectors() {
    return this._selectors;
  }

  set selectors(selectors) {
    this._selectors = dtrtValidate.validate(selectors, 'object', 'FmcCroppersUi.selectors');
  }

  /**
   * slaveCroppers
   * @summary An array of objects, each containing a slave (non-master) instance of Cropper
   * @type {Array}
   * @memberof FmcCroppersUi
   */
  get slaveCroppers() {
    return this._slaveCroppers;
  }

  set slaveCroppers(slaveCroppers) {
    this._slaveCroppers = dtrtValidate.validate(slaveCroppers, 'Array', 'FmcCroppersUi.slaveCroppers');
  }

  /**
   * updateDelay
   * @summary Number of milliseconds to wait after dragging the focalpoint, before applying rounding
   * @type {number}
   * @memberof FmcCroppersUi
   */
  get updateDelay() {
    return this._updateDelay;
  }

  set updateDelay(updateDelay) {
    this._updateDelay = dtrtValidate.validate(updateDelay, 'number', 'FmcCroppersUi.updateDelay');
  }

  /* Instance methods */

  /**
   * @function calcCanvasOffsets
   * @summary cropper.getCanvasData().top ignores preceding UI and returns 0, this function returns the actual offset
   * @returns {object} { top, left }
   * @memberof FmcCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcCanvasOffsets() {
    FmcUi.log('FmcCroppersUi.calcCanvasOffsets');
    const {
      masterCropper,
      selectors
    } = this;

    const {
      element: cropperImage
    } = masterCropper.cropperInstance;

    const {
      cropperCanvasClass
    } = selectors;

    const cropperContainerEl = cropperImage.nextSibling;
    const cropperCanvasEl = cropperContainerEl.querySelector(`.${cropperCanvasClass}`);

    if (cropperCanvasEl === null) {
      throw new Error(`.${cropperCanvasClass} not found - cropper was not injected`);
    }

    const { top } = FmcUi.getOffset(cropperCanvasEl);
    const { left } = masterCropper.cropperInstance.getCanvasData();

    return { top, left };
  }

  /**
   * @function calcCropBoxXYFromPageXY
   * @summary Calculate the XY position of the cropbox from the XY click or cropend position
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @returns {object} { cropBoxX, cropBoxY }
   * @memberof FmcCroppersUi
   */
  calcCropBoxXYFromPageXY({ pageX, pageY }) {
    FmcUi.log('FmcCroppersUi.calcCropBoxXYFromPageXY', { pageX, pageY });
    const {
      masterCropper
    } = this;

    const {
      top: canvasTop,
      left: canvasLeft
    } = masterCropper.cropperInstance.getCanvasData();

    const {
      top: canvasOffsetTop,
      left: canvasOffsetLeft
    } = this.calcCanvasOffsets();

    const {
      width: cropperWidth,
      height: cropperHeight
    } = masterCropper.cropperInstance.getCropBoxData();

    const pageXOffset = pageX + canvasLeft - canvasOffsetLeft;
    const cropBoxX = pageXOffset - (cropperWidth / 2);

    const pageYOffset = pageY + canvasTop - canvasOffsetTop;
    const cropBoxY = pageYOffset - (cropperHeight / 2);

    return {
      cropBoxX,
      cropBoxY
    };
  }

  /**
   * @function calcImageXYFromImagePercentXY
   * @summary Calculate the XY position of the image click from the percentage position of the image click
   * @param {object} args - Arguments
   * @param {number} args.imagePercentX - Image percentage X
   * @param {number} args.imagePercentY - Image percentage Y
   * @returns {object} { imageX, imageY }
   * @memberof FmcCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImageXYFromImagePercentXY({ imagePercentX, imagePercentY }) {
    FmcUi.log('FmcCroppersUi.calcImageXYFromImagePercentXY', { imagePercentX, imagePercentY });
    const {
      masterCropper
    } = this;

    const {
      width: imageWidth,
      height: imageHeight
    } = masterCropper.cropperInstance.getImageData();

    const imageX = ((imagePercentX / 100) * imageWidth);
    const imageY = ((imagePercentY / 100) * imageHeight);

    return {
      imageX,
      imageY
    };
  }

  /**
   * @function calcImageXYFromPageXY
   * @summary Calculate the XY position of the image click from the position of the page click
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @returns {object} { imageX, imageY }
   * @memberof FmcCroppersUi
   */
  calcImageXYFromPageXY({ pageX, pageY }) {
    FmcUi.log('FmcCroppersUi.calcImageXYFromPageXY', { pageX, pageY });
    const {
      left: canvasOffsetLeft,
      top: canvasOffsetTop
    } = this.calcCanvasOffsets();

    const imageX = pageX - canvasOffsetLeft;
    const imageY = pageY - canvasOffsetTop;

    return {
      imageX,
      imageY
    };
  }

  /**
   * @function calcPageXYForRoundedImagePercentXY
   * @summary Change x and y so they correspond with a rounded percentage
   * @param {object} args - Method arguments
   * @param {number} args.pageXRaw - Page X raw (unrounded)
   * @param {number} args.pageYRaw - Page Y raw (unrounded)
   * @returns {object} { pageX, pageY }
   * @memberof FmcCroppersUi
   */
  calcPageXYForRoundedImagePercentXY({ pageXRaw, pageYRaw }) {
    FmcUi.log('FmcCroppersUi.calcPageXYForRoundedImagePercentXY', { pageXRaw, pageYRaw });
    const {
      imagePercentX,
      imagePercentY
    } = this.calcImagePercentXYFromPageXY({
      pageX: pageXRaw,
      pageY: pageYRaw,
      round: true
    });

    const {
      imageX,
      imageY
    } = this.calcImageXYFromImagePercentXY({ imagePercentX, imagePercentY });

    const {
      pageX,
      pageY
    } = this.calcPageXYFromImageXY({ imageX, imageY });

    return {
      pageX,
      pageY
    };
  }

  /**
   * @function calcPageXYFromImageXY
   * @summary Calculate the XY location of the page click from the location of the click relative to the cropper image
   * @param {object} args - Arguments
   * @param {number} args.imageX - Image X
   * @param {number} args.imageY - Image Y
   * @returns {object} { pageX, pageY }
   * @memberof FmcCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcPageXYFromImageXY({ imageX, imageY }) {
    FmcUi.log('FmcCroppersUi.calcPageXYFromImageXY', { imageX, imageY });
    const {
      left: canvasOffsetLeft,
      top: canvasOffsetTop
    } = this.calcCanvasOffsets();

    const pageX = imageX + canvasOffsetLeft;
    const pageY = imageY + canvasOffsetTop;

    return {
      pageX,
      pageY
    };
  }

  /**
   * @function calcImagePercentXYFromImageXorY
   * @summary Get the X or Y coordinate as a percentage of the image dimension, so that it can be stored and recalled later.
   * @param {object} args - Arguments
   * @param {number} args.imageXorY - Image X or Image Y
   * @param {number} args.dimensionLength - Dimension length (width or height)
   * @param {boolean} args.round - Round the result to the nearest whole number
   * @returns {number} percentage
   * @memberof FmcCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImagePercentXYFromImageXorY({ imageXorY, dimensionLength, round = false }) {
    FmcUi.log('FmcCroppersUi.calcImagePercentXYFromImageXorY', { imageXorY, dimensionLength, round });
    let percentage = imageXorY / dimensionLength;

    if (percentage < 0) {
      percentage = 0;
    }

    if (percentage > 100) {
      percentage = 100;
    }

    // In testing, rounding changes the results by 1-4 units.
    // This causes little visual difference but makes the numbers much easier to store.

    return round ? Math.round(percentage * 100) : percentage * 100;
  }

  /**
   * @function calcImagePercentXYFromPageXY
   * @summary Calculate the XY location of the page click as it relates to the scaled image
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @param {boolean} args.round - Round the result to the nearest whole number
   * @returns {object} { imagePercentX, imagePercentY }
   * @memberof FmcCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImagePercentXYFromPageXY({ pageX, pageY, round = false }) {
    FmcUi.log('FmcCroppersUi.calcImagePercentXYFromPageXY', { pageX, pageY, round });
    const {
      masterCropper
    } = this;

    const {
      width: imageWidth,
      height: imageHeight
    } = masterCropper.cropperInstance.getImageData();

    const { top, left } = this.calcCanvasOffsets();

    const imageX = pageX - left;
    const imageY = pageY - top;

    const imagePercentX = this.calcImagePercentXYFromImageXorY({
      imageXorY: imageX,
      dimensionLength: imageWidth,
      round
    });

    const imagePercentY = this.calcImagePercentXYFromImageXorY({
      imageXorY: imageY,
      dimensionLength: imageHeight,
      round
    });

    return {
      imagePercentX,
      imagePercentY
    };
  }

  /**
   * @function changeSourceImage
   * @summary Change the cropper image (when a thumbnail is clicked on)
   * @param {string} newImageSrc - New image src
   * @memberof FmcCroppersUi
   */
  changeSourceImage(newImageSrc) {
    FmcUi.log('FmcCroppersUi.changeSourceImage', newImageSrc);
    // TODO if exists
    this.destroy();

    this.imageSrc = newImageSrc;
    this.init();
  }

  /**
   * @function destroy
   * @summary Destroy instances of cropperjs
   * @memberof FmcCroppersUi
   */
  destroy() {
    FmcUi.log('FmcCroppersUi.destroy');
    const {
      croppers
    } = this;

    croppers.forEach(cropper => {
      const { cropperInstance } = cropper;

      if (cropperInstance) {
        cropperInstance.destroy();
      }
    });

    FmcUi.emitElementEvent('FmcCroppersUi.destroy', window, 'updateLastCropperListener', { removeListener: true });
    this.croppers = [];
  }

  /**
   * @function displayImagePercentXY
   * @summary Move cropbox to focalpoint
   * @param {object} args - Arguments
   * @param {number} args.imagePercentY - Image percentage top
   * @param {number} args.imagePercentX - Image percentage X
   * @memberof FmcCroppersUi
   */
  displayImagePercentXY({ imagePercentY, imagePercentX }) {
    FmcUi.log('FmcCroppersUi.displayImagePercentXY', { imagePercentY, imagePercentX });
    // simulate click event
    this.masterCropperCropBoxWasDragged = false;

    const {
      imageX,
      imageY
    } = this.calcImageXYFromImagePercentXY({ imagePercentY, imagePercentX });

    const {
      pageX,
      pageY
    } = this.calcPageXYFromImageXY({ imageX, imageY });

    this.moveCropperCropBoxToPageXY({ pageX, pageY });
  }

  /**
   * @function getCropperOptions
   * @summary Build an options object to pass to the cropperjs Cropper constructor
   * @param {number|null} exportWidth - Export width
   * @param {number|null} exportHeight - Export height
   * @param {string} role - master | slave
   * @param {string} action - resizeAndCrop (with preview) | resize
   * @returns {object} options
   * @memberof FmcCroppersUi
   */
  getCropperOptions(exportWidth, exportHeight, role, action) {
    FmcUi.log('FmcCroppersUi.getCropperOptions', exportWidth, exportHeight, role, action);
    const {
      croppersOptions
    } = this;

    const options = { ...croppersOptions };

    if (role === 'master') {
      Object.assign(options, {
        aspectRatio: 1,
        autoCropArea: 0.2, // size of circular cropbox (20%)
        guides: false,
        movable: true,
        // crop - fires during move, then after cropend
        // cropstart - occurs on mouse down, so before a click AND before a move
        cropmove: () => {
          this.masterCropperCropBoxWasDragged = true; // differentiate between a click and a move
        },
        cropend: (e) => { // dragEnd callback, see https://github.com/fengyuanchen/cropperjs/issues/669; fires after move
          const {
            updateDelay
          } = this;

          const {
            pageX: pageXRaw,
            pageY: pageYRaw
          } = e.detail.originalEvent;

          const {
            pageX: pageXRounded,
            pageY: pageYRounded
          } = this.calcPageXYForRoundedImagePercentXY({ pageXRaw, pageYRaw });

          this.moveCropperCropBoxToPageXY({
            pageX: pageXRaw,
            pageY: pageYRaw
          });

          FmcUi.emitElementEvent('FmcCroppersUi.getCropperOptions', window, 'updateStatus', {
            statusMessage: 'Rounding percentages for storage...'
          });

          setTimeout(() => {
            this.moveCropperCropBoxToPageXY({
              pageX: pageXRounded,
              pageY: pageYRounded
            });

            const {
              imagePercentX,
              imagePercentY
            } = this.calcImagePercentXYFromPageXY({
              pageX: pageXRounded,
              pageY: pageYRounded,
              round: true
            });

            FmcUi.log('getCropperOptions');
            FmcUi.emitElementEvent('FmcCroppersUi.getCropperOptions', window, 'updateFocalpointX', { value: imagePercentX });
            FmcUi.emitElementEvent('FmcCroppersUi.getCropperOptions', window, 'updateFocalpointY', { value: imagePercentY });
            FmcUi.emitElementEvent('FmcCroppersUi.getCropperOptions', window, 'updateStatus', { statusMessage: '' });
          }, updateDelay);
        }
      });
    }

    if (action === 'resizeAndCrop') {
      if ((exportWidth !== null) && (exportHeight !== null)) {
        Object.assign(options, { aspectRatio: exportWidth / exportHeight });
      }
    }

    return options;
  }

  /**
   * @function setFocalpointSaveState
   * @summary Determine whether the current focalpoint settings have been saved to the current image
   * @param {object} args - Arguments
   * @param {boolean} args.focalpointReset - Focalpoint was reset to previously stored values
   * @param {string} args.thumbIndexPrevious - The index of the previously selected thumbnail
   * @param {string} args.thumbIndex - The index of the currently selected thumbnail
   * @param {string} args.imagePercentXUi - Image Percent X as shown in the UI controls
   * @param {string} args.imagePercentYUi - Image Percent Y as shown in the UI controls
   * @param {string} args.imageProportionsUi - Image Proportions setting as shown in the UI controls
   * @returns {Promise<string>} state
   * @memberof FmcCroppersUi
   */
  async setFocalpointSaveState({
    focalpointReset,
    thumbIndexPrevious,
    thumbIndex,
    imagePercentXUi,
    imagePercentYUi,
    imageProportionsUi
  }) {
    FmcUi.log('FmcCroppersUi.setFocalpointSaveState', {
      focalpointReset,
      thumbIndexPrevious,
      thumbIndex,
      imagePercentXUi,
      imagePercentYUi,
      imageProportionsUi
    });
    const {
      elements,
      masterCropper
    } = this;

    const {
      focalpointWriteFilenameRadios,
      focalpointWriteTitleRadios
    } = elements;

    let state = 'default';
    let statusMessage = 'Cropper not ready';
    let statusType = 'warning';

    if (typeof masterCropper !== 'undefined') {
    const writeFilename = (focalpointWriteFilenameRadios.getState() === 'on');
    const writeTitle = (focalpointWriteTitleRadios.getState() === 'on');

    // TODO Fix - currently possible to enable both writeFilename and writeTitle - or neither
    // TODO when XY is sourced from image (for pre-writeTitle files), "Focalpoint changed but not saved to title" appears
    const msgTarget = (() => {
      switch (true) {
      case writeFilename && writeTitle:
        return 'filename and title';
      case writeFilename:
        return 'filename';
      case writeTitle:
        return 'title';
      default:
        return '';
      }
    })();

    const msgLoadedFrom = (msgTarget.length) ? (` from ${msgTarget}`) : '';
    const msgSavedTo = (msgTarget.length) ? (` to ${msgTarget}`) : '';

    const { src } = masterCropper.cropperInstance.element;
    const { Title } = await FmcCroppersUi.getImageTitle(src);

    const {
      imagePercentX: savedImagePercentX, // string
      imagePercentY: savedImagePercentY // string
    } = this.getImagePercentXYFromSrc({ src, title: Title });

    const {
      panorama: savedPanorama = false
    } = this.getFlagsFromSrc({ src, title: Title });

    const isDefaultFocalpoint = this.isDefaultFocalpoint({
      imagePercentX: imagePercentXUi,
      imagePercentY: imagePercentYUi,
      imageProportions: imageProportionsUi
    });

    const isSavedFocalpoint = (
      (imagePercentXUi === savedImagePercentX)
      && (imagePercentYUi === savedImagePercentY)
      && (((imageProportionsUi === 'panorama') && savedPanorama) || ((imageProportionsUi === 'default') && !savedPanorama))
    );

    if (isDefaultFocalpoint) {
      statusMessage = 'Default focalpoint';
      state = 'default';
    } else if (isSavedFocalpoint) {
      state = 'saved';

      if (thumbIndex !== thumbIndexPrevious) {
        statusMessage = 'Focalpoint loaded' + msgLoadedFrom;
        statusType = 'success';
      } else if (focalpointReset) {
        statusMessage = 'Focalpoint reloaded' + msgLoadedFrom;
        statusType = 'success';
      } else {
        statusMessage = 'Focalpoint saved' + msgSavedTo;
        statusType = 'success';
      }
    } else {
      statusMessage = 'Focalpoint changed but not saved' + msgSavedTo;
      state = 'dirty';
      statusType = 'warning';
    }
    }

    this.setSaveState(state);

    FmcUi.emitElementEvent('FmcCroppersUi.setFocalpointSaveState', window, 'updateStatus', {
      statusMessage,
      statusType
    });

    return state;
  }

  /**
   * @function getImagePercentXYFromSrc
   * @summary Get the values stored in the filename
   * @param {object} args - Arguments
   * @param {string} args.src - Image src
   * @param {string} args.title - Image title
   * @returns {object} imagePercentXY
   * @memberof FmcCroppersUi
   */
  getImagePercentXYFromSrc({ src, title }) {
    FmcUi.log('FmcCroppersUi.getImagePercentXYFromSrc', { src, title });

    const str = src || title;
    let imagePercentXY = {};

    const regexp = /\[([0-9]+)%,([0-9]+)%(,P)?\]/g; // filename__[20%,30%].ext / filename__[20%,30%,P].ext
    const matches = str.matchAll(regexp);
    const matchesArr = [ ...matches ];

    if (matchesArr.length) {
      imagePercentXY = {
        imagePercentX: matchesArr[0][1],
        imagePercentY: matchesArr[0][2]
      };
    }

    return imagePercentXY;
  }

  /**
   * @function getFlagsFromSrc
   * @summary Get any flags stored in the filename
   * @param {object} args - Arguments
   * @param {string} args.src - Image src
   * @param {string} args.title - Image title
   * @returns {object} imageFlags
   * @memberof FmcCroppersUi
   */
  getFlagsFromSrc({ src, title }) {
    FmcUi.log('FmcCroppersUi.getFlagsFromSrc', { src, title });

    const str = src || title;
    let imageFlags = {};

    const regexp = /\[([0-9]+)%,([0-9]+)%,?(P)?\]/g; // filename__[20%,30%].ext / filename__[20%,30%,P].ext
    const matches = str.matchAll(regexp);
    const matchesArr = [ ...matches ];

    if (matchesArr.length) {
      imageFlags = {
        panorama: matchesArr[0][3] ? true : false // eslint-disable-line no-unneeded-ternary
      };
    }

    return imageFlags;
  }

  /**
   * @function getResizedImageCenterXY
   * @summary Get the center point of the resized image
   * @param {string} fileName - Image file name and path
   * @param {number} resizeW - Resize width
   * @param {number} resizeH - Resize height
   * @returns {Promise<object>} { centerX, centerY }
   * @memberof FmcCroppersUi
   */
  async getResizedImageCenterXY(fileName, resizeW, resizeH) {
    FmcUi.log('FmcCroppersUi.await getResizedImageCenterXY', fileName, resizeW, resizeH);
    const {
      masterCropper
    } = this;

    const { Title } = await FmcCroppersUi.getImageTitle(fileName);

    const {
      imagePercentX = 50,
      imagePercentY = 50
    } = this.getImagePercentXYFromSrc({ src: fileName, title: Title });

    // calculate length of the missing side
    let _resizeW = resizeW;
    let _resizeH = resizeH;

    if ((resizeW === null) || (resizeH === null)) {
      const {
        naturalWidth,
        naturalHeight
      } = masterCropper.cropperInstance.getImageData();

      if ((resizeW === null) && (resizeH !== null)) {
        _resizeW = naturalWidth * (resizeH / naturalHeight);
      } else if ((resizeH === null) && (resizeW !== null)) {
        _resizeH = naturalHeight * (resizeW / naturalWidth);
      }
    }

    return {
      centerX: (_resizeW * (imagePercentX / 100)),
      centerY: (_resizeH * (imagePercentY / 100))
    };
  }

  /**
   * @function init
   * @summary Initialise cropper instances (master and slaves)
   * @memberof FmcCroppersUi
   */
  init() {
    FmcUi.log('FmcCroppersUi.init');
    const {
      imageSrc
    } = this;

    if (typeof imageSrc === 'undefined') {
      return;
    }

    this.setLoadingState(true);

    // prevent compounding arrays
    this.croppers = [];
    this.resizers = [];

    this.cropperImageElements.forEach(cropperImage => {
      const {
        cropperAction: action,
        cropperRole: role
      } = cropperImage.dataset;

      if ((role === 'master') || ((role === 'slave') && (action === 'resizeAndCrop'))) {
        const cropper = this.initCropper(cropperImage);

        this.croppers.push(cropper);
      } else if ((role === 'slave') && (action === 'resize')) {
        const resizer = this.initResizer(cropperImage);

        this.resizers.push(resizer);
      }
    });

    if (!this.croppers.length) {
      FmcUi.emitElementEvent('FmcCroppersUi.init', window, 'updateStatus', {
        statusMessage: 'Croppers could not be initialised',
        statusType: 'warning'
      });

      return;
    }

    this.masterCropper = this.croppers.filter(cropper => cropper.role === 'master')[0];
    this.slaveCroppers = this.croppers.filter(cropper => cropper.role === 'slave');

    FmcUi.emitElementEvent('FmcCroppersUi.init', window, 'updateLastCropperListener', { addListener: true });
    // if (typeof document.createElement('cropper').style.transition === 'undefined') {
    //   rotateEl.prop('disabled', true);
    // }
  }

  /**
   * @function initCropper
   * @summary Initialise cropper instance
   * @param {HTMLElement} cropperImage - Cropper image
   * @returns { object } cropper - Object containing cropperInstance
   * @memberof FmcCroppersUi
   */
  initCropper(cropperImage) {
    FmcUi.log('FmcCroppersUi.initCropper', cropperImage);
    const {
      imageSrc
    } = this;

    const {
      cropperAction: action,
      cropperExportWidth, // undefined for role="master"
      cropperExportHeight, // undefined for role="master"
      cropperExportIf: exportIf,
      cropperExportMarker = 'false',
      cropperExportSuffix: exportSuffix,
      cropperLabel: label,
      cropperRole: role
    } = cropperImage.dataset;

    // resizing based on a known width but unknown (null) height (and vice versa)
    const exportWidth = ((cropperExportWidth === 'null') || (typeof cropperExportWidth === 'undefined')) ? null : Number(cropperExportWidth);
    const exportHeight = ((cropperExportHeight === 'null') || (typeof cropperExportHeight === 'undefined')) ? null : Number(cropperExportHeight);

    this.injectHeading(cropperImage, label, exportWidth, exportHeight);

    cropperImage.setAttribute('src', imageSrc);

    const cropperOptions = this.getCropperOptions(exportWidth, exportHeight, role, action);
    const cropperInstance = new Cropper(cropperImage, cropperOptions);

    const cropper = {
      cropperInstance,
      action,
      exportWidth,
      exportHeight,
      exportIf,
      exportSuffix,
      label,
      marker: cropperExportMarker === 'true',
      role
    };

    return cropper;
  }

  /**
   * @function initResizer
   * @summary Initialise resizer instance
   * @param {HTMLElement} resizerImage - Resizer image
   * @returns { object } resizer
   * @memberof FmcCroppersUi
   */
  initResizer(resizerImage) {
    // TODO Convert resizer to a class
    FmcUi.log('FmcCroppersUi.initResizer', resizerImage);
    const {
      imageSrc
    } = this;

    const {
      cropperAction: action,
      cropperExportWidth,
      cropperExportHeight,
      cropperExportIf: exportIf,
      cropperExportMarker = 'false',
      cropperExportSuffix: exportSuffix,
      cropperLabel: label,
      cropperRole: role
    } = resizerImage.dataset;

    // resizing based on a known width but unknown (null) height (and vice versa)
    const exportWidth = (cropperExportWidth === 'null') ? null : Number(cropperExportWidth);
    const exportHeight = (cropperExportHeight === 'null') ? null : Number(cropperExportHeight);

    this.injectHeading(resizerImage, label, exportWidth, exportHeight);

    resizerImage.setAttribute('src', imageSrc);

    const resizer = {
      action,
      exportWidth,
      exportHeight,
      exportIf,
      exportSuffix,
      label,
      marker: cropperExportMarker === 'true',
      role
    };

    return resizer;
  }

  /**
   * @function injectHeading
   * @summary Inject a heading element above a cropper image
   * @param {HTMLElement} cropperImage - Cropper image
   * @param {string} label - Cropper label
   * @param {number|null} exportWidth - Export width
   * @param {number|null} exportHeight - Export height
   * @returns {HTMLElement} heading element
   * @memberof FmcCroppersUi
   */
  injectHeading(cropperImage, label, exportWidth, exportHeight) {
    // FmcUi.log('FmcCroppersUi.injectHeading', cropperImage, label, exportWidth, exportHeight);
    const parent = cropperImage.parentElement;
    let heading = parent.querySelector('h2');

    const _exportWidth = (exportWidth !== null) ? exportWidth : '?';
    const _exportHeight = (exportHeight !== null) ? exportHeight : '?';
    const whStr = ((_exportWidth === '?') && (_exportHeight === '?')) ? '' : ` (${_exportWidth} x ${_exportHeight})`;

    const labelText = `${label}${whStr}`;

    if (!heading) {
      const headingText = document.createTextNode(labelText);

      heading = document.createElement('h2');
      heading.appendChild(headingText);
      parent.insertBefore(heading, cropperImage);
    }

    return heading;
  }

  /**
   * @function moveCropperCropBoxToPageXY
   * @summary Move the cropbox to the location where the page was clicked
   * @param {object} args - Method arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @memberof FmcCroppersUi
   */
  moveCropperCropBoxToPageXY({ pageX, pageY }) {
    // TODO This sometimes needs to be clicked twice, needs to support a shaky hand (#5)
    // TODO Also support end of dragging
    FmcUi.log('FmcCroppersUi.moveCropperCropBoxToPageXY', { pageX, pageY });
    const {
      croppers,
      masterCropper
    } = this;

    const cropperWasDragged = this.masterCropperCropBoxWasDragged;

    this.masterCropperCropBoxWasDragged = false;

    const slaveCroppers = croppers.filter(cropper => cropper.role === 'slave');

    const {
      top: masterCropperCanvasOffsetTop
    } = this.calcCanvasOffsets();

    const {
      left: masterCropperCanvasLeft
    } = masterCropper.cropperInstance.getCanvasData();

    if (!cropperWasDragged) {
      // two step process for visual awareness of rounding process

      // move the cropper to the click location
      this.moveMasterCropperCropBoxToPageXY({
        pageX,
        pageY
      });

      slaveCroppers.forEach(cropper => {
        const {
          cropperInstance
        } = cropper;

        this.moveSlaveCropperCropBoxToPageXY({
          cropper: cropperInstance,
          masterCropperCanvasLeft,
          masterCropperCanvasOffsetTop,
          pageX,
          pageY
        });
      });
    }
  }

  /**
   * @function moveMasterCropperCropBoxToPageXY
   * @summary When the canvas is clicked, move the crop box on the master cropper so it centers on the pointer location
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X (corresponding to a rounded percent)
   * @param {number} args.pageY - Page Y (corresponding to a rounded percent)
   * @memberof FmcCroppersUi
   */
  moveMasterCropperCropBoxToPageXY({ pageX, pageY }) {
    FmcUi.log('FmcCroppersUi.moveMasterCropperCropBoxToPageXY', { pageX, pageY });
    const {
      masterCropper
    } = this;

    const {
      cropBoxX,
      cropBoxY
    } = this.calcCropBoxXYFromPageXY({ pageX, pageY });

    masterCropper.cropperInstance.setCropBoxData({
      top: cropBoxY,
      left: cropBoxX
    });
  }

  /**
   * @function moveSlaveCropperCropBoxToPageXY
   * @summary Move the crop box on the dependent cropper
   * @param {object} args - Arguments
   * @param {object} args.cropper - Slave cropper
   * @param {number} args.masterCropperCanvasLeft - gap between edge of viewport and start of master image
   * @param {number} args.masterCropperCanvasOffsetTop - Height of preceding UI
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @memberof FmcCroppersUi
   */
  moveSlaveCropperCropBoxToPageXY({
    cropper,
    masterCropperCanvasLeft,
    masterCropperCanvasOffsetTop,
    pageX,
    pageY
  }) {
    FmcUi.log('FmcCroppersUi.moveSlaveCropperCropBoxToPageXY', {
      cropper,
      masterCropperCanvasLeft,
      masterCropperCanvasOffsetTop,
      pageX,
      pageY
    });
    const {
      top: cropperCanvasTop // gap between top of column and start of slave image
    } = cropper.getCanvasData();

    const {
      width: cropperWidth,
      height: cropperHeight
    } = cropper.getCropBoxData();

    const cropBoxCenterX = this.scaleSlaveVal(cropper, pageX) - (cropperWidth / 2);
    const cropBoxCenterY = this.scaleSlaveVal(cropper, pageY) - (cropperHeight / 2);
    const croppercropBoxY = cropperCanvasTop + cropBoxCenterY - this.scaleSlaveVal(cropper, masterCropperCanvasOffsetTop);
    const croppercropBoxX = cropBoxCenterX - this.scaleSlaveVal(cropper, masterCropperCanvasLeft);

    cropper.setCropBoxData({
      top: croppercropBoxY,
      left: croppercropBoxX
    });
  }

  /**
   * @function resizeAndCropImage
   * @summary Resize and crop an image
   * @param {string} targetFolder - Target folder
   * @returns {Promise<string>} baseExportPath
   * @memberof FmcCroppersUi
   */
  async resizeAndCropImage(targetFolder) {
    FmcUi.log('FmcCroppersUi.resizeAndCropImage', targetFolder);
    const {
      masterCropper,
      resizers,
      slaveCroppers
    } = this;

    const cropsAndSizes = [];
    const fileName = masterCropper.cropperInstance.element.src;
    const { Title } = await FmcCroppersUi.getImageTitle(fileName);
    const flags = this.getFlagsFromSrc({ src: fileName, title: Title });

    const {
      panorama = false
    } = flags;

    slaveCroppers.forEach(async cropper => {
      const {
        exportWidth: resizeW,
        exportHeight: resizeH,
        exportIf,
        exportSuffix: fileNameSuffix,
        marker
      } = cropper;

      if ((exportIf === 'panorama') && !panorama) {
        return; // skip forEach iteration
      }

      if ((exportIf === '!panorama') && panorama) {
        return; // skip forEach iteration
      }

      const {
        x: cropX,
        y: cropY,
        width: cropW,
        height: cropH
      } = cropper.cropperInstance.getData();

      let centerX;
      let centerY;

      if (marker) {
        ({
          centerX,
          centerY
        } = await this.getResizedImageCenterXY(fileName, resizeW, resizeH));
      }

      cropsAndSizes.push({
        centerX,
        centerY,
        cropW,
        cropH,
        cropX,
        cropY,
        fileNameSuffix,
        marker,
        markerHex: '#00c800', // matches --color-checked-on
        markerStrokeW: 4,
        markerWH: 160,
        resizeH,
        resizeW
      });
    });

    resizers.forEach(async resizer => {
      const {
        exportWidth: resizeW,
        exportHeight: resizeH,
        exportIf,
        exportSuffix: fileNameSuffix,
        marker
      } = resizer;

      if ((exportIf === 'panorama') && !panorama) {
        return; // skip forEach iteration
      }

      if ((exportIf === '!panorama') && panorama) {
        return; // skip forEach iteration
      }

      let centerX;
      let centerY;

      if (marker) {
        ({
          centerX,
          centerY
        } = await this.getResizedImageCenterXY(fileName, resizeW, resizeH));
      }

      cropsAndSizes.push({
        centerX,
        centerY,
        fileNameSuffix,
        marker,
        markerHex: '#00c800', // matches --color-checked-on
        markerStrokeW: 4,
        markerWH: 160,
        resizeW,
        resizeH
      });
    });

    const {
      baseExportPath,
      counts
    } = await window.FmcFile.resizeAndCropImage({
      fileName,
      quality: 75,
      targetFolder,
      cropsAndSizes
    });

    FmcUi.emitElementEvent('FmcCroppersUi.resizeAndCropImage', window, 'updateStatus', {
      statusMessage: `Deleted ${counts.deletions} matching files. Generated ${counts.crops} crops and ${counts.resizes} sizes`,
      statusType: 'success'
    });

    return baseExportPath;
  }

  /**
   * @function deleteImagePercentXYFromImage
   * @summary Remove the focalpoint from the image filename or title
   * @returns {Promise<string>} msg
   * @memberof FmcCroppersUi
   */
  async deleteImagePercentXYFromImage() {
    // TODO check whether this also affects the title or not
    FmcUi.log('FmcCroppersUi.deleteImagePercentXYFromImage');
    const {
      croppers,
      masterCropper,
      selectors
    } = this;

    const {
      croppersId
    } = selectors;

    const fileName = masterCropper.cropperInstance.element.src;

    const msgObj = await window.FmcFile.deleteImagePercentXYFromImage({ fileName });

    const {
      statusMessage: newFileName
    } = msgObj;

    return new Promise(resolve => {
      if (fileName === newFileName) {
        resolve('Image filename does not contain a focalpoint');
      } else {
        // timeout prevents broken image
        setTimeout(() => {
          croppers.forEach(cropper => {
            cropper.cropperInstance.replace(newFileName, true); // hasSameSize = true
          });

          FmcUi.emitEvent(croppersId, 'imageRenamed', {
            newFileName
          });

          resolve('Removed focalpoint from image filename');
        }, 500);
      }
    });
  }

  /**
   * @function isDefaultFocalpoint
   * @summary Determine whether the supplied focalpoint settings are the defaults
   * @param {object} args - Arguments
   * @param {string|number} args.imagePercentX - Image percent X
   * @param {string|number} args.imagePercentY - Image percent Y
   * @param {string} args.imageProportions - Image proportions
   * @returns {boolean} isDefaultFocalpoint
   * @memberof FmcCroppersUi
   */
  isDefaultFocalpoint({ imagePercentX, imagePercentY, imageProportions }) {
    FmcUi.log('FmcCroppersUi.isDefaultFocalpoint', { imagePercentX, imagePercentY, imageProportions });
    const nX = Number(imagePercentX);
    const nY = Number(imagePercentY);

    return ((nX === 50) && (nY === 50) && (imageProportions === 'default'));
  }

  /**
   * @function reinstateImagePercentXYFromImage
   * @summary Update the XY fields from the focalpoint saved in the image filename or title
   * @memberof FmcCroppersUi
   */
  async reinstateImagePercentXYFromImage() {
    // TODO Fix - currently possible to enable both writeFilename and writeTitle - or neither
    FmcUi.log('FmcCroppersUi.reinstateImagePercentXYFromImage');
    const {
      elements,
      masterCropper
    } = this;

    const {
      focalpointProportionsRadios
    } = elements;

    const { src } = masterCropper.cropperInstance.element;
    const { Title } = await FmcCroppersUi.getImageTitle(src);

    if (src === '') {
      console.error(masterCropper.cropperInstance.element);
      throw new Error('masterCropper.cropperInstance.element has no src');
    }

    const {
      imagePercentX,
      imagePercentY
    } = this.getImagePercentXYFromSrc({ src, title: Title });

    const {
      panorama = false
    } = this.getFlagsFromSrc({ src, title: Title });

    FmcUi.emitElementEvent('FmcCroppersUi.isDefaultFocalpoint', window, 'updateFocalpointX', { value: imagePercentX });
    FmcUi.emitElementEvent('FmcCroppersUi.isDefaultFocalpoint', window, 'updateFocalpointY', { value: imagePercentY });

    // TODO reinstate as needed:
    // const focalpointYInputId = focalpointYInput.element.getAttribute('id');
    // FmcUi.emitEvent(focalpointYInputId, 'change', {
    //   focalpointReset: !(this.isDefaultFocalpoint({ imagePercentX, imagePercentY }))
    // });

    const proportionsSetting = panorama ? 'panorama' : 'default';

    focalpointProportionsRadios.forEach(radio => {
      radio.checked = (radio.value === proportionsSetting);
    });

    setTimeout(() => {
      this.setLoadingState(false);
    }, 500);
  }

  /**
   * @function scaleSlaveVal
   * @summary Slave croppers are smaller than the Master cropper. Scale down values derived from calculations on the Master cropper.
   * @param {object} slaveCropper - Slave cropper instance
   * @param {number} val - Value to scale
   * @returns {number} Scaled value
   * @memberof FmcCroppersUi
   */
  scaleSlaveVal(slaveCropper, val) {
    FmcUi.log('FmcCroppersUi.scaleSlaveVal', slaveCropper, val);
    const {
      masterCropper
    } = this;

    const {
      width: masterCropperImageWidth
    } = masterCropper.cropperInstance.getImageData();

    const {
      width: cropperImageWidth
    } = slaveCropper.getImageData();

    const scalingRatio = (cropperImageWidth / masterCropperImageWidth);

    return val * scalingRatio;
  }

  /**
   * @function setLoadingState
   * @summary Set the focalpoint cropbox to loading, which hides it via the CSS stylesheet
   * @param {boolean} loading - Loading
   * @memberof FmcCroppersUi
   */
  setLoadingState(loading) {
    FmcUi.log('FmcCroppersUi.setLoadingState', loading);
    const {
      selectors
    } = this;

    const {
      croppersId
    } = selectors;

    // container for the 4 croppers
    const croppersEl = document.getElementById(croppersId);

    if (loading) {
      croppersEl.dataset.cropperFocalpointLoading = 'true';
    } else {
      delete croppersEl.dataset.cropperFocalpointLoading;
    }
  }

  /**
   * @function setSaveState
   * @summary Set the focalpoint saved state to default|dirty|saved
   * @param {string} state - State (default|dirty|saved)
   * @memberof FmcCroppersUi
   */
  setSaveState(state) {
    FmcUi.log('FmcCroppersUi.setSaveState', state);
    const {
      selectors
    } = this;

    const {
      croppersId
    } = selectors;

    const croppersEl = document.getElementById(croppersId);

    croppersEl.dataset.cropperFocalpointSaveStatus = state;
  }

  /**
   * @function validateCroppersImage
   * @summary Check that the croppers' image src is valid
   * @returns {boolean} valid
   * @memberof FmcCroppersUi
   */
  validateCroppersImage() {
    FmcUi.log('FmcCroppersUi.validateCroppersImage');
    const {
      selectors
    } = this;

    const {
      croppersId
    } = selectors;

    const cropperImages = document.querySelectorAll(`#${croppersId} .cropper-image`);
    let isValid = true;

    if (!cropperImages.length) {
      isValid = false;
    }

    cropperImages.forEach(cropperImage => {
      if (cropperImage.getAttribute('src') === null) {
        isValid = false;
      } else if (cropperImage.getAttribute('src').indexOf('/undefined') !== -1) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * @function formatDateTimeOriginalForPhotosApp
   * @summary Reformat the value of the EXIF DateTimeOriginal tag to a string suitable for searching in Photos.app
   * @param {object} DateTimeOriginal - DateTimeOriginal
   * @param {string} dateTimeOriginalAsDate - dateTimeOriginalAsDate
   * @returns {object} { date }
   * @memberof FmcCroppersUi
   */
  formatDateTimeOriginalForPhotosApp(DateTimeOriginal, dateTimeOriginalAsDate) {
    const {
      year,
      month,
      day,
      hour,
      minute,
      second
    } = DateTimeOriginal;

    const hour12 = hour > 12 ? (hour - 12) : hour;
    const minuteStr = minute.toString().padStart(2, '0');
    const secondStr = second.toString().padStart(2, '0');

    const date = dateTimeOriginalAsDate;

    const dayIndex = date.getDay();

    const dayName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][dayIndex];

    const monthName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ][month - 1];

    const ampm = hour < 12 ? 'AM' : 'PM';

    // AppleScript retrieves photo "date" in this format:
    // "Friday, 12 May 2017 at 11:55:19 AM"
    return `${dayName}, ${day} ${monthName} ${year} at ${hour12}:${minuteStr}:${secondStr} ${ampm}`;
  }

  /**
   * @function writeImagePercentXYToImage
   * @summary Save the values to the image filename
   * @param {object} args - Arguments
   * @param {string} args.imageFlags - Image flags (comma separated)
   * @param {string} args.imagePercentX - Image percentage X
   * @param {string} args.imagePercentY - Image percentage Y
   * @returns {Promise<object>} { msg, type }
   * @memberof FmcCroppersUi
   */
  async writeImagePercentXYToImage({
    imageFlags,
    imagePercentX,
    imagePercentY
  }) {
    // TODO update to match setFocalpointSaveState
    FmcUi.log('FmcCroppersUi.writeImagePercentXYToImage', {
      imageFlags,
      imagePercentX,
      imagePercentY
    });
    const {
      croppers,
      elements,
      masterCropper,
      selectors
    } = this;

    const {
      croppersId
    } = selectors;

    const {
      focalpointWriteFilenameRadios,
      focalpointWriteTitleRadios
    } = elements;

    const writeFilename = (focalpointWriteFilenameRadios.getState() === 'on');
    const writeTitle = (focalpointWriteTitleRadios.getState() === 'on');
    let imageFlagsPrefix = imageFlags.length ? ',' : '';
    let newFileNameAndExtClean;
    let newFileNameWithPath;
    let oldFileNameAndExtClean;
    let oldFileNameWithPath;
    let errorMsg = '';

    // an 'out of range' user input such as 'xx' will be input as ''
    // although the change event may not actually fire in this case
    if ((imagePercentX === '') || (imagePercentY === '')) {
      errorMsg = 'Input out of range - focalpoint not saved to filename';
    } else if (typeof masterCropper === 'undefined') {
      errorMsg = 'Cannot write Image Percent XY To Image - masterCropper does not exist yet';
    } else {
      const fileName = masterCropper.cropperInstance.element.src;

      // cannot place await inside promise
      const fileNameParts = await window.FmcFile.getFileNameParts({ fileName });

      const {
        extName,
        fileNameAndExtClean,
        folderPathAndFileNameAndExtClean,
        fileNameOnlyCleanNoRegex,
        folderPath
      } = fileNameParts;

      newFileNameAndExtClean = `${fileNameOnlyCleanNoRegex}__[${imagePercentX}%,${imagePercentY}%${imageFlagsPrefix}${imageFlags}]${extName}`;
      newFileNameWithPath = `${folderPath}/${newFileNameAndExtClean}`;
      oldFileNameAndExtClean = fileNameAndExtClean;
      oldFileNameWithPath = folderPathAndFileNameAndExtClean;

      if (writeTitle) {
        const data = await window.FmcFile.exiftool({
          method: 'read',
          fileNameWithPath: oldFileNameWithPath
        });

        const { tags } = data;

        const { DateTimeOriginal } = tags;

        let photosAppDate;
        let dateTimeOriginalAsDate;

        if (typeof DateTimeOriginal !== 'undefined') {
          const {
            year,
            month,
            day,
            hour,
            minute,
            second
          } = DateTimeOriginal;

          dateTimeOriginalAsDate = new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`);

          photosAppDate = this.formatDateTimeOriginalForPhotosApp(DateTimeOriginal, dateTimeOriginalAsDate);
        }

        if ((typeof DateTimeOriginal !== 'undefined') && (typeof dateTimeOriginalAsDate !== 'undefined')) {
          photosAppDate = this.formatDateTimeOriginalForPhotosApp(DateTimeOriginal, dateTimeOriginalAsDate);
        }

        if (photosAppDate.length) {
          await window.FmcFile.exiftool({
            method: 'write',
            fileNameWithPath: oldFileNameWithPath,
            exifData: { Title: newFileNameAndExtClean }
          });

          await window.FmcFile.setTitleInPhotosApp({
            imageName: fileNameOnlyCleanNoRegex,
            title: newFileNameAndExtClean,
            date: photosAppDate
          });
        }
      }

      if (writeFilename && (newFileNameAndExtClean !== oldFileNameAndExtClean)) {
        // TODO this one might not be an error
        await window.FmcFile.renameSync({ oldFileNameWithPath, newFileNameWithPath });

        // TODO emit to update fields
      }

      // if (newFileName === '') {
      //   errorMsg = 'Input out of range - focalpoint not saved to filename'; // TODO
      // }
    }

    return new Promise(resolve => {
      if (errorMsg !== '') {
        resolve({
          statusMessage: errorMsg,
          statusType: 'warning'
        });
      } else if (writeTitle && (newFileNameAndExtClean !== oldFileNameAndExtClean)) {
        resolve({
          statusMessage: 'Saved focalpoint to file title and Photos App',
          statusType: 'success'
        });
      } else if (writeFilename && (newFileNameAndExtClean !== oldFileNameAndExtClean)) {
        // timeout prevents broken image
        setTimeout(() => {
          croppers.forEach(cropper => {
            console.log('Change cropper src to ', newFileNameWithPath);
            cropper.cropperInstance.replace(newFileNameWithPath, true); // hasSameSize = true
          });

          // TODO what does this do?
          FmcUi.emitEvent(croppersId, 'imageRenamed', { newFileName: newFileNameWithPath });

          // TODO update to save to title or combine with setFocalpointSaveState
          resolve({
            statusMessage: 'Saved focalpoint to filename',
            statusType: 'success'
          });
        }, 500);
      } else {
        resolve({
          statusMessage: 'Focalpoint already saved to filename'
        });
      }
    });
  }

  /* Static methods */

  /**
   * @function getImageTitle
   * @summary Get the image Title from its EXIF data
   * @param {string} imagePath - Image path
   * @returns {Promise<object>} { Title }
   * @memberof FmcCroppersUi
   * @static
   */
  static async getImageTitle(imagePath) {
    const fileNameParts = await window.FmcFile.getFileNameParts({ fileName: imagePath });

    const {
      folderPathAndFileNameAndExtClean
    } = fileNameParts;

    const data = await window.FmcFile.exiftool({
      method: 'read',
      fileNameWithPath: folderPathAndFileNameAndExtClean
    });

    const {
      tags
    } = data;

    const {
      Title = ''
    } = tags;

    return {
      Title
    };
  }
}
