/**
 * @file FmcUi.js
 */

import dtrtValidate from 'dtrt-type-validate';

export class FmcUi {
  /**
   * @class FmcUi
   * @summary Manages UI
   * @param {object} config - Instance config
   * @public
   */
  constructor(config = {}) {
    // select the relevant arguments from the config object passed in
    const {
      debounceDelay,
      elements,
      exportDelay,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance,
      selectors
    } = config;

    Object.assign(this, {
      debounceDelay,
      elements,
      exportDelay,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance,
      selectors
    });
  }

  /* Getters and Setters */

  /**
   * debounceDelay
   * @type {number}
   * @memberof FmcUi
   */
  get debounceDelay() {
    return this._debounceDelay;
  }

  set debounceDelay(debounceDelay) {
    this._debounceDelay = dtrtValidate.validate(debounceDelay, 'number', 'FmcUi.debounceDelay');
  }

  /**
   * elements
   * @type {object}
   * @memberof FmcUi
   */
  get elements() {
    return this._elements;
  }

  set elements(elements) {
    this._elements = dtrtValidate.validate(elements, 'object', 'FmcUi.elements');
  }

  /**
   * exportDelay
   * @summary Time to wait between each export when exporting multiple images.
   * @type {number}
   * @memberof FmcUi
   */
  get exportDelay() {
    return this._exportDelay;
  }

  set exportDelay(exportDelay) {
    this._exportDelay = dtrtValidate.validate(exportDelay, 'number', 'FmcUi.exportDelay');
  }

  /**
   * fmcCroppersUiInstance
   * @type {object}
   * @memberof FmcUi
   */
  get fmcCroppersUiInstance() {
    return this._fmcCroppersUiInstance;
  }

  set fmcCroppersUiInstance(fmcCroppersUiInstance) {
    this._fmcCroppersUiInstance = dtrtValidate.validate(fmcCroppersUiInstance, 'object', 'FmcUi.fmcCroppersUiInstance');
  }

  /**
   * fmcThumbsUiInstance
   * @type {object}
   * @memberof FmcUi
   */
  get fmcThumbsUiInstance() {
    return this._fmcThumbsUiInstance;
  }

  set fmcThumbsUiInstance(fmcThumbsUiInstance) {
    this._fmcThumbsUiInstance = dtrtValidate.validate(fmcThumbsUiInstance, 'object', 'FmcUi.fmcThumbsUiInstance');
  }

  /**
   * selectors
   * @type {object}
   * @memberof FmcUi
   */
  get selectors() {
    return this._selectors;
  }

  set selectors(selectors) {
    this._selectors = dtrtValidate.validate(selectors, 'object', 'FmcUi.selectors');
  }

  /* Instance methods */

  /**
   * @function autosaveFocalpoint
   * @param {boolean} on - Auto-Save is on (true) or off (false)
   * @memberof FmcUi
   */
  async autosaveFocalpoint(on) {
    const {
      elements
    } = this;

    const {
      focalpointResetButton,
      focalpointSaveButton
    } = elements;

    if (on) {
      await this.saveFocalpoint();

      focalpointResetButton.disable();
      focalpointSaveButton.disable();
    } else {
      focalpointResetButton.enable();
      focalpointSaveButton.enable();
    }
  }

  /**
   * @function getElementIndex
   * @summary Get the index of the selected node in a nodelist
   * @param {HTMLElement} element = Element
   * @param {NodeList} nodeList = NodeList
   * @returns {number} selectedIndex || -1
   * @memberof FmcUi
   * @static
   */
  static getElementIndex(element, nodeList) {
    return Array.from(nodeList).indexOf(element);
  }

  /**
   * @function getPathOut
   * @summary Set the target path in the footer
   * @param {string} imgSrc = Cropper image src
   * @returns {string} pathOut
   * @memberof FmcUi
   */
  getPathOut(imgSrc) {
    const {
      elements
    } = this;

    const {
      folderOutInput
    } = elements;

    const { targetFolder } = folderOutInput.element.dataset;

    const fileName = FmcUi.getFileNameFromPath(imgSrc);
    const pathOut = `${targetFolder}/${fileName}`;

    return pathOut;
  }

