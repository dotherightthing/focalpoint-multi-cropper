/**
 * @file CrCroppersUi.js
 */
import dtrtValidate from 'dtrt-type-validate';
import { CrDebugUi } from './CrDebugUi.mjs';
import { CrUtilsUi } from './CrUtilsUi.mjs';

export class CrCroppersUi { // eslint-disable-line no-unused-vars
  /**
   * @class CrCroppersUi
   * @summary Manages croppers component, containing instances of cropperjs
   * @param {object} config - Instance config
   * @public
   * @todo Add a subscribe method
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      controlIds,
      Cropper,
      cropperCanvasClass,
      cropperImageClass,
      croppersId,
      croppersOptions,
      initDelay,
      updateDelay
    } = config;

    Object.assign(this, {
      controlIds,
      Cropper,
      cropperCanvasClass,
      cropperImageClass,
      croppersId,
      croppersOptions,
      initDelay,
      updateDelay
    });

    // assign Expando property to expose methods during E2E testing
    document.getElementById(croppersId).crCroppersUi = this;

    this.croppers = [];
    this.masterCropperCropBoxWasDragged = false;
  }

  /* Getters and Setters */

  /**
   * controlIds
   * @type {object}
   * @memberof CrCroppersUi
   */
  get controlIds() {
    return this._controlIds;
  }

  set controlIds(controlIds) {
    this._controlIds = dtrtValidate.validate(controlIds, 'object', 'CrCroppersUi.controlIds');
  }

  /**
   * Cropper
   * @type {Function}
   * @memberof CrCroppersUi
   */
  get Cropper() {
    return this._Cropper;
  }

  set Cropper(Cropper) {
    this._Cropper = dtrtValidate.validate(Cropper, 'function', 'CrCroppersUi.Cropper');
  }

  /**
   * cropperCanvasClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get cropperCanvasClass() {
    return this._cropperCanvasClass;
  }

  set cropperCanvasClass(cropperCanvasClass) {
    this._cropperCanvasClass = dtrtValidate.validate(cropperCanvasClass, 'string', 'CrCroppersUi.cropperCanvasClass');
  }

  /**
   * cropperImageClass
   * @type {string}
   * @memberof CrCroppersUi
   */
  get cropperImageClass() {
    return this._cropperImageClass;
  }

  set cropperImageClass(cropperImageClass) {
    this._cropperImageClass = dtrtValidate.validate(cropperImageClass, 'string', 'CrCroppersUi.cropperImageClass');
  }

  /**
   * croppersId
   * @type {string}
   * @memberof CrCroppersUi
   */
  get croppersId() {
    return this._croppersId;
  }

  set croppersId(croppersId) {
    this._croppersId = dtrtValidate.validate(croppersId, 'string', 'CrCroppersUi.croppersId');
  }

  /**
   * croppersOptions
   * @type {object}
   * @memberof CrCroppersUi
   */
  get croppersOptions() {
    return this._croppersOptions;
  }

  set croppersOptions(croppersOptions) {
    this._croppersOptions = dtrtValidate.validate(croppersOptions, 'object', 'CrCroppersUi.croppersOptions');
  }

  /**
   * imageSrc
   * @type {string}
   * @memberof CrCroppersUi
   */
  get imageSrc() {
    return this._imageSrc;
  }

  set imageSrc(imageSrc) {
    this._imageSrc = dtrtValidate.validate(imageSrc, 'string', 'CrCroppersUi.imageSrc');
  }

  /**
   * initDelay
   * @type {number}
   * @memberof CrCroppersUi
   */
  get initDelay() {
    return this._initDelay;
  }

  set initDelay(initDelay) {
    this._initDelay = dtrtValidate.validate(initDelay, 'number', 'CrCroppersUi.initDelay');
  }

  /**
   * masterCropper
   * @summary The object containing the master cropper instance
   * @type {object}
   * @memberof CrCroppersUi
   */
  get masterCropper() {
    return this._masterCropper;
  }

  set masterCropper(masterCropper) {
    this._masterCropper = dtrtValidate.validate(masterCropper, 'object', 'CrCroppersUi.masterCropper');
  }

  /**
   * masterCropperCropBoxWasDragged
   * @summary Tracks whether the cropbox was dragged
   * @type {boolean}
   * @memberof CrCroppersUi
   */
  get masterCropperCropBoxWasDragged() {
    return this._masterCropperCropBoxWasDragged;
  }

