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

  const elements = {
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
    focalpointAutoSaveRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-autosave"]',
      storeKey: 'focalpointAutoSave'
    }),
    focalpointProportionsRadios: document.getElementsByName(focalpointProportionsRadiosName),
    focalpointResetButton: document.getElementById('reset-focalpoint'),
    focalpointSaveButton: document.getElementById('save-focalpoint'),
    focalpointWriteFilenameRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-filename"]',
      storeKey: 'focalpointWriteFilename'
    }),
    focalpointWriteTitleRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-title"]',
      storeKey: 'focalpointWriteTitle'
    }),
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
    thumbsAutoSelectFilteredRadios: new FmcRadiosUi({
      selector: 'input[name="thumbs-autoselect-filtered"]',
      storeKey: 'thumbsAutoSelectFiltered'
    }),
    thumbsFilterUncroppedRadios: new FmcRadiosUi({
      selector: 'input[name="thumbs-filter-uncropped"]',
      storeKey: 'thumbsFilterUncropped'
    }),
    window: window
  };

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
    elements,
    focalpointProportionsRadiosName,
    focalpointXInputId,
    focalpointYInputId,
    updateDelay: (typeof Cypress === 'undefined') ? 1000 : 0
  });

  const fmcThumbsUiInstance = new FmcThumbsUi({
    elements,
    hideClass,
    selectedClass: 'btn-selected',
    thumbButtonClass,
    thumbClass,
    thumbImgClass,
    thumbImgWrapperClass: 'thumb-img-wrapper',
    thumbMetaClass: 'thumb-meta',
    thumbsCountId: 'thumb-count',
    thumbsId: 'thumbs'
  });

  const fmcUi = new FmcUi({
    debounceDelay: 500,
    elements,
    exportDelay: 750,
    fmcCroppersUiInstance,
    fmcThumbsUiInstance,
    selectors: {
      controlHintClass,
      thumbButtonClass,
      thumbClass,
      thumbImgClass
    }
  });

  const handleFocalpointInputDebounced = FmcUi.debounce(fmcUi.handleFocalpointInputChange, fmcUi.debounceDelay);

  elements.croppersContainer.addEventListener('imageRenamed', fmcUi.handleImageRenamed.bind(fmcUi));
  elements.editWebpageButton.addEventListener('click', fmcUi.handleEditWebpage.bind(fmcUi));
  elements.openPresetsButton.addEventListener('click', fmcUi.handleEditPresets.bind(fmcUi));
  elements.exportAllButton.addEventListener('click', fmcUi.handleExportAll.bind(fmcUi));
  elements.exportSelectedButton.addEventListener('click', fmcUi.handleExportSelected.bind(fmcUi));
  elements.fileWebpageButton.addEventListener('click', fmcUi.handleFileWebpageBrowse.bind(fmcUi));
  elements.filterClearButton.addEventListener('click', fmcUi.handleFilterClear.bind(fmcUi));
  elements.filterSubmitButton.addEventListener('click', fmcUi.handleFilterSubmit.bind(fmcUi));
  elements.focalpointAutoSaveRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleAutosaveRadioChange.bind(fmcUi)));
  elements.focalpointDeleteButton.addEventListener('click', fmcUi.handleFocalpointDelete.bind(fmcUi));
  elements.focalpointProportionsRadios.forEach(el => el.addEventListener('change', fmcUi.handleFocalpointInputChange.bind(fmcUi)));
  elements.focalpointResetButton.addEventListener('click', fmcUi.handleFocalpointReset.bind(fmcUi));
  elements.focalpointSaveButton.addEventListener('click', fmcUi.handleFocalpointSave.bind(fmcUi));
  elements.focalpointWriteFilenameRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleWriteFilenameRadioChange.bind(fmcUi)));
  elements.focalpointWriteTitleRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleWriteTitleRadioChange.bind(fmcUi)));
  elements.focalpointXInput.addEventListener('change', handleFocalpointInputDebounced.bind(fmcUi));
  elements.focalpointYInput.addEventListener('change', handleFocalpointInputDebounced.bind(fmcUi));
  elements.folderInButton.addEventListener('click', fmcUi.handleFolderInBrowse.bind(fmcUi));
  elements.folderOutButton.addEventListener('click', fmcUi.handleFolderOutBrowse.bind(fmcUi));
  elements.folderWebsiteButton.addEventListener('click', fmcUi.handleFolderWebsiteBrowse.bind(fmcUi));
  elements.lastCropperImg.addEventListener('ready', fmcUi.handleLastCropperImgReady.bind(fmcUi));
  elements.optionsOpenButton.addEventListener('click', fmcUi.handleOptionsOpen.bind(fmcUi));
  elements.optionsCloseButton.addEventListener('click', fmcUi.handleOptionsClose.bind(fmcUi));
  elements.settingsOpenButton.addEventListener('click', fmcUi.handleSettingsOpen.bind(fmcUi));
  elements.settingsCloseButton.addEventListener('click', fmcUi.handleSettingsClose.bind(fmcUi));
  elements.settingsLoadButton.addEventListener('click', fmcUi.handleSettingsLoad.bind(fmcUi));
  elements.settingsSaveButton.addEventListener('click', fmcUi.handleSettingsSave.bind(fmcUi));
  elements.pathInLink.addEventListener('click', fmcUi.handleLinkToPath.bind(fmcUi));
  elements.pathOutLink.addEventListener('click', fmcUi.handleLinkToPath.bind(fmcUi));
  elements.thumbsAutoSelectFilteredRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleAutoSelectFilteredRadioChange.bind(fmcUi)));
  elements.thumbsContainer.addEventListener('click', fmcUi.handleThumbClick.bind(fmcUi));
  elements.thumbsFilterUncroppedRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleThumbsFilterUncroppedRadiosChange.bind(fmcUi)));
  elements.window.addEventListener('keydown', fmcUi.handleWindowKeydown.bind(fmcUi));
  elements.window.addEventListener('message', fmcUi.handleWindowMessage.bind(fmcUi));
  elements.window.addEventListener('resize', fmcUi.handleWindowResize.bind(fmcUi));

  await fmcUi.restoreSettings();

  if (typeof window.electronAPI === 'undefined') {
    FmcUi.testData();
  }
});