  /**
   * @function getTargetElementOfType
   * @summary Ensures that the target element matches the expected element type
   * @param {object} event - Event
   * @param {string} elementType - Element type (tagName)
   * @returns {HTMLElement} targetElement
   * @memberof FmcUi
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

  /**
   * @function getPathWebEmbed
   * @summary Set the web embed path in the footer
   * @param {string} pathOut - Path out
   * @returns {string} pathWebEmbed
   * @memberof FmcUi
   */
  async getPathWebEmbed(pathOut) {
    const {
      elements
    } = this;

    const {
      fileWebpageInput,
      folderWebsiteInput
    } = elements;

    const { targetFolder: pathWebEmbed } = fileWebpageInput.element.dataset;
    const { targetFolder: pathWebsite } = folderWebsiteInput.element.dataset;

    let path = '';

    if ((pathWebEmbed !== '') && (pathOut !== '')) {
      path = await window.FmcFile.getRelativePath({
        base: pathWebsite,
        from: pathWebEmbed,
        to: pathOut
      });
    }

    return path;
  }

  /**
   * @function handleAutosaveRadioChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleAutosaveRadioChange(event) {
    const {
      elements,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance,
      masterCropper
    } = this;

    const {
      focalpointProportionsRadios,
      focalpointXInput,
      focalpointYInput
    } = elements;

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointAutoSave: state });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    if (masterCropper) {
    const thumbIndex = fmcThumbsUiInstance.getSelectedThumbIndex();

      await this.autosaveFocalpoint(state === 'on');

    await fmcCroppersUiInstance.setFocalpointSaveState({
      thumbIndexPrevious: focalpointXInput.element.dataset.thumbIndexPrevious,
      thumbIndex,
        imagePercentXUi: focalpointXInput.element.value,
        imagePercentYUi: focalpointYInput.element.value,
      imageProportionsUi: [ ...focalpointProportionsRadios ].filter(radio => radio.checked)[0].value
    });
  }
  }

  /**
   * @function handleAutoSelectFilteredRadioChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleAutoSelectFilteredRadioChange(event) {

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ thumbsAutoSelectFiltered: state });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    await this.handleFilterSubmit();
  }

  /**
   * @function handleThumbsFilterUncroppedRadiosChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleThumbsFilterUncroppedRadiosChange(event) {

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ thumbsFilterUncropped: state });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    await this.handleFilterSubmit();
  }

  /**
   * @function handleWriteFilenameRadioChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleWriteFilenameRadioChange(event) {

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointWriteFilename: state });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    // TODO : Update Photos app etc
  }

  /**
   * @function handleWriteTitleRadioChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleWriteTitleRadioChange(event) {

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointWriteTitle: state });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    // TODO : Update Photos app etc
  }

  /**
   * @function handleEditPresets
   * @memberof FmcUi
   */
  async handleEditPresets() {
    const {
      elements
    } = this;

    const {
      openPresetsInput
    } = elements;

    const filePath = openPresetsInput.element.value;
    const pathSeparator = filePath.lastIndexOf('/');
    const folderPath = filePath.slice(0, pathSeparator);

    const statusMessage = await window.FmcFile.openInEditor({
      editorCommand: 'code', // see https://code.visualstudio.com/docs/editor/command-line
      fileDescription: 'webpage',
      folderPath,
      filePath
    });

    FmcUi.emitElementEvent(window, 'updateStatus', {
      statusMessage
    });
  }

  /**
   * @function handlePresetEditWebpage
   * @memberof FmcUi
   */
  async handlePresetEditWebpage() {
    const {
      elements
    } = this;

    const {
      fileWebpageInput,
      folderWebsiteInput
    } = elements;

    const { targetFolder } = folderWebsiteInput.element.dataset;
    const { targetFile } = fileWebpageInput.element.dataset;

    const statusMessage = await window.FmcFile.openInEditor({
      editorCommand: 'code', // see https://code.visualstudio.com/docs/editor/command-line
      fileDescription: 'webpage',
      folderPath: targetFolder,
      filePath: targetFile
    });

    FmcUi.emitElementEvent(window, 'updateStatus', {
      statusMessage
    });
  }