  set masterCropperCropBoxWasDragged(masterCropperCropBoxWasDragged) {
    this._masterCropperCropBoxWasDragged = dtrtValidate.validate(masterCropperCropBoxWasDragged, 'boolean', 'CrCroppersUi.masterCropperCropBoxWasDragged');
  }

  /**
   * slaveCroppers
   * @summary An array of objects, each containing a slave cropper instance
   * @type {Array}
   * @memberof CrCroppersUi
   */
  get slaveCroppers() {
    return this._slaveCroppers;
  }

  set slaveCroppers(slaveCroppers) {
    this._slaveCroppers = dtrtValidate.validate(slaveCroppers, 'Array', 'CrCroppersUi.slaveCroppers');
  }

  /**
   * updateDelay
   * @type {number}
   * @memberof CrCroppersUi
   */
  get updateDelay() {
    return this._updateDelay;
  }

  set updateDelay(updateDelay) {
    this._updateDelay = dtrtValidate.validate(updateDelay, 'number', 'CrCroppersUi.updateDelay');
  }

  /* Instance methods */

  /**
   * @function displayFocalpoint
   * @summary Show focalpoint in UI
   * @param {object} args - Arguments
   * @param {number} args.imagePercentY - Image percentage top
   * @param {number} args.imagePercentX - Image percentage left
   * @memberof CrCroppersUi
   * @todo Reset position is incorrect for image #5
   */
  displayFocalpoint({ imagePercentY, imagePercentX }) {
    const {
      croppersId,
      masterCropper
    } = this;

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

    CrUtilsUi.emitEvent(croppersId, 'paramChange', {
      element: masterCropper,
      parameter: 'image.focalpoint_x',
      value: imagePercentX
    });

    CrUtilsUi.emitEvent(croppersId, 'paramChange', {
      element: masterCropper,
      parameter: 'image.focalpoint_y',
      value: imagePercentY
    });

    this.moveCropperCropBoxToPageXY({ pageX, pageY });
  }

