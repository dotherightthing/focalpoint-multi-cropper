// Electron's render process (web page)

import { FmcButtonUi } from './classes/FmcButtonUi.mjs';
import { FmcCroppersUi } from './classes/FmcCroppersUi.mjs';
import { FmcRadiosUi } from './classes/FmcRadiosUi.mjs';
import { FmcThumbsUi } from './classes/FmcThumbsUi.mjs';
import { FmcUi } from './classes/FmcUi.mjs';

// listeners

window.addEventListener('DOMContentLoaded', async () => {
  // instantiate classes

  const controlHintClass = 'control-hint';
  const focalpointProportionsRadiosName = 'focalpoint-proportions';
  const focalpointXInputId = 'focalpoint-x';
  const focalpointYInputId = 'focalpoint-y';
  const hideClass = 'cropper-hide';
  const thumbButtonClass = 'btn-thumb';
  const thumbClass = 'thumb';
  const thumbImgClass = 'thumb-img';

  const focalpointAutoSaveRadios = new FmcRadiosUi({
    selector: 'input[name="focalpoint-autosave"]',
    storeKey: 'focalpointAutoSave'
  });

  const focalpointWriteFilenameRadios = new FmcRadiosUi({
    selector: 'input[name="focalpoint-write-filename"]',
    storeKey: 'focalpointWriteFilename'
  });

  const focalpointWriteTitleRadios = new FmcRadiosUi({
    selector: 'input[name="focalpoint-write-title"]',
    storeKey: 'focalpointWriteTitle'
  });

  const thumbsFilterUncroppedRadios = new FmcRadiosUi({
    selector: 'input[name="thumbs-filter-uncropped"]',
    storeKey: 'thumbsFilterUncropped'
  });

  const thumbsAutoSelectFilteredRadios = new FmcRadiosUi({
    selector: 'input[name="thumbs-autoselect-filtered"]',
    storeKey: 'thumbsAutoSelectFiltered'
  });

  const fmcCroppersUiInstance = new FmcCroppersUi({
    Cropper: window.Cropper,
    cropperCanvasClass: 'cropper-canvas',
    cropperImageClass: 'cropper-image',
    croppersId: 'croppers',
    croppersOptions: {
      autoCrop: true, // Enable to crop the image automatically when initialized
      autoCropArea: 1, // Define the automatic cropping area size - as 100% of the image
      background: true, // Show the grid background of the container
      center: true, // Show the center indicator above the crop box
      checkCrossOrigin: true, // Check if the current image is a cross-origin image
      checkOrientation: false, // Check the current image's Exif Orientation information
      cropBoxMovable: false, // Enable to move the crop box by dragging
      cropBoxResizable: false, // Enable to resize the crop box by dragging
      dragMode: 'none', // create a new crop box | move the canvas | do nothing
      guides: true, // Show the dashed lines above the crop box
      highlight: true, // Show the white modal above the crop box (highlight the crop box)
      modal: true, // Show the black modal above the image and under the crop box
      movable: false, // Enable to move the image
      preview: '', // Add extra elements (containers) for preview
      responsive: (typeof Cypress === 'undefined'), // Re-render the cropper when resizing the window
      restore: true, // Restore the cropped area after resizing the window
      rotatable: true, // TODO: rotate should affect entire image, not just the crop, so requires an additional pre-crop
      scalable: false, // Enable to scale the image
      toggleDragModeOnDblclick: false, // Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper
      viewMode: 1, // restrict the crop box not to exceed the size of the canvas
      zoomable: false, // Enable to zoom the image
      zoomOnTouch: false, // Enable to zoom the image by dragging touch
      zoomOnWheel: false // Enable to zoom the image by mouse wheeling
    },
    focalpointProportionsRadiosName,
    focalpointWriteFilenameRadios,
    focalpointWriteTitleRadios,
    focalpointXInputId,
    focalpointYInputId,
    updateDelay: (typeof Cypress === 'undefined') ? 1000 : 0
  });

  const fmcThumbsUiInstance = new FmcThumbsUi({
    hideClass,
    selectedClass: 'btn-selected',
    thumbButtonClass,
    thumbClass,
    thumbImgClass,
    thumbImgWrapperClass: 'thumb-img-wrapper',
    thumbMetaClass: 'thumb-meta',
    thumbsCountId: 'thumb-count',
    thumbsId: 'thumbs',
    thumbsAutoSelectFilteredRadios,
    thumbsFilterUncroppedRadios
  });

  const fmcUi = new FmcUi({
    debounceDelay: 500,
    elements: {
      activePresetName: document.getElementById('active-preset-name'),
      consoleContainer: document.getElementById('console'),
      consoleContainerOuter: document.getElementById('console-container'),
      consoleType: document.getElementById('console-type'),
      copyLatLongButton: new FmcButtonUi({
        selector: '#copy-lat-long',
        updateEventName: 'updateLatLng',
        clickEventHandler: FmcButtonUi.handleCopyPath
      }),
      copyPathInButton: new FmcButtonUi({
        selector: '#copy-path-in',
        updateEventName: 'updatePathIn',
        clickEventHandler: FmcButtonUi.handleCopyPath
      }),
      copyPathOutButton: new FmcButtonUi({
        selector: '#copy-path-out',
        updateEventName: 'updatePathOut',
        clickEventHandler: FmcButtonUi.handleCopyPath
      }),
      copyPathWebEmbedButton: new FmcButtonUi({
        selector: '#copy-path-web-embed',
        updateEventName: 'updatePathWebEmbed',
        clickEventHandler: FmcButtonUi.handleCopyPath
      }),
      croppersContainer: document.getElementById('croppers'),
      editWebpageButton: document.getElementById('edit-webpage'),
      exportAllButton: document.getElementById('crop-all'),
      exportSelectedButton: document.getElementById('crop-selected'),
      openPresetsButton: document.getElementById('open-presets-button'),
      openPresetsInput: document.getElementById('open-presets'),
      fileWebpageButton: document.getElementById('file-webpage-button'),
      fileWebpageInput: document.getElementById('file-webpage'),
      filter: document.getElementById('thumb-filename-filter'),
      filterClearButton: document.getElementById('thumb-filename-filter-clear'),
      filterSubmitButton: document.getElementById('thumb-filename-filter-submit'),
      focalpointDeleteButton: document.getElementById('delete-focalpoint'),
      focalpointProportionsRadios: document.getElementsByName(focalpointProportionsRadiosName),
      focalpointResetButton: document.getElementById('reset-focalpoint'),
      focalpointSaveButton: document.getElementById('save-focalpoint'),
      focalpointXInput: document.getElementById(focalpointXInputId),
      focalpointYInput: document.getElementById(focalpointYInputId),
      folderInButton: document.getElementById('folder-in-button'),
      folderInInput: document.getElementById('folder-in'),
      folderOutButton: document.getElementById('folder-out-button'),
      folderOutInput: document.getElementById('folder-out'),
      folderOutInputDependent: document.querySelector('[data-dependent="folder-out"]'),
      folderWebsiteButton: document.getElementById('folder-website-button'),
      folderWebsiteInput: document.getElementById('folder-website'),
      lastCropperImg: document.querySelector('#croppers .img-container-last img'),
      options: document.getElementById('options'),
      optionsCloseButton: document.getElementById('options-close'),
      optionsOpenButton: document.getElementById('options-open'),
      pathInLink: document.getElementById('link-path-in'),
      pathOutLink: document.getElementById('link-path-out'),
      presetNamesSelect: document.getElementById('preset-names'),
      settings: document.getElementById('settings'),
      settingsCloseButton: document.getElementById('settings-close'),
      settingsOpenButton: document.getElementById('settings-open'),
      settingsLoadButton: document.getElementById('settings-load'),
      settingsSaveButton: document.getElementById('settings-save'),
      presetNameInput: document.getElementById('settings-preset-name'),
      thumbsContainer: document.getElementById('thumbs'),
      thumbsContainerOuter: document.getElementById('thumbs-container'),
      thumbFileName: document.getElementById('thumb-filename'),
      window: window
    },
    exportDelay: 750,
    fmcCroppersUiInstance,
    fmcThumbsUiInstance,
    focalpointAutoSaveRadios,
    focalpointWriteFilenameRadios,
    focalpointWriteTitleRadios,
    thumbsAutoSelectFilteredRadios,
    thumbsFilterUncroppedRadios,
    selectors: {
      controlHintClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass
    }
  });

  /**
   * @function addEventListeners
   * @summary Expose fmcUi event listeners in renderer to simplify debugging
   * @memberof FmcUi
   */
  fmcUi.addEventListeners = () => {
    const _this = fmcUi;

    const {
      debounceDelay,
      elements
    } = _this;

    const {
      croppersContainer,
      editWebpageButton,
      exportAllButton,
      exportSelectedButton,
      openPresetsButton,
      fileWebpageButton,
      filterClearButton,
      filterSubmitButton,
      focalpointDeleteButton,
      focalpointProportionsRadios,
      focalpointResetButton,
      focalpointSaveButton,
      focalpointXInput,
      focalpointYInput,
      folderInButton,
      folderOutButton,
      folderWebsiteButton,
      lastCropperImg,
      optionsCloseButton,
      optionsOpenButton,
      pathInLink,
      pathOutLink,
      settingsCloseButton,
      settingsLoadButton,
      settingsOpenButton,
      settingsSaveButton,
      thumbsContainer,
      window
    } = elements;

    const handleFocalpointInputDebounced = FmcUi.debounce(_this.handleFocalpointInputChange, debounceDelay);

    croppersContainer
      .addEventListener('imageRenamed', _this.handleImageRenamed.bind(_this));
    editWebpageButton
      .addEventListener('click', _this.handleEditWebpage.bind(_this));
    openPresetsButton
      .addEventListener('click', _this.handleEditPresets.bind(_this));
    exportAllButton
      .addEventListener('click', _this.handleExportAll.bind(_this));
    exportSelectedButton
      .addEventListener('click', _this.handleExportSelected.bind(_this));
    fileWebpageButton
      .addEventListener('click', _this.handleFileWebpageBrowse.bind(_this));
    filterClearButton
      .addEventListener('click', _this.handleFilterClear.bind(_this));
    filterSubmitButton
      .addEventListener('click', _this.handleFilterSubmit.bind(_this));
    focalpointAutoSaveRadios.elements.forEach(el => el
      .addEventListener('change', _this.handleAutosaveRadioChange.bind(_this)));
    focalpointDeleteButton
      .addEventListener('click', _this.handleFocalpointDelete.bind(_this));
    focalpointProportionsRadios.forEach(el => el
      .addEventListener('change', _this.handleFocalpointInputChange.bind(_this)));
    focalpointResetButton
      .addEventListener('click', _this.handleFocalpointReset.bind(_this));
    focalpointSaveButton
      .addEventListener('click', _this.handleFocalpointSave.bind(_this));
    focalpointWriteFilenameRadios.elements.forEach(el => el
      .addEventListener('change', _this.handleWriteFilenameRadioChange.bind(_this)));
    focalpointWriteTitleRadios.elements.forEach(el => el
      .addEventListener('change', _this.handleWriteTitleRadioChange.bind(_this)));
    focalpointXInput
      .addEventListener('change', handleFocalpointInputDebounced.bind(_this));
    focalpointYInput
      .addEventListener('change', handleFocalpointInputDebounced.bind(_this));
    folderInButton
      .addEventListener('click', _this.handleFolderInBrowse.bind(_this));
    folderOutButton
      .addEventListener('click', _this.handleFolderOutBrowse.bind(_this));
    folderWebsiteButton
      .addEventListener('click', _this.handleFolderWebsiteBrowse.bind(_this));
    lastCropperImg
      .addEventListener('ready', _this.handleLastCropperImgReady.bind(_this));
    optionsOpenButton
      .addEventListener('click', _this.handleOptionsOpen.bind(_this));
    optionsCloseButton
      .addEventListener('click', _this.handleOptionsClose.bind(_this));
    settingsOpenButton
      .addEventListener('click', _this.handleSettingsOpen.bind(_this));
    settingsCloseButton
      .addEventListener('click', _this.handleSettingsClose.bind(_this));
    settingsLoadButton
      .addEventListener('click', _this.handleSettingsLoad.bind(_this));
    settingsSaveButton
      .addEventListener('click', _this.handleSettingsSave.bind(_this));
    pathInLink
      .addEventListener('click', _this.handleLinkToPath.bind(_this));
    pathOutLink
      .addEventListener('click', _this.handleLinkToPath.bind(_this));
    thumbsAutoSelectFilteredRadios.elements.forEach(el => el
      .addEventListener('change', _this.handleAutoSelectFilteredRadioChange.bind(_this)));
    thumbsContainer
      .addEventListener('click', _this.handleThumbClick.bind(_this));
    thumbsFilterUncroppedRadios.elements.forEach(el => el
      .addEventListener('change', _this.handleThumbsFilterUncroppedRadiosChange.bind(_this)));
    window
      .addEventListener('keydown', _this.handleWindowKeydown.bind(_this));
    window
      .addEventListener('message', _this.handleWindowMessage.bind(_this));
    window
      .addEventListener('resize', _this.handleWindowResize.bind(_this));
  };

  // function calls

  fmcUi.addEventListeners();

  await fmcUi.restoreSettings();

  if (typeof window.electronAPI === 'undefined') {
    FmcUi.testData();
  }
});