  /**
   * @function handleExportAll
   * @memberof FmcUi
   * @todo Replace exportDelay with more robust check
   */
  async handleExportAll() {
    const {
      exportDelay,
      fmcThumbsUiInstance
    } = this;

    const thumbsButtons = fmcThumbsUiInstance.getButtons();
    let exportedCount = 0;

    for (let b = 0; b < thumbsButtons.length; b += 1) {
      const buttonEl = thumbsButtons[b];
      const imagePercentX = buttonEl.style.getPropertyValue('--image-percent-x');
      const imagePercentY = buttonEl.style.getPropertyValue('--image-percent-y');

      if ((imagePercentX !== '') && (imagePercentY !== '')) {
        buttonEl.click();
        exportedCount += 1;

        await new Promise(resolve => {
          // timeout prevents generic crops
          setTimeout(async () => {
            await this.handleExportSelected();

            resolve();
          }, exportDelay);
        });
      }
    }

    FmcUi.emitElementEvent(window, 'updateStatus', {
      statusMessage: `Generated crops and sizes for ${exportedCount} thumbnails`,
      statusType: 'success'
    });
  }

  /**
   * @function handleExportSelected
   * @returns {string} baseExportPath
   * @memberof FmcUi
   */
  async handleExportSelected() {
    const {
      elements,
      fmcCroppersUiInstance
    } = this;

    const {
      copyPathWebEmbedButton,
      folderOutInput
    } = elements;

    const { croppers } = fmcCroppersUiInstance;
    const { src } = croppers[0].cropperInstance.element;
    const { targetFolder } = folderOutInput.element.dataset;

    const baseExportPath = await fmcCroppersUiInstance.resizeAndCropImage(targetFolder);
    const pathOut = this.getPathOut(src);

    await this.setPaths(baseExportPath, pathOut, false);

    copyPathWebEmbedButton.element.focus();
    copyPathWebEmbedButton.element.click();

    return baseExportPath;
  }

  /**
   * @function handlePresetFileWebpageBrowse
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handlePresetFileWebpageBrowse(event, restore = false) {
    const { fileName, filePath, folderPath } = await window.FmcFile.selectFile({
      dialogTitle: 'Webpage file',
      restore,
      storeKey: 'fileWebpage'
    });

    // if folder select was cancelled
    if ((typeof fileName === 'undefined') || (typeof filePath === 'undefined')) {
      return;
    }

    FmcUi.emitElementEvent(window, 'updatePresetFileWebpage', {
      targetFile: filePath,
      targetFolder: folderPath,
      value: fileName
    });
  }

  /**
   * @function handleFilterClear
   * @memberof FmcUi
   */
  async handleFilterClear() {
    const {
      fmcThumbsUiInstance
    } = this;

    FmcUi.emitElementEvent(window, 'updateFilter', { value: '' });

    fmcThumbsUiInstance.filterByFilenameAndCropped('');
  }

  /**
   * @function handleFilterSubmit
   * @memberof FmcUi
   */
  async handleFilterSubmit() {
    const {
      elements,
      fmcThumbsUiInstance
    } = this;

    const {
      filter
    } = elements;

    const searchStr = filter.element.value;

    fmcThumbsUiInstance.filterByFilenameAndCropped(searchStr);
  }

  /**
   * @function handleFocalpointDelete
   * @memberof FmcUi
   */
  async handleFocalpointDelete() {
    const {
      elements,
      fmcCroppersUiInstance
    } = this;

    const {
      focalpointProportionsRadios
    } = elements;

    focalpointProportionsRadios.forEach(radio => {
      radio.checked = (radio.value === 'default');
    });

    const statusMessage = await fmcCroppersUiInstance.deleteImagePercentXYFromImage();

    FmcUi.emitElementEvent(window, 'updateStatus', { statusMessage });

    // input change listener calls setFocalpointSaveState
    FmcUi.emitElementEvent(window, 'updateFocalpointX', { value: 50 });
    FmcUi.emitElementEvent(window, 'updateFocalpointY', { value: 50 });
  }

  /**
   * @function handleFocalpointInputChange
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleFocalpointInputChange(event) {
    const {
      elements,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance
    } = this;

    const {
      focalpointAutoSaveRadios,
      focalpointProportionsRadios,
      focalpointXInput,
      focalpointYInput
    } = elements;

    const {
      detail = {}
    } = event;

    const {
      focalpointReset = false
    } = detail;

    const focalpointX = focalpointXInput.element.value;
    const focalpointY = focalpointYInput.element.value;

    // move cropbox
    fmcCroppersUiInstance.displayImagePercentXY({
      imagePercentX: focalpointX, // string
      imagePercentY: focalpointY // string
    });

    if ((event.isTrusted) || (event.target === focalpointYInput.element)) {
      const thumbIndex = fmcThumbsUiInstance.getSelectedThumbIndex();

      await this.autosaveFocalpoint(focalpointAutoSaveRadios.getState() === 'on');

      await fmcCroppersUiInstance.setFocalpointSaveState({
        focalpointReset,
        thumbIndexPrevious: focalpointXInput.element.dataset.thumbIndexPrevious,
        thumbIndex,
        imagePercentXUi: focalpointX,
        imagePercentYUi: focalpointY,
        imageProportionsUi: [ ...focalpointProportionsRadios ].filter(radio => radio.checked)[0].value
      });

      focalpointXInput.element.dataset.thumbIndexPrevious = thumbIndex;
      focalpointYInput.element.dataset.thumbIndexPrevious = thumbIndex;
    }
  }

  /**
   * @function handleFocalpointReset
   * @param {object} event - Click event
   * @memberof FmcUi
   */
  async handleFocalpointReset(event) {
    const {
      fmcCroppersUiInstance
    } = this;

    // input change listener calls setFocalpointSaveState
    await fmcCroppersUiInstance.reinstateImagePercentXYFromImage(event);
  }