  /**
   * @function calcCanvasOffsets
   * @summary cropper.getCanvasData().top ignores preceding UI and returns 0, this function returns the actual offset
   * @returns {object} { top, left }
   * @memberof CrCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcCanvasOffsets() {
    const {
      cropperCanvasClass,
      masterCropper
    } = this;

    const {
      element: cropperImage
    } = masterCropper.cropperInstance;

    const cropperContainerEl = cropperImage.nextSibling;
    const cropperCanvasEl = cropperContainerEl.querySelector(`.${cropperCanvasClass}`);

    const { top } = CrUtilsUi.getOffset(cropperCanvasEl);
    const { left } = masterCropper.cropperInstance.getCanvasData();

    return { top, left };
  }

  /**
   * @function calcCropBoxXYFromPageXY
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @returns {object} { cropBoxX, cropBoxY }
   * @memberof CrCroppersUi
   */
  calcCropBoxXYFromPageXY({ pageX, pageY }) {
    const { masterCropper } = this;

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
   * @param {object} args - Arguments
   * @param {number} args.imagePercentX - Image percentage left
   * @param {number} args.imagePercentY -  Image percentage top
   * @returns {object} { imageX, imageY }
   * @memberof CrCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImageXYFromImagePercentXY({ imagePercentX, imagePercentY }) {
    const { masterCropper } = this;

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
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @returns {object} { imageX, imageY }
   * @memberof CrCroppersUi
   */
  calcImageXYFromPageXY({ pageX, pageY }) {
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
   * @memberof CrCroppersUi
   */
  calcPageXYForRoundedImagePercentXY({ pageXRaw, pageYRaw }) {
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
   * @param {object} args - Arguments
   * @param {number} args.imageX - Image X
   * @param {number} args.imageY - Image Y
   * @returns {object} { pageX, pageY }
   * @memberof CrCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcPageXYFromImageXY({ imageX, imageY }) {
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
   * @memberof CrCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImagePercentXYFromImageXorY({ imageXorY, dimensionLength, round = false }) {
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
   * @param {object} args - Arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @param {boolean} args.round - Round the result to the nearest whole number
   * @returns {object} { imagePercentX, imagePercentY }
   * @memberof CrCroppersUi
   * @see {@link cypress/e2e/electron-spec.cy.js}
   */
  calcImagePercentXYFromPageXY({ pageX, pageY, round = false }) {
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
   * @param {HTMLElement} target - Image element
   * @memberof CrCroppersUi
   */
  changeSourceImage(target) {
    const newImage = target.querySelector('img');
    const newImageSrc = newImage.getAttribute('src');

    // TODO if exists
    this.destroy();

    this.imageSrc = newImageSrc;
    this.init();
  }

  /**
   * @function destroy
   * @summary Destroy instances of cropperjs
   * @memberof CrCroppersUi
   */
  destroy() {
    const { croppers } = this;

    croppers.forEach(cropper => {
      const { cropperInstance } = cropper;

      if (cropperInstance) {
        cropperInstance.destroy();
      }
    });

    this.croppers = [];
  }

  /**
   * @function getCropCoordinatesFromImage
   * @summary Get the crop coordinates stored in the filename
   * @returns {object} position
   * @memberof CrCroppersUi
   */
  getCropCoordinatesFromImage() {
    const { masterCropper } = this;
    let position = {};

    const masterCropperImageSrc = masterCropper.cropperInstance.element.src;

    const regexp = /\[([0-9]+)%,([0-9]+)%\]/g; // filename__[20%,30%].ext
    const matches = masterCropperImageSrc.matchAll(regexp);
    const matchesArr = [ ...matches ];

    if (matchesArr.length) {
      position = {
        imagePercentX: matchesArr[0][1],
        imagePercentY: matchesArr[0][2]
      };
    }

    return position;
  }

  /**
   * @function getCropperOptions
   * @param {string} cropperAspectRatio - Cropper Aspect Ratio
   * @param {string} isCropperMaster - Is Cropper Master?
   * @returns {object} options
   * @memberof CrCroppersUi
   */
  getCropperOptions(cropperAspectRatio, isCropperMaster) {
    const {
      croppersId,
      croppersOptions
    } = this;

    const options = { ...croppersOptions };

    if (isCropperMaster) {
      Object.assign(options, {
        autoCropArea: 0.2, // size of circular cropbox (20%)
        cropBoxMovable: true,
        guides: false,
        movable: true,
        // crop - fires during move, then after cropend
        // cropstart - occurs on mouse down, so before a click AND before a move
        cropmove: () => {
          this.masterCropperCropBoxWasDragged = true; // differentiate between a click and a move
        },
        cropend: (e) => { // dragEnd callback, see https://github.com/fengyuanchen/cropperjs/issues/669; fires after move
          const {
            masterCropper,
            updateDelay
          } = this;

          const {
            pageX: pageXRaw,
            pageY: pageYRaw
          } = e.detail.originalEvent;

          const pageXYRaw = {
            pageX: pageXRaw,
            pageY: pageYRaw
          };

          const pageXYRounded = this.calcPageXYForRoundedImagePercentXY({ pageXRaw, pageYRaw });

          [ pageXYRaw, pageXYRounded ].forEach((pageXY, i) => {
            const { pageX, pageY } = pageXY;
            const isPageXYRounded = i > 0;

            const {
              imagePercentX,
              imagePercentY
            } = this.calcImagePercentXYFromPageXY({ pageX, pageY, round: isPageXYRounded });

            setTimeout(() => {
              this.moveCropperCropBoxToPageXY({ pageX, pageY });

              CrUtilsUi.emitEvent(croppersId, 'paramChange', {
                element: masterCropper,
                parameter: 'image.focalpoint_x',
                value: imagePercentX
              });

              CrUtilsUi.emitEvent(croppersId, 'paramChange', {
                element: masterCropper,
                parameter: 'image.focalpoint_y',
                value: imagePercentY
              });

              CrUtilsUi.emitEvent(croppersId, 'statusChange', {
                msg: isPageXYRounded ? '' : 'Rounding percentages for storage...'
              });
            }, isPageXYRounded ? updateDelay : 0);
          });
        }
      });
    }

    const [ a, b ] = cropperAspectRatio.split(':');

    Object.assign(options, { aspectRatio: a / b });

    return options;
  }

  /**
   * @function getMasterCropper
   * @summary Get the object for the master cropper (which contains the cropperInstance)
   * @returns {object} { cropperInstance, isMaster, outputIds }
   * @memberof CrCroppersUi
   */
  getMasterCropper() {
    const { croppers } = this;

    const masterCroppers = croppers.filter(cropper => cropper.isMaster);

    return masterCroppers[0];
  }

  /**
   * @function getSlaveCroppers
   * @summary Get an array of slave croppers (containing objects which include the cropperInstance)
   * @returns {Array} slaveCroppers
   * @memberof CrCroppersUi
   */
  getSlaveCroppers() {
    const { croppers } = this;

    const slaveCroppers = croppers.filter(cropper => typeof cropper.isMaster === 'undefined');

    return slaveCroppers;
  }

  /**
   * @function init
   * @summary Initialise cropper instances (master and slaves)
   * @memberof CrCroppersUi
   */
  init() {
    const {
      croppersId,
      imageSrc,
      initDelay
    } = this;

    if (typeof imageSrc === 'undefined') {
      return;
    }

    // these are the images used by the 4 croppers
    // they start off with no src
    // when an image appears, what you see is the cropper - not the img
    const cropperImages = document.querySelectorAll(`#${croppersId} img`);
    this.croppers = [];

    cropperImages.forEach((cropperImage, cropperIndex) => {
      this.initCropper(cropperImage, cropperIndex);
    });

    if (!this.croppers.length) {
      CrUtilsUi.emitEvent(croppersId, 'statusChange', {
        msg: 'Croppers could not be initialised'
      });

      return;
    }

    this.masterCropper = this.getMasterCropper();
    this.slaveCroppers = this.getSlaveCroppers();

    // if (typeof document.createElement('cropper').style.transition === 'undefined') {
    //   rotateEl.prop('disabled', true);
    // }

    // prevent position reset when visually debugging e2e tests via npx cypress open
    if (typeof Cypress === 'undefined') {
      setTimeout(() => {
        this.resetFocalpoint();

        const position = this.readFocalpointFromImage();

        this.displayFocalpoint(position);
      }, initDelay);
    }
  }

  /**
   * @function initCropper
   * @summary Initialise cropper instance
   * @param {HTMLElement} cropperImage - Cropper image
   * @param {number} cropperIndex - Cropper index
   * @returns { object } cropper - Object containing cropperInstance
   * @memberof CrCroppersUi
   */
  initCropper(cropperImage, cropperIndex) {
    const {
      Cropper,
      croppersId,
      imageSrc
    } = this;

    const {
      cropperAspectRatio,
      cropperLabel,
      isCropperMaster
    } = cropperImage.dataset;

    this.injectHeading(cropperImage, cropperLabel);

    cropperImage.setAttribute('src', imageSrc);

    const cropperOptions = this.getCropperOptions(cropperAspectRatio, isCropperMaster);
    const cropperInstance = new Cropper(cropperImage, cropperOptions);

    this.croppers.push({
      cropperInstance,
      isMaster: isCropperMaster
    });

    if (cropperIndex === 0) {
      CrUtilsUi.emitEvent(croppersId, 'createdMasterCropper', {
        cropperInstance,
        cropperOptions
      });
    } else {
      CrUtilsUi.emitEvent(croppersId, 'createdSlaveCropper', {
        cropperInstance,
        cropperOptions,
        cropperIndex
      });
    }

    return {
      cropperInstance,
      isMaster: isCropperMaster
    };
  }

  /**
   * @function injectHeading
   * @param {HTMLElement} cropperImage - Cropper image
   * @param {string} cropperLabel - Cropper label
   * @returns {HTMLElement} heading element
   * @memberof CrCroppersUi
   */
  injectHeading(cropperImage, cropperLabel) {
    const parent = cropperImage.parentNode;

    let heading = parent.querySelector('h2');

    if (!heading) {
      const headingText = document.createTextNode(cropperLabel);

      heading = document.createElement('h2');
      heading.appendChild(headingText);
      parent.insertBefore(heading, cropperImage);
    }

    return heading;
  }

  /**
   * @function moveCropperCropBoxToPageXY
   * @param {object} args - Method arguments
   * @param {number} args.pageX - Page X
   * @param {number} args.pageY - Page Y
   * @memberof CrCroppersUi
   * @todo This sometimes needs to be clicked twice, needs to support a shaky hand (#5)
   * @todo Also support end of dragging
   */
  moveCropperCropBoxToPageXY({ pageX, pageY }) {
    const {
      masterCropper
    } = this;

    const cropperWasDragged = this.masterCropperCropBoxWasDragged;

    this.masterCropperCropBoxWasDragged = false;

    const slaveCroppers = this.getSlaveCroppers(); // arr

    const {
      top: masterCropperCanvasOffsetTop
      // left: masterCropperCanvasOffsetLeft
    } = this.calcCanvasOffsets();

    const {
      top: masterCropperCanvasTop,
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
          pageX,
          pageY,
          masterCropperCanvasOffsetTop,
          masterCropperCanvasTop,
          masterCropperCanvasLeft
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
   * @memberof CrCroppersUi
   */
  moveMasterCropperCropBoxToPageXY({ pageX, pageY }) {
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
   * @memberof CrCroppersUi
   */
  moveSlaveCropperCropBoxToPageXY({
    cropper,
    masterCropperCanvasLeft,
    masterCropperCanvasOffsetTop,
    pageX,
    pageY
  }) {
    const {
      top: cropperCanvasTop // gap between top of column and start of slave image
    } = cropper.getCanvasData();

    const {
      width: cropperWidth,
      height: cropperHeight
    } = cropper.getCropBoxData();

    const cropBoxCenterX = this.scaleSlaveVal(cropper, pageX) - (cropperWidth / 2);
    const cropBoxCenterY = this.scaleSlaveVal(cropper, pageY) - (cropperHeight / 2);
    const croppercropBoxY = cropperCanvasTop + cropBoxCenterY - this.scaleSlaveVal(cropper, masterCropperCanvasOffsetTop); // eslint-disable-line max-len
    const croppercropBoxX = cropBoxCenterX - this.scaleSlaveVal(cropper, masterCropperCanvasLeft);

    cropper.setCropBoxData({
      top: croppercropBoxY,
      left: croppercropBoxX
    });
  }

  /**
   * @function readFocalpointFromImage
   * @summary Read focal point position from filename
   * @returns {object} { imagePercentY, imagePercentX }
   * @memberof CrCroppersUi
   * @todo Finish - this is only placeholder code for testing purposes.
   */
  readFocalpointFromImage() {
    const { croppersId } = this;

    CrUtilsUi.emitEvent(croppersId, 'statusChange', {
      msg: 'Loaded focal point from image'
    });

    return {
      imagePercentY: 50,
      imagePercentX: 50
    };
  }

  /**
   * @function removeCropCoordinatesFromImage
   * @memberof CrCroppersUi
   * @static
   */
  async removeCropCoordinatesFromImage() {
    const {
      controlIds,
      croppersId,
      masterCropper
    } = this;

    const { deleteCropCoordinates } = controlIds;

    const fileName = masterCropper.cropperInstance.element.src;

    document.getElementById(deleteCropCoordinates).disabled = true;

    const newFileName = await window.electronAPI.deleteCropCoordinates({
      fileName
    });

    document.getElementById(deleteCropCoordinates).disabled = false;

    masterCropper.cropperInstance.element.src = `file://${newFileName.replaceAll(' ', '%20')}`;

    CrUtilsUi.emitEvent(croppersId, 'statusChange', {
      msg: `Renamed ${fileName} to ${newFileName}`
    });

    CrUtilsUi.emitEvent(croppersId, 'imageRenamed', {
      newFileName
    });
  }

  /**
   * @function resetFocalpoint
   * @summary Set default focal point position
   * @memberof CrCroppersUi
   */
  resetFocalpoint() {
    const position = {
      imagePercentY: 50,
      imagePercentX: 50
    };

    this.displayFocalpoint(position);
  }

  /**
   * @function scaleSlaveVal
   * @summary Slave croppers are smaller than the Master cropper. Scale down values derived from calculations on the Master cropper.
   * @param {object} slaveCropper - Slave cropper instance
   * @param {number} val - Value to scale
   * @returns {number} Scaled value
   * @memberof CrCroppersUi
   */
  scaleSlaveVal(slaveCropper, val) {
    const { masterCropper } = this;

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
   * @function validateCroppersImage
   * @summary Check that the croppers' image src is valid
   * @returns {boolean} valid
   * @memberof CrCroppersUi
   */
  validateCroppersImage() {
    const { croppersId } = this;
    const cropperImages = document.querySelectorAll(`#${croppersId} img`);
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
   * @function writeCropCoordinatesToImage
   * @summary Save the crop XY to the image file
   * @memberof CrCroppersUi
   * @todo Working but top and left aren't correct for both tested images
   * @todo Refresh thumbnail and image src after renaming image file
   */
  async writeCropCoordinatesToImage() {
    const {
      controlIds,
      masterCropper
    } = this;

    const { deleteCropCoordinates } = controlIds;

    const imagePercentY = CrDebugUi.getDebugParameterValue(masterCropper, 'image.focalpoint_y');
    const imagePercentX = CrDebugUi.getDebugParameterValue(masterCropper, 'image.focalpoint_x');

    const fileName = masterCropper.cropperInstance.element.src;

    document.getElementById(deleteCropCoordinates).disabled = true;

    const newFileName = await window.electronAPI.saveCropCoordinates({
      fileName,
      imagePercentY,
      imagePercentX
    });

    document.getElementById(deleteCropCoordinates).disabled = false;

    masterCropper.cropperInstance.element.src = `file://${newFileName.replaceAll(' ', '%20')}`;
    document.querySelectorAll('.thumbs .btn-selected img').src = newFileName;
  }

  /* Static methods */
}
