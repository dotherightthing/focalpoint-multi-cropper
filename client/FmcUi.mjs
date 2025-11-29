import dtrtValidate from 'dtrt-type-validate';
import { FmcCroppersUi } from './FmcCroppersUi.mjs';

export class FmcUi {
  /**
   * @class FmcUi
   * @summary Manages rendering and manipulation of the UI
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
   * @summary Number of milliseconds to wait before actioning a repeated function call
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
   * debug
   * @summary Toggles debugging on and off via FmcUi.log
   * @type {boolean}
   * @memberof FmcUi
   */
  get debug() {
    return this._debug;
  }

  set debug(debug) {
    this._debug = dtrtValidate.validate(debug, 'boolean', 'FmcUi.debug');
  }

  /**
   * elements
   * @summary DOM elements shared between fmcCroppersUiInstance, fmcThumbsUiInstance, fmcUi
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
   * @summary An instance of FmcCroppersUi
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
   * @summary An instance of FmcThumbsUi
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
   * @summary DOM selectors
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
   * @summary Save the current focalpoint if "Auto-Save" is enabled
   * @param {boolean} on - Auto-Save is on (true) or off (false)
   * @memberof FmcUi
   */
  async autosaveFocalpoint(on) {
    FmcUi.log('FmcUi.autosaveFocalpoint', on);
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
   * @function getPathOut
   * @summary Set the target path in the footer
   * @param {string} imgSrc = Cropper image src
   * @returns {string} pathOut
   * @memberof FmcUi
   */
  getPathOut(imgSrc) {
    FmcUi.log('FmcUi.getPathOut', imgSrc);
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
   * @function getPathWebEmbed
   * @summary Set the web embed path in the footer
   * @param {string} pathOut - Path out
   * @returns {Promise<string>} pathWebEmbed
   * @memberof FmcUi
   */
  async getPathWebEmbed(pathOut) {
    FmcUi.log('FmcUi.getPathWebEmbed', pathOut);
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
   * @function handleAutosaveRadiosChange
   * @summary Actions to run after the "Auto-Save" option is enabled or disabled
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleAutosaveRadiosChange(event) {
    FmcUi.log('FmcUi.handleAutosaveRadiosChange', event);
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

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointAutoSave: state });

    FmcUi.emitElementEvent('FmcUi.handleAutosaveRadiosChange', window, 'updateStatus', msgObj);

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

  /**
   * @function handleAutoSelectFilteredRadiosChange
   * @summary Actions to run after the "Auto-Select First Filter Result" option is enabled or disabled
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleAutoSelectFilteredRadiosChange(event) {
    FmcUi.log('FmcUi.handleAutoSelectFilteredRadiosChange', event);

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ thumbsAutoSelectFiltered: state });

    FmcUi.emitElementEvent('FmcUi.handleAutoSelectFilteredRadiosChange', window, 'updateStatus', msgObj);

    await this.handleFilterSubmit();
  }

  /**
   * @function handleEditPresets
   * @summary Open user-preferences.json in VSCode
   * @memberof FmcUi
   */
  async handleEditPresets() {
    FmcUi.log('FmcUi.handleEditPresets');
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

    FmcUi.emitElementEvent('FmcUi.handleEditPresets', window, 'updateStatus', {
      statusMessage
    });
  }

  /**
   * @function handleExportAll
   * @summary Cycle through all thumbs and export those with focalpoints
   * @memberof FmcUi
   */
  async handleExportAll() {
    FmcUi.log('FmcUi.handleExportAll');
    // TODO Replace exportDelay with a more robust check
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

    FmcUi.emitElementEvent('FmcUi.handleExportAll', window, 'updateStatus', {
      statusMessage: `Generated crops and sizes for ${exportedCount} thumbnails`,
      statusType: 'success'
    });
  }

  /**
   * @function handleExportSelected
   * @summary Export the image associated with the thumb selected in the UI, then update button paths and focus the "Copy base embed path" button
   * @returns {Promise<string>} baseExportPath
   * @memberof FmcUi
   */
  async handleExportSelected() {
    FmcUi.log('FmcUi.handleExportSelected');
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
   * @function handleFilterClear
   * @summary Actions to run after the "Thumbnail filter" "Clear" button is clicked
   * @memberof FmcUi
   */
  async handleFilterClear() {
    FmcUi.log('FmcUi.handleFilterClear');
    const {
      fmcThumbsUiInstance
    } = this;

    FmcUi.emitElementEvent('FmcUi.handleFilterClear', window, 'updateFilter', { value: '' });

    fmcThumbsUiInstance.filterByFilenameAndCropped('');
  }

  /**
   * @function handleFilterSubmit
   * @summary Actions to run after the "Thumbnail filter" "Go" button is clicked
   * @memberof FmcUi
   */
  async handleFilterSubmit() {
    FmcUi.log('FmcUi.handleFilterSubmit');
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
   * @summary Delete focalpoint information from an image
   * @memberof FmcUi
   */
  async handleFocalpointDelete() {
    FmcUi.log('FmcUi.handleFocalpointDelete');
    const {
      elements,
      fmcCroppersUiInstance
    } = this;

    // TODO refactor focalpointProportionsRadios into an instance of FmcRadiosUi
    const {
      focalpointProportionsRadios
    } = elements;

    focalpointProportionsRadios.forEach(radio => {
      radio.checked = (radio.value === 'default');
    });

    const statusMessage = await fmcCroppersUiInstance.deleteImagePercentXYFromImage();

    FmcUi.emitElementEvent('FmcUi.handleFocalpointDelete', window, 'updateStatus', { statusMessage });

    // input change listener calls setFocalpointSaveState
    FmcUi.emitElementEvent('FmcUi.handleFocalpointDelete', window, 'updateFocalpointX', { value: 50 });
    FmcUi.emitElementEvent('FmcUi.handleFocalpointDelete', window, 'updateFocalpointY', { value: 50 });
  }

  /**
   * @function handleFocalpointInputChange
   * @summary When the focalpoint XY fields are changed, move the cropbox and save the new focalpoint to the image filename or title
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleFocalpointInputChange(event) {
    FmcUi.log('FmcUi.handleFocalpointInputChange', event);
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
   * @summary Reset the values in the X and Y fields, to the values stored in the image filename or title
   * @param {object} event - Click event
   * @memberof FmcUi
   */
  async handleFocalpointReset(event) {
    FmcUi.log('FmcUi.handleFocalpointReset', event);
    const {
      fmcCroppersUiInstance
    } = this;

    // input change listener calls setFocalpointSaveState
    await fmcCroppersUiInstance.reinstateImagePercentXYFromImage(event);
  }

  /**
   * @function handleFocalpointSave
   * @summary Save the focalpoint to the image filename or title
   * @memberof FmcUi
   */
  async handleFocalpointSave() {
    FmcUi.log('FmcUi.handleFocalpointSave');
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
   * @summary Actions to run after the "Source folder" "Browse" button is clicked - and when handlePresetLoad is called
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderInBrowse(event, restore = false) {
    FmcUi.log('FmcUi.handleFolderInBrowse', event, restore);
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
      FmcUi.emitElementEvent('FmcUi.handleFolderInBrowse', window, 'updateFolderIn', {
        targetFolder: folderPath,
        value: folderName
      });
    }

    // add thumbs to UI
    await fmcThumbsUiInstance.generateThumbsHtml(imagesData, 1);
  }

  /**
   * @function handleFolderOutBrowse
   * @summary Actions to run after the "Target folder" "Browse" button is clicked - and when handlePresetLoad is called
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderOutBrowse(event, restore = false) {
    FmcUi.log('FmcUi.handleFolderOutBrowse', event, restore);
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

    FmcUi.emitElementEvent('FmcUi.handleFolderOutBrowse', window, 'updateFolderOut', {
      targetFolder: folderPath,
      value: folderName
    });

    // enables focalpoint controls
    // TODO controls are enabled before cropper is ready
    folderOutInputDependent.removeAttribute('disabled');
  }

  /**
   * @function handleFolderWebsiteBrowse
   * @summary Actions to run after the "Website folder" "Browse" button is clicked - and when handlePresetLoad is called
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handleFolderWebsiteBrowse(event, restore = false) {
    FmcUi.log('FmcUi.handleFolderWebsiteBrowse', event, restore);
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

    FmcUi.emitElementEvent('FmcUi.handleFolderWebsiteBrowse', window, 'updateFolderWebsite', {
      targetFolder: folderPath,
      value: folderName
    });
  }

  /**
   * @function handleImageRenamed
   * @summary Actions to run after the cropper source is changed - due to a focalpoint being written to or deleted from the filename
   * @param {object} event - imageRenamed event
   * @memberof FmcUi
   */
  async handleImageRenamed(event) {
    // TODO Rename to something more intuitive
    FmcUi.log('FmcUi.handleImageRenamed', event);
    const {
      fmcCroppersUiInstance,
      fmcThumbsUiInstance,
      selectors
    } = this;

    const {
      thumbClass,
      thumbImgClass
    } = selectors;

    const {
      detail
    } = event;

    const { newFileName: src } = detail;
    const { selectors: fmcThumbsUiSelectors } = fmcThumbsUiInstance;
    const { selectedClass } = fmcThumbsUiSelectors;
    const { Title } = await FmcCroppersUi.getImageTitle(src);
    const { imagePercentX, imagePercentY } = fmcCroppersUiInstance.getImagePercentXYFromSrc({ src, title: Title });
    const thumbButton = document.querySelector(`.${selectedClass}`);
    const thumbImg = document.querySelector(`.${selectedClass} .${thumbImgClass}`);
    const thumbs = document.querySelectorAll(`.${thumbClass}`);
    let thumbIndex = 0;

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
   * @function handleLastCropperImgReady
   * @summary Actions to run after cropperjs fires a "ready" event for the last cropper image - each time an image is loaded into the cropper
   * @memberof FmcUi
   */
  async handleLastCropperImgReady() {
    FmcUi.log('FmcUi.handleLastCropperImgReady');
    const {
      fmcCroppersUiInstance
    } = this;

    // prevents intermittent (browser) error from FmcCroppersUi.calcCanvasOffsets()
    await this.sleep(10);
    await fmcCroppersUiInstance.reinstateImagePercentXYFromImage();
  }

  /**
   * @function handlePresetEditWebpage
   * @summary Open the preset webpage file in VSCode
   * @memberof FmcUi
   */
  async handlePresetEditWebpage() {
    FmcUi.log('FmcUi.handlePresetEditWebpage');
    const {
      elements
    } = this;

    const {
      fileWebpageInput
    } = elements;

    const { targetFile } = fileWebpageInput.element.dataset;

    const statusMessage = await window.FmcFile.openInEditor({
      editorCommand: 'code', // see https://code.visualstudio.com/docs/editor/command-line
      fileDescription: 'webpage',
      filePath: targetFile
    });

    FmcUi.emitElementEvent('FmcUi.handlePresetEditWebpage', window, 'updateStatus', { statusMessage });
  }

  /**
   * @function handlePresetFileWebpageBrowse
   * @summary Actions to run after the "Webpage file" "Browse" button is clicked - and when handlePresetLoad is called
   * @param {object|null} event - Click event
   * @param {boolean} restore - Restore settings from store
   * @memberof FmcUi
   */
  async handlePresetFileWebpageBrowse(event, restore = false) {
    FmcUi.log('FmcUi.handlePresetFileWebpageBrowse', event, restore);
    const { fileName, filePath, folderPath } = await window.FmcFile.selectFile({
      dialogTitle: 'Webpage file',
      restore,
      storeKey: 'fileWebpage'
    });

    // if folder select was cancelled
    if ((typeof fileName === 'undefined') || (typeof filePath === 'undefined')) {
      return;
    }

    FmcUi.emitElementEvent('FmcUi.handlePresetFileWebpageBrowse', window, 'updatePresetFileWebpage', {
      targetFile: filePath,
      targetFolder: folderPath,
      value: fileName
    });
  }

  /**
   * @function handlePresetLoad
   * @summary Actions to run after the preset "Load" button is clicked
   * @param {object} event - click event
   * @summary Runs on init and when the Presets 'Load' button is pressed
   * @memberof FmcUi
   */
  async handlePresetLoad(event = {}) {
    FmcUi.log('FmcUi.handlePresetLoad');
    const {
      elements,
      fmcThumbsUiInstance
    } = this;

    const {
      presetNamesSelect
    } = elements;

    const {
      isTrusted: notInit
    } = event;

    // get selected preset name from UI
    let presetName = presetNamesSelect.element.value;

    // save the active preset name to indicate that this preset has been (is about to be) loaded
    if (notInit) {
      await window.FmcStore.setActivePresetName({ presetName });
    }

    try {
      // 1. get the active preset name from the store
      // 2. get the preset with the active preset name from the store
      const preset = await window.FmcStore.getActivePreset();

      const {
        fileWebpage,
        folderIn,
        folderOut,
        folderWebsite,
        name
      } = preset;

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updatePresetFileWebpage', {
        targetFile: fileWebpage.targetFile,
        targetFolder: fileWebpage.targetFolder,
        value: fileWebpage.value
      });

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateFilter', { value: '' });

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateFolderIn', {
        targetFolder: folderIn.targetFolder,
        value: folderIn.value
      });

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateFolderOut', {
        targetFolder: folderOut.targetFolder,
        value: folderOut.value
      });

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateFolderWebsite', {
        targetFolder: folderWebsite.targetFolder,
        value: folderWebsite.value
      });

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updatePresetNameActive', { value: name }); // TODO presetName

      const restore = true;

      await this.handleFolderInBrowse(null, restore);
      await this.handleFolderOutBrowse(null, restore);
      await this.handleFolderWebsiteBrowse(null, restore);
      await this.handlePresetFileWebpageBrowse(null, restore);

      fmcThumbsUiInstance.clickSelectedThumb(1);

      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateStatus', {
        statusMessage: `Loaded preset ${name}`,
        statusType: 'success'
      });
    } catch (error) {
      FmcUi.emitElementEvent('FmcUi.handlePresetLoad', window, 'updateStatus', {
        statusMessage: 'No active preset to load',
        statusType: 'warning'
      });
    }
  }

  /**
   * @function handlePresetsOpen
   * @summary Actions to run after the presets modal is opened
   * @memberof FmcUi
   */
  async handlePresetsOpen() {
    FmcUi.log('FmcUi.handlePresetsOpen');
    FmcUi.emitElementEvent('FmcUi.handlePresetsOpen', window, 'updatePresets', {
      label: 'Select a preset',
      options: await window.FmcStore.getPresetNames()
    });

    await this.selectActivePreset();

    // TODO is this necessary
    FmcUi.emitElementEvent('FmcUi.handlePresetsOpen', window, 'updatePresetsFile', { value: await window.FmcStore.getStoreFilePath() });
  }

  /**
   * @function handlePresetSave
   * @summary Actions to run after the "Preset name" "Save" button is clicked
   * @memberof FmcUi
   */
  async handlePresetSave() {
    FmcUi.log('FmcUi.handlePresetSave');
    const {
      elements,
      fmcThumbsUiInstance
    } = this;

    const {
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

    FmcUi.emitElementEvent('FmcUi.handlePresetSave', window, 'updateStatus', msgObj);

    await window.FmcStore.setActivePresetName({ presetName: name });

    FmcUi.emitElementEvent('FmcUi.handlePresetSave', window, 'updatePresetNameActive', { value: name });

    fmcThumbsUiInstance.clickSelectedThumb(1);

    FmcUi.emitElementEvent('FmcUi.handlePresetSave', window, 'updatePresets', {
      label: 'Select a preset',
      options: await window.FmcStore.getPresetNames(),
      value: name
    });
  }

  /**
   * @function handleThumbClick
   * @summary Actions to run after the thumbnails list element is clicked
   * @param {object} event - Click event
   * @memberof FmcUi
   */
  async handleThumbClick(event) {
    FmcUi.log('FmcUi.handleThumbClick', event);
    const {
      elements,
      fmcCroppersUiInstance,
      fmcThumbsUiInstance
    } = this;

    const {
      croppersContainer,
      presets
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

    if (presets.element.hasAttribute('open')) {
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

    FmcUi.emitElementEvent('FmcUi.handleThumbClick', window, 'updateImageLatLong', { value: latLong });

    await this.setPaths(newImageSrc, pathOut);

    // calls fmcCroppersUiInstance.init
    fmcCroppersUiInstance.changeSourceImage(newImageSrc);
  }

  /**
   * @function handleThumbsFilterUncroppedRadiosChange
   * @summary Actions to run after the "Hide Uncropped Thumbnails" option is enabled or disabled
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleThumbsFilterUncroppedRadiosChange(event) {
    FmcUi.log('FmcUi.handleThumbsFilterUncroppedRadiosChange', event);

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ thumbsFilterUncropped: state });

    FmcUi.emitElementEvent('FmcUi.handleThumbsFilterUncroppedRadiosChange', window, 'updateStatus', msgObj);

    await this.handleFilterSubmit();
  }

  /**
   * @function handleWindowKeydown
   * @summary Actions to run after a key is pressed down when the app window has focus
   * @param {object} event - Keydown event
   * @memberof FmcUi
   */
  async handleWindowKeydown(event) {
    FmcUi.log('FmcUi.handleWindowKeydown', event);
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
        FmcUi.emitElementEvent('FmcUi.handleWindowKeydown', filterSubmitButton, 'click', {});
      } else if (metaKey && (key === 'v')) {
        FmcUi.emitElementEvent('FmcUi.handleWindowKeydown', window, 'updateFilter', { value: await window.FmcFile.copyFromClipboard() });
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
   * @summary Actions to run after the app window is resized
   * @memberof FmcUi
   */
  handleWindowResize() {
    FmcUi.log('FmcUi.handleWindowResize');
    const {
      fmcThumbsUiInstance
    } = this;

    fmcThumbsUiInstance.focusThumb('selected');
  }

  /**
   * @function handleWriteFilenameRadiosChange
   * @summary Actions to run after the "Write Focalpoint To Filename" option is enabled or disabled
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleWriteFilenameRadiosChange(event) {
    FmcUi.log('FmcUi.handleWriteFilenameRadiosChange', event);

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointWriteFilename: state });

    FmcUi.emitElementEvent('FmcUi.handleWriteFilenameRadiosChange', window, 'updateStatus', msgObj);

    // TODO : Update Photos app etc
  }

  /**
   * @function handleWriteTitleRadiosChange
   * @summary Actions to run after the "Write Focalpoint To EXIF/IPTC Title" option is enabled or disabled
   * @param {object} event - Change event
   * @memberof FmcUi
   */
  async handleWriteTitleRadiosChange(event) {
    FmcUi.log('FmcUi.handleWriteTitleRadiosChange', event);

    const state = event.target.value;
    const msgObj = await window.FmcStore.setOptions({ focalpointWriteTitle: state });

    FmcUi.emitElementEvent('FmcUi.handleWriteTitleRadiosChange', window, 'updateStatus', msgObj);

    // TODO : Update Photos app etc
  }

  /**
   * @function loadOptions
   * @summary Restore previous UI settings when the UI initialises
   * @memberof FmcUi
   */
  async loadOptions() {
    FmcUi.log('FmcUi.loadOptions');

    try {
      const { options } = await window.FmcStore.getOptions(null);

      FmcUi.log('options', options);

      const {
        focalpointAutoSave = 'off',
        focalpointWriteFilename = 'off',
        focalpointWriteTitle = 'off',
        thumbsAutoSelectFiltered = 'off',
        thumbsFilterUncropped = 'off'
      } = options;

      // TODO: rename to update:foo to make more readable
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateFocalpointAutoSave', { value: focalpointAutoSave });
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateFocalpointWriteFilename', { value: focalpointWriteFilename });
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateFocalpointWriteTitle', { value: focalpointWriteTitle });
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateThumbsAutoSelectFiltered', { value: thumbsAutoSelectFiltered });
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateThumbsFilterUncropped', { value: thumbsFilterUncropped });

      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateStatus', {
        statusMessage: 'Loaded options',
        statusType: 'success'
      });
    } catch (error) {
      FmcUi.emitElementEvent('FmcUi.loadOptions', window, 'updateStatus', {
        statusMessage: 'No options to load',
        statusType: 'warning'
      });
    }
  }

  /**
   * @function saveFocalpoint
   * @summary Save the focalpoint to the image filename or title
   * @memberof FmcUi
   */
  async saveFocalpoint() {
    FmcUi.log('FmcUi.saveFocalpoint');
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

      FmcUi.emitElementEvent('FmcUi.saveFocalpoint', window, 'updateStatus', msgObj);
    }
  }

  /**
   * @function selectActivePreset
   * @summary Get the active preset from FmcStore. Select this preset in the dropdown in the Settings modal.
   * @memberof FmcUi
   */
  async selectActivePreset() {
    // TODO Consider renaming to selectStoredActivePreset
    FmcUi.log('FmcUi.selectActivePreset -> FmcStore.getActivePreset');
    const activePreset = await window.FmcStore.getActivePreset();

    if (typeof activePreset === 'undefined') {
      FmcUi.emitElementEvent('FmcUi.selectActivePreset', window, 'updateStatus', {
        statusMessage: 'No active preset to select',
        statusType: 'warning'
      });

      return;
    }

    // select the preset
    FmcUi.emitElementEvent('FmcUi.selectActivePreset', window, 'updatePresets', { value: activePreset.name });
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
    FmcUi.log('FmcUi.setPaths', src, pathOut, checkPathExists);
    const {
      elements
    } = this;

    const {
      thumbFileName
    } = elements;

    const fileName = FmcUi.getFileNameFromPath(src);
    const pathIn = this.srcSafe(src);

    FmcUi.emitElementEvent('FmcUi.setPaths', window, 'updateImagePathIn', {
      emitter: 'FmcUi.selectActivePreset',
      value: pathIn
    });

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

        FmcUi.emitElementEvent('FmcUi.setPaths', window, 'updateWebEmbedPath', { value: pathWebEmbedSafe });
        FmcUi.emitElementEvent('FmcUi.setPaths', window, 'updateImagePathOut', { value: pathOutSafe });

        resolve();
      }, 500);
    });
  }

  /**
   * @function sleep
   * @summary Pause code execution for a specified duration
   * @param {number} ms - Milliseconds
   * @memberof FmcUi
   * @returns {Promise} promise
   * @see https://leapcell.io/blog/how-to-sleep-in-javascript-using-async-await
   */
  sleep(ms) {
    FmcUi.log('FmcUi.sleep', ms);
    return new Promise(resolve => setTimeout(resolve, ms)); // eslint-disable-line no-promise-executor-return
  }

  /**
   * @function srcSafe
   * @summary Replace encoded spaces with regular ones
   * @param {string} src - Path
   * @returns {string} srcSafe
   * @memberof FmcUi
   */
  srcSafe(src) {
    FmcUi.log('FmcUi.srcSafe', src);
    return src.replace(/%20/g, ' ');
  }

  /**
   * @function useTestData
   * @summary Use fixed data for Cypress testing
   * @memberof FmcUi
   */
  async testData() {
    const {
      fmcThumbsUiInstance
    } = this;

    await fmcThumbsUiInstance.generateThumbsHtml({
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
   * @summary Creates a function that will not be called, as long as it continues to be invoked within `wait` milliseconds
   * @param {Function} func - Function to call
   * @param {number} wait - Wait time in ms
   * @param {boolean} [immediate] - Call the function immediately
   * @returns {Function} A function, that, as long as it continues to be invoked, will not be triggered
   * @memberof FmcUi
   * @static
   * @see {@link https://stackoverflow.com/a/65081210}
   * @see {@link https://www.freecodecamp.org/news/debounce-explained-how-to-make-your-javascript-wait-for-your-user-to-finish-typing-2/}
   */
  static debounce(func, wait, immediate = false) {
    FmcUi.log('FmcUi.debounce', func, wait, immediate);
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
    FmcUi.log('FmcUi.emitEvent', elementId, eventName, eventDetail);

    const element = document.getElementById(elementId);

    FmcUi.emitElementEvent('FmcUi.emitEvent', element, eventName, eventDetail);
  }

  /**
   * @function emitElementEvent
   * @summary Emit a custom event
   * @param {string} callerId - ID of caller eg FmcButtonUi.handleCopyPath
   * @param {Window|HTMLElement} element - element that will dispatch the event
   * @param {string} eventName - Event names are case-sensitive
   * @param {object} eventDetail - name-value pair
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent}
   * @see {@link https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/}
   * @memberof FmcUi
   * @static
   */
  static emitElementEvent(callerId, element, eventName, eventDetail = {}) {
    FmcUi.log(`📢 Custom event "${eventName}" emitted by ${callerId} on element ${element}`, eventDetail);
    const event = new CustomEvent(eventName, {
      bubbles: true, // stop with event.stopPropagation()
      cancelable: true, // cancel with event.preventDefault()
      // composed // web components only
      detail: eventDetail
    });

    element.dispatchEvent(event);
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
    FmcUi.log('FmcUi.getElementIndex', element, nodeList);
    return Array.from(nodeList).indexOf(element);
  }

  /**
   * @function getFileNameFromPath
   * @summary Isolate the file name from the file path
   * @param {string} path - File path
   * @returns {string} fileName
   * @memberof FmcUi
   * @static
   */
  static getFileNameFromPath(path) {
    FmcUi.log('FmcUi.getFileNameFromPath', path);
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
    FmcUi.log('FmcUi.getOffset', el);
    const rect = el.getBoundingClientRect();
    const offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };

    return offset;
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
    FmcUi.log('FmcUi.getTargetElementOfType', event, elementType);
    let targetElement = event.target; // event.currentTarget

    if (targetElement) {
      while (targetElement && targetElement.tagName.toLowerCase() !== elementType) {
        targetElement = targetElement.parentElement;
      }
    }

    return targetElement;
  }

  /**
   * @function log
   * @summary Log debugging messages
   * @param {...any} args - Function arguments
   * @memberof FmcUi
   * @static
   */
  static log(args) { // eslint-disable-line no-unused-vars
    if (FmcUi.debug) {
      const argsArray = [ ...arguments ];
      const firstArgIsStr = typeof argsArray[0] === 'string';
      const label = firstArgIsStr ? argsArray[0] : 'debug';
      if (firstArgIsStr) {
        argsArray.shift();
      }

      // const strinfigiedArgs = argsArray.map(arg => typeof arg === 'object' ? JSON.stringify(arg, 2) : arg);

      const timestamp = new Date().toLocaleTimeString();

      let style = 'font-weight: normal';

      if (label.match(/Custom event/)) {
        style += '; color: grey';
      }

      console.groupCollapsed(`%c${timestamp} - ${label}`, style);
      console.log(argsArray); // .toString()
      // argsArray.forEach(arg => console.log(arg));
      console.groupEnd();
    }
  }
}