  /**
   * @function handleFocalpointSave
   * @memberof FmcUi
   */
  async handleFocalpointSave() {
    const {
      elements,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance
    } = this;

    const {
      focalpointProportionsRadios,
      focalpointXInput,
      focalpointYInput
    } = elements;

    const focalpointX = focalpointXInput.element.value;
    const focalpointY = focalpointYInput.element.value;

    const thumbIndex = fmcThumbsUiInstance.getSelectedThumbIndex();

    await this.saveFocalpoint();

    await fmcCroppersUiInstance.setFocalpointSaveState({
      thumbIndexPrevious: focalpointXInput.element.dataset.thumbIndexPrevious,
      thumbIndex,
      imagePercentXUi: focalpointX,
      imagePercentYUi: focalpointY,
      imageProportionsUi: [ ...focalpointProportionsRadios ].filter(radio => radio.checked)[0].value
    });
  }

  /**
   * @function handleFolderInBrowse
   * @summary Called on 'Browse' click, handlePresetLoad, restoreSettings
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderInBrowse(event, restore = false) {
    const {
      fmcThumbsUiInstance
    } = this;

    // folderPath = targetFolder
    const { folderName, folderPath, imagesData } = await window.FmcFile.selectFolder({
      dialogTitle: 'Source folder',
      retrieveImagesData: true,
      restore, // loads folderName and folderPath from preset
      storeKey: 'folderIn'
    });

    // if folder select was cancelled
    if ((typeof folderName === 'undefined') || (typeof folderPath === 'undefined') || (typeof imagesData === 'undefined')) {
      return;
    }

    // if 'Browse' was clicked
    // capture data with the field (inside the 'Open Settings' dialog) until it is saved to a preset
    if (!restore) {
      FmcUi.emitElementEvent(window, 'updateFolderIn', {
        targetFolder: folderPath,
        value: folderName
      });
    }

    // add thumbs to UI
    fmcThumbsUiInstance.generateThumbsHtml(imagesData, 1);
  }

  /**
   * @function handleFolderOutBrowse
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderOutBrowse(event, restore = false) {
    const {
      elements
    } = this;

    const {
      folderOutInputDependent
    } = elements;

    const { folderName, folderPath } = await window.FmcFile.selectFolder({
      dialogTitle: 'Export folder',
      retrieveImagesData: false,
      restore,
      storeKey: 'folderOut'
    });

    // if folder select was cancelled
    if ((typeof folderName === 'undefined') || (typeof folderPath === 'undefined')) {
      return;
    }

    FmcUi.emitElementEvent(window, 'updateFolderOut', {
      targetFolder: folderPath,
      value: folderName
    });

    // enables focalpoint controls
    // TODO controls are enabled before cropper is ready
    folderOutInputDependent.removeAttribute('disabled');
  }

  /**
   * @function handleFolderWebsiteBrowse
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderWebsiteBrowse(event, restore = false) {
    const { folderName, folderPath } = await window.FmcFile.selectFolder({
      dialogTitle: 'Website folder',
      retrieveImagesData: false,
      restore,
      storeKey: 'folderWebsite'
    });

    // if folder select was cancelled
    if ((typeof folderName === 'undefined') || (typeof folderPath === 'undefined')) {
      return;
    }

    FmcUi.emitElementEvent(window, 'updateFolderWebsite', {
      targetFolder: folderPath,
      value: folderName
    });
  }

  /**
   * @function handleImageRenamed
   * @param {object} event - imageRenamed event
   * @memberof FmcUi
   */
  async handleImageRenamed(event) {
    const {
      fmcCroppersUiInstance,
      fmcThumbsUiInstance,
      selectors
    } = this;

    const {
      thumbClass,
      thumbImgClass
    } = selectors;

    const { newFileName: src } = event.detail;
    const { selectedClass } = fmcThumbsUiInstance;
    const { imagePercentX, imagePercentY } = fmcCroppersUiInstance.getImagePercentXYFromImage(src);
    const thumbButton = document.querySelector(`.${selectedClass}`);
    const thumbImg = document.querySelector(`.${selectedClass} .${thumbImgClass}`);
    const thumbIndex = 0;
    const thumbs = document.querySelectorAll(`.${thumbClass}`);

    thumbs.forEach((_thumb, index) => {
      if (_thumb.classList.contains(selectedClass)) {
        thumbIndex = index;
      }
    });

    fmcThumbsUiInstance.changeSelectedImageSrc(src);
    fmcThumbsUiInstance.setCssImagePercentXY({
      thumbButton,
      thumbImg,
      thumbIndex,
      imagePercentX,
      imagePercentY
    });

    const pathOut = this.getPathOut(src);

    await this.setPaths(src, pathOut);
  }

  /**
   * @function sleep
   * @param {number} ms - Milliseconds
   * @memberof FmcUi
   * @returns {Promise} promise
   * @see https://leapcell.io/blog/how-to-sleep-in-javascript-using-async-await
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // eslint-disable-line no-promise-executor-return
  }

  /**
   * @function handleLastCropperImgReady
   * @summary Runs each time an image is loaded
   * @memberof FmcUi
   */
  async handleLastCropperImgReady() {
    const {
      fmcCroppersUiInstance
    } = this;

    // prevents intermittent (browser) error from FmcCroppersUi.calcCanvasOffsets()
    await this.sleep(10);
    await fmcCroppersUiInstance.initImagePercentXY();
  }

  /**
   * @function loadOptions
   * @summary Load options when the UI initialises to restore previous UI settings
   * @memberof FmcUi
   */
  async loadOptions() {
    console.log('# X.X - EXEC fmcUi.loadOptions');

    try {
      const { options } = await window.FmcStore.getOptions(null);

      console.log('options', options);

      const {
        focalpointAutoSave = 'off',
        focalpointWriteFilename = 'off',
        focalpointWriteTitle = 'off',
        thumbsAutoSelectFiltered = 'off',
        thumbsFilterUncropped = 'off'
      } = options;

      // TODO: rename to update:foo to make more readable
      FmcUi.emitElementEvent(window, 'updateFocalpointAutoSave', { value: focalpointAutoSave });
      FmcUi.emitElementEvent(window, 'updateFocalpointWriteFilename', { value: focalpointWriteFilename });
      FmcUi.emitElementEvent(window, 'updateFocalpointWriteTitle', { value: focalpointWriteTitle });
      FmcUi.emitElementEvent(window, 'updateThumbsAutoSelectFiltered', { value: thumbsAutoSelectFiltered });
      FmcUi.emitElementEvent(window, 'updateThumbsFilterUncropped', { value: thumbsFilterUncropped });

      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'Loaded options',
        statusType: 'success'
      });
    } catch (error) {
      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'No options to load',
        statusType: 'info'
      });
    }
  }

  /**
   * @function handlePresetLoad
   * @param {object} event - change event
   * @summary Run when the Presets 'Load' button is pressed
   * @memberof FmcUi
   */
  async handlePresetLoad(event) {
    const {
      elements,
      fmcThumbsUiInstance
    } = this;

    const {
      presetNamesSelect
    } = elements;

    // get selected preset name from UI
    let presetName = presetNamesSelect.element.value;

    // save the active preset name to indicate that this preset has been (is about to be) loaded
    await window.FmcStore.setActivePresetName({ presetName });

    try {
      // 1. get the active preset name from the store
      // 2. get the preset with the active preset name from the store
      const preset = await window.FmcStore.getActivePreset(null);

      const {
        fileWebpage,
        folderIn,
        folderOut,
        folderWebsite,
        name
      } = preset;

      FmcUi.emitElementEvent(window, 'updatePresetFileWebpage', {
        targetFile: fileWebpage.targetFile,
        targetFolder: fileWebpage.targetFolder,
        value: fileWebpage.value
      });

      FmcUi.emitElementEvent(window, 'updateFilter', { value: '' });

      FmcUi.emitElementEvent(window, 'updateFolderIn', {
        targetFolder: folderIn.targetFolder,
        value: folderIn.value
      });

      FmcUi.emitElementEvent(window, 'updateFolderOut', {
        targetFolder: folderOut.targetFolder,
        value: folderOut.value
      });

      FmcUi.emitElementEvent(window, 'updateFolderWebsite', {
        targetFolder: folderWebsite.targetFolder,
        value: folderWebsite.value
      });

      FmcUi.emitElementEvent(window, 'updatePresetNameActive', { value: name }); // TODO presetName

      const restore = true;

      await this.handleFolderInBrowse(null, restore);
      await this.handleFolderOutBrowse(null, restore);
      await this.handleFolderWebsiteBrowse(null, restore);
      await this.handlePresetFileWebpageBrowse(null, restore);

      fmcThumbsUiInstance.clickSelectedThumb(1);

      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: `Loaded preset ${name}`,
        statusType: 'success'
      });
    } catch (error) {
      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'No active preset to load',
        statusType: 'info'
      });
    }
  }

  /**
   * @function handlePresetsOpen
   * @memberof FmcUi
   */
  async handlePresetsOpen() {
    FmcUi.emitElementEvent(window, 'updatePresets', {
      label: 'Select a preset',
      options: await window.FmcStore.getPresetNames()
    });

    await this.selectActivePreset();

    FmcUi.emitElementEvent(window, 'updatePresetsFile', { value: await window.FmcStore.getStoreFilePath() });
  }

  /**
   * @function selectActivePreset
   * @summary Get the active preset from FmcStore. Select this preset in the dropdown in the Settings modal.
   * @todo Consider renaming to selectStoredActivePreset ?
   * @memberof FmcUi
   */
  async selectActivePreset() {
    const preset = await window.FmcStore.getActivePreset(null);

    if (typeof preset === 'undefined') {
      FmcUi.emitElementEvent(window, 'updateStatus', {
        statusMessage: 'No active preset to select',
        statusType: 'info'
      });

      return;
    }

    // select the preset
    FmcUi.emitElementEvent(window, 'updatePresets', { value: preset.name });
  }

  /**
   * @function handlePresetSave
   * @memberof FmcUi
   */
  async handlePresetSave() {
    const {
      elements,
      fmcThumbsUiInstance
    } = this;

    const {
      activePresetName,
      fileWebpageInput,
      folderInInput,
      folderOutInput,
      folderWebsiteInput,
      presetNameInput
    } = elements;

    const fileWebpage = {
      targetFile: fileWebpageInput.element.dataset.targetFile,
      targetFolder: fileWebpageInput.element.dataset.targetFolder,
      value: fileWebpageInput.element.value
    };

    const folderIn = {
      targetFolder: folderInInput.element.dataset.targetFolder,
      value: folderInInput.element.value // folderName
    };

    const folderOut = {
      targetFolder: folderOutInput.element.dataset.targetFolder,
      value: folderOutInput.element.value
    };

    const folderWebsite = {
      targetFolder: folderWebsiteInput.element.dataset.targetFolder,
      value: folderWebsiteInput.element.value
    };

    const name = presetNameInput.element.value;

    const msgObj = await window.FmcStore.setPreset({
      fileWebpage,
      folderIn,
      folderOut,
      folderWebsite,
      name
    });

    FmcUi.emitElementEvent(window, 'message', msgObj);

    await window.FmcStore.setActivePresetName({ presetName: name });

    activePresetName.element.textContent = name;

    fmcThumbsUiInstance.clickSelectedThumb(1);

    FmcUi.emitElementEvent(window, 'updatePresets', {
      label: 'Select a preset',
      options: await window.FmcStore.getPresetNames(),
      value: name
    });
  }

  /**
   * @function handleThumbClick
   * @param {object} event - Click event
   * @memberof FmcUi
   */
  async handleThumbClick(event) {
    const {
      elements,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance
    } = this;

    const {
      croppersContainer,
      settings
    } = elements;

    const {
      dataset: {
        cropperFocalpointSaveStatus
      }
    } = croppersContainer;

    const {
      clickedButton,
      clickedButtonIndex
    } = fmcThumbsUiInstance.getClickedButton(event);

    // if there are only a few buttons the user may have clicked in the space to the right of the buttons
    if (!clickedButton) {
      return;
    }

    const newImageSrc = clickedButton.querySelector('img').getAttribute('src');

    if (cropperFocalpointSaveStatus === 'dirty') {
      const saveChanges = window.confirm('Save focalpoint changes?');

      if (saveChanges) {
        await this.handleFocalpointSave();
      }
    }

    fmcThumbsUiInstance.applySelectedClass(clickedButton);

    const thumbsButtons = fmcThumbsUiInstance.getButtons();

    thumbsButtons.forEach(button => {
      button.setAttribute('tabindex', '-1');
    });

    clickedButton.setAttribute('tabindex', '0');

    if (settings.element.hasAttribute('open')) {
      clickedButton.scrollIntoView();
    } else {
      clickedButton.focus();
    }

    await new Promise(resolve => {
      setTimeout(async () => {
        fmcThumbsUiInstance.displayCount({
          thumbIndex: clickedButtonIndex
        });

        resolve();
      }, 500);
    });

    const pathOut = this.getPathOut(newImageSrc);

    const { latLong } = clickedButton.dataset;

    FmcUi.emitElementEvent(window, 'updateImageLatLong', { value: latLong });

    await this.setPaths(newImageSrc, pathOut);

    // calls fmcCroppersUiInstance.init
    fmcCroppersUiInstance.changeSourceImage(newImageSrc);
  }

  /**
   * @function handleWindowKeydown
   * @param {object} event - Keydown event
   * @memberof FmcUi
   */
  async handleWindowKeydown(event) {
    const {
      elements,
      fmcThumbsUiInstance,
      selectors
    } = this;

    const {
      filter,
      filterSubmitButton
    } = elements;

    const {
      thumbButtonClass
    } = selectors;

    const {
      key,
      metaKey
    } = event;

    if (document.activeElement === filter) {
      if (key === 'Enter') {
        FmcUi.emitElementEvent(filterSubmitButton, 'click', {});
      } else if (metaKey && (key === 'v')) {
        FmcUi.emitElementEvent(window, 'updateFilter', { value: await window.FmcFile.copyFromClipboard() });
      }
    } else if (document.activeElement.classList.contains(thumbButtonClass)) {
      if (key === 'ArrowLeft') {
        event.preventDefault(); // don't operate the native container scrollbar
        fmcThumbsUiInstance.focusThumb('previous');
      } else if (key === 'ArrowRight') {
        event.preventDefault();
        fmcThumbsUiInstance.focusThumb('next');
      }
    }
  }

  /**
   * @function handleWindowResize
   * @memberof FmcUi
   */
  handleWindowResize() {
    const {
      fmcThumbsUiInstance
    } = this;

    fmcThumbsUiInstance.focusThumb('selected');
  }

  /**
   * @function restoreSettings
   * @summary Restore previous stored settings if they exist
   * @memberof FmcUi
   */
  async restoreSettings() {
    await this.selectActivePreset();
    await this.handleSettingsLoad();
  }

  /**
   * @function saveFocalpoint
   * @memberof FmcUi
   */
  async saveFocalpoint() {
    const {
      elements,
      fmcCroppersUiInstance
    } = this;

    const {
      focalpointProportionsRadios,
      focalpointXInput,
      focalpointYInput
    } = elements;

    const focalpointX = focalpointXInput.element.value;
    const focalpointY = focalpointYInput.element.value;

    let msgObj;

    let flags = [];

    const imageProportions = [ ...focalpointProportionsRadios ].filter(radio => radio.checked)[0].value;

    if (imageProportions === 'panorama') {
      flags.push('P');
    }

    // value is a string despite input being of type number
    if ((Number(focalpointXInput.element.value) === 50) && (Number(focalpointYInput.element.value) === 50)) {
      msgObj = await fmcCroppersUiInstance.deleteImagePercentXYFromImage();
    } else {
      msgObj = await fmcCroppersUiInstance.writeImagePercentXYToImage({
        imageFlags: flags.join(','),
        imagePercentX: focalpointX,
        imagePercentY: focalpointY
      });

      FmcUi.emitElementEvent(window, 'message', msgObj);
    }
  }

  /**
   * @function setPaths
   * @summary Update attributes in the path links and buttons
   * @param {string} src - Image src
   * @param {string} pathOut - Path out
   * @param {boolean} checkPathExists - Check whether the baseExport path exists
   * @memberof FmcUi
   */
  async setPaths(src, pathOut, checkPathExists = true) {
    const {
      elements
    } = this;

    const {
      thumbFileName
    } = elements;

    const fileName = FmcUi.getFileNameFromPath(src);
    const pathIn = this.srcSafe(src);

    FmcUi.emitElementEvent(window, 'updateImagePathIn', { value: pathIn });

    thumbFileName.element.textContent = fileName;

    await new Promise(resolve => {
      // timeout prevents generic crops
      setTimeout(async () => {
        const pathOutExists = checkPathExists ? await window.FmcFile.pathExists({ path: pathOut }) : true;
        let pathOutSafe = '';
        let pathWebEmbedSafe = '';

        if (pathOutExists) {
          const pathWebEmbed = await this.getPathWebEmbed(pathOut);
          pathWebEmbedSafe = this.srcSafe(pathWebEmbed);
          pathOutSafe = this.srcSafe(pathOut);
        }

        FmcUi.emitElementEvent(window, 'updateWebEmbedPath', { value: pathWebEmbedSafe });
        FmcUi.emitElementEvent(window, 'updateImagePathOut', { value: pathOutSafe });

        resolve();
      }, 500);
    });
  }

  /**
   * @function srcSafe
   * @param {string} src - Path
   * @returns {string} srcSafe
   * @memberof FmcUi
   */
  srcSafe(src) {
    return src.replace(/%20/g, ' ');
  }

  /**
   * @function useTestData
   * @memberof FmcUi
   */
  testData() {
    const {
      fmcThumbsUiInstance
    } = this;

    fmcThumbsUiInstance.generateThumbsHtml({
      imagesData: [
        {
          src: './cypress/fixtures/landscape.jpeg',
          dateTimeOriginal: '2023:01:03 04:35:26'
        },
        {
          src: './cypress/fixtures/portrait.jpeg',
          dateTimeOriginal: '2023:01:03 05:35:26'
        },
        {
          src: './cypress/fixtures/portrait-with-rotation.jpeg',
          dateTimeOriginal: '2023:01:03 05:35:26'
        },
        {
          src: './cypress/fixtures/panorama.jpeg',
          dateTimeOriginal: '2023:01:03 09:35:26'
        },
        {
          src: './cypress/fixtures/square.jpg',
          dateTimeOriginal: '2023:01:03 06:35:26'
        },
        {
          src: './cypress/fixtures/screenshot.PNG',
          dateTimeOriginal: '2023:01:03 07:35:26'
        }
      ]
    });
  }

  /* Static methods */

  /**
   * @function debounce
   * @param {Function} func - Function to call after delay
   * @param {number} wait - Wait time in ms
   * @param {boolean} immediate - Call the function immediately
   * @returns {Function} function
   * @memberof FmcUi
   * @static
   * @see {@link https://stackoverflow.com/a/65081210}
   * @see {@link https://www.freecodecamp.org/news/debounce-explained-how-to-make-your-javascript-wait-for-your-user-to-finish-typing-2/}
   */
  static debounce(func, wait, immediate) {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;

      const later = function () {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  /**
   * @function emitEvent
   * @summary Emit a custom event
   * @param {string} elementId - ID of the element that will dispatch the event
   * @param {string} eventName - Event names are case-sensitive
   * @param {object} eventDetail - name-value pair
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent}
   * @see {@link https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/}
   * @memberof FmcUi
   * @static
   */
  static emitEvent(elementId, eventName, eventDetail = {}) {

    const element = document.getElementById(elementId);

    FmcUi.emitElementEvent(element, eventName, eventDetail);
  }

  /**
   * @function emitElementEvent
   * @summary Emit a custom event
   * @param {HTMLElement} element - element that will dispatch the event
   * @param {string} eventName - Event names are case-sensitive
   * @param {object} eventDetail - name-value pair
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent}
   * @see {@link https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/}
   * @memberof FmcUi
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
   * @function getFileNameFromPath
   * @param {string} path - File path
   * @returns {string} fileName
   * @memberof FmcUi
   * @static
   */
  static getFileNameFromPath(path) {
    const pathSeparator = path.lastIndexOf('/');
    const fileName = path.slice(pathSeparator + 1);

    return fileName;
  }

  /**
   * @function getOffset
   * @summary Get the space between an element and the viewport (this matches the inline CSS translate implemented by cropperjs)
   * @param {HTMLElement} el - Element
   * @returns {object} offset - { top, left }
   * @see {@link https://usefulangle.com/post/179/jquery-offset-vanilla-javascript}
   * @memberof FmcUi
   * @static
   */
  static getOffset(el) {
    const rect = el.getBoundingClientRect();
    const offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };

    return offset;
  }
}
