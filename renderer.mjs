// Electron's render process (web page)

import { FmcButtonUi } from './classes/FmcButtonUi.mjs';
import { FmcCroppersUi } from './classes/FmcCroppersUi.mjs';
import { FmcDialogUi } from './classes/FmcDialogUi.mjs';
import { FmcRadiosUi } from './classes/FmcRadiosUi.mjs';
import { FmcSelectUi } from './classes/FmcSelectUi.mjs';
import { FmcTextDisplayUi } from './classes/FmcTextDisplayUi.mjs';
import { FmcTextfieldUi } from './classes/FmcTextfieldUi.mjs';
import { FmcThumbsUi } from './classes/FmcThumbsUi.mjs';
import { FmcUi } from './classes/FmcUi.mjs';

// listeners

window.addEventListener('DOMContentLoaded', async () => {
  // instantiate classes

  const hideClass = 'cropper-hide';
  const thumbButtonClass = 'btn-thumb';
  const thumbClass = 'thumb';
  const thumbImgClass = 'thumb-img';
  const thumbsContainerId = 'thumbs';

  const fmcCroppersUiInstance = new FmcCroppersUi({
    Cropper: window.Cropper,
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
    elements: {},
    selectors: {
      cropperCanvasClass: 'cropper-canvas',
      cropperImageClass: 'cropper-image',
      croppersId: 'croppers'
    },
    updateDelay: (typeof Cypress === 'undefined') ? 1000 : 0
  });

  const fmcThumbsUiInstance = new FmcThumbsUi({
    elements: {},
    fmcCroppersUiInstance,
    selectors: {
      hideClass,
      selectedClass: 'btn-selected',
      thumbButtonClass,
      thumbClass,
      thumbImgClass,
      thumbImgWrapperClass: 'thumb-img-wrapper',
      thumbMetaClass: 'thumb-meta',
      thumbsContainerId,
      thumbsCountId: 'thumb-count'
    }
  });

  const fmcUi = new FmcUi({
    debounceDelay: 500,
    elements: {},
    exportDelay: 750,
    fmcCroppersUiInstance,
    fmcThumbsUiInstance,
    selectors: {
      thumbButtonClass,
      thumbClass,
      thumbImgClass
    }
  });

  // once fmcUi exists
  const elements = {
    activePresetName: new FmcTextDisplayUi({
      selector: '#active-preset-name'
    }),
    consoleContainer: document.getElementById('console'),
    consoleContainerOuter: document.getElementById('console-container'),
    consoleType: new FmcTextDisplayUi({
      selector: '#console-type'
    }),
    copyLatLongButton: new FmcButtonUi({
      action: 'copy', // title
      selector: '#copy-lat-long',
      updateEventName: 'updateLatLng',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathInButton: new FmcButtonUi({
      action: 'copy', // title
      selector: '#copy-path-in',
      updateEventName: 'updatePathIn',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathOutButton: new FmcButtonUi({
      action: 'copy', // title
      selector: '#copy-path-out',
      updateEventName: 'updatePathOut',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathWebEmbedButton: new FmcButtonUi({
      action: 'copy', // title
      selector: '#copy-path-web-embed',
      updateEventName: 'updatePathWebEmbed',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    croppersContainer: document.getElementById('croppers'),
    editWebpageButton: new FmcButtonUi({
      action: 'edit',
      selector: '#edit-webpage',
      clickEventHandler: [ fmcUi, 'handleEditWebpage' ]
    }),
    exportAllButton: new FmcButtonUi({
      selector: '#crop-all',
      clickEventHandler: [ fmcUi, 'handleExportAll' ]
    }),
    exportSelectedButton: new FmcButtonUi({
      selector: '#crop-selected',
      clickEventHandler: [ fmcUi, 'handleExportSelected' ]
    }),
    fileWebpageButton: new FmcButtonUi({
      action: 'browse',
      selector: '#file-webpage-button',
      clickEventHandler: [ fmcUi, 'handleFileWebpageBrowse' ]
    }),
    fileWebpageInput: new FmcTextfieldUi({
      selector: '#file-webpage'
    }),
    filter: new FmcTextfieldUi({
      selector: '#thumb-filename-filter'
    }),
    filterClearButton: new FmcButtonUi({
      selector: '#thumb-filename-filter-clear',
      clickEventHandler: [ fmcUi, 'handleFilterClear' ]
    }),
    filterSubmitButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#thumb-filename-filter-submit',
      clickEventHandler: [ fmcUi, 'handleFilterSubmit' ]
    }),
    focalpointAutoSaveRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-autosave"]',
      storeKey: 'focalpointAutoSave',
      changeEventHandler: [ fmcUi, 'handleAutosaveRadioChange' ]
    }),
    focalpointDeleteButton: new FmcButtonUi({
      selector: '#delete-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointDelete' ]
    }),
    focalpointResetButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#reset-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointReset' ]
    }),
    focalpointProportionsRadios: document.getElementsByName('focalpoint-proportions'),
    focalpointSaveButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#save-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointSave' ]
    }),
    focalpointWriteFilenameRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-filename"]',
      storeKey: 'focalpointWriteFilename',
      changeEventHandler: [ fmcUi, 'handleWriteFilenameRadioChange' ]
    }),
    focalpointWriteTitleRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-title"]',
      storeKey: 'focalpointWriteTitle',
      changeEventHandler: [ fmcUi, 'handleWriteTitleRadioChange' ]
    }),
    focalpointXInput: new FmcTextfieldUi({
      selector: '#focalpoint-x',
      changeEventHandler: [ fmcUi, 'handleFocalpointInputChangeDebounced' ]
    }),
    focalpointYInput: new FmcTextfieldUi({
      selector: '#focalpoint-y',
      changeEventHandler: [ fmcUi, 'handleFocalpointInputChangeDebounced' ]
    }),
    folderInButton: new FmcButtonUi({
      action: 'browse',
      selector: '#folder-in-button',
      clickEventHandler: [ fmcUi, 'handleFolderInBrowse' ]
    }),
    folderInInput: new FmcTextfieldUi({
      selector: '#folder-in'
    }),
    folderOutButton: new FmcButtonUi({
      action: 'browse',
      selector: '#folder-out-button',
      clickEventHandler: [ fmcUi, 'handleFolderOutBrowse' ]
    }),
    folderOutInput: new FmcTextfieldUi({
      selector: '#folder-out'
    }),
    folderOutInputDependent: document.querySelector('[data-dependent="folder-out"]'),
    folderWebsiteButton: new FmcButtonUi({
      action: 'browse',
      selector: '#folder-website-button',
      clickEventHandler: [ fmcUi, 'handleFolderWebsiteBrowse' ]
    }),
    folderWebsiteInput: new FmcTextfieldUi({
      selector: '#folder-website'
    }),
    lastCropperImg: document.querySelector('#croppers .img-container-last img'),
    openPresetsButton: new FmcButtonUi({
      selector: '#open-presets-button',
      clickEventHandler: [ fmcUi, 'handleEditPresets' ]
    }),
    openPresetsInput: new FmcTextfieldUi({
      selector: '#open-presets'
    }),
    options: new FmcDialogUi({
      selector: '#options'
    }),
    optionsCloseButton: new FmcButtonUi({
      selector: '#options-close',
      clickEventHandler: [ fmcUi, 'handleOptionsClose' ]
    }),
    optionsOpenButton: new FmcButtonUi({
      selector: '#options-open',
      clickEventHandler: [ fmcUi, 'handleOptionsOpen' ]
    }),
    pathInLink: new FmcButtonUi({
      action: 'openFinder', // href, title
      selector: '#link-path-in',
      updateEventName: 'updatePathIn',
      clickEventHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    pathOutLink: new FmcButtonUi({
      action: 'openFinder', // href, title
      selector: '#link-path-out',
      updateEventName: 'updatePathOut',
      clickEventHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    presetNameInput: new FmcTextfieldUi({
      selector: '#settings-preset-name'
    }),
    presetNamesSelect: new FmcSelectUi({
      selector: '#preset-names'
    }),
    settings: new FmcDialogUi({
      selector: '#settings'
    }),
    settingsCloseButton: new FmcButtonUi({
      selector: '#settings-close',
      clickEventHandler: [ fmcUi, 'handleSettingsClose' ]
    }),
    settingsLoadButton: new FmcButtonUi({
      selector: '#settings-load',
      clickEventHandler: [ fmcUi, 'handleSettingsLoad' ]
    }),
    settingsOpenButton: new FmcButtonUi({
      selector: '#settings-open',
      clickEventHandler: [ fmcUi, 'handleSettingsOpen' ]
    }),
    settingsSaveButton: new FmcButtonUi({
      selector: '#settings-save',
      clickEventHandler: [ fmcUi, 'handleSettingsSave' ]
    }),
    thumbsAutoSelectFilteredRadios: new FmcRadiosUi({
      selector: 'input[name="thumbs-autoselect-filtered"]',
      storeKey: 'thumbsAutoSelectFiltered',
      changeEventHandler: [ fmcUi, 'handleAutoSelectFilteredRadioChange' ]
    }),
    thumbFileName: new FmcTextDisplayUi({
      selector: '#thumb-filename'
    }),
    thumbsFilterUncroppedRadios: new FmcRadiosUi({
      selector: 'input[name="thumbs-filter-uncropped"]',
      storeKey: 'thumbsFilterUncropped',
      changeEventHandler: [ fmcUi, 'handleThumbsFilterUncroppedRadiosChange' ]
    }),
    thumbsContainer: document.getElementById(thumbsContainerId),
    thumbsContainerOuter: document.getElementById('thumbs-container'),
    window: window
  };

  fmcCroppersUiInstance.elements = elements;
  fmcThumbsUiInstance.elements = elements;
  fmcUi.elements = elements;

  elements.croppersContainer.addEventListener('imageRenamed', fmcUi.handleImageRenamed.bind(fmcUi));
  elements.focalpointProportionsRadios.forEach(el => el.addEventListener('change', fmcUi.handleFocalpointInputChange.bind(fmcUi)));
  elements.lastCropperImg.addEventListener('ready', fmcUi.handleLastCropperImgReady.bind(fmcUi));
  elements.thumbsContainer.addEventListener('click', fmcUi.handleThumbClick.bind(fmcUi));
  elements.window.addEventListener('keydown', fmcUi.handleWindowKeydown.bind(fmcUi));
  elements.window.addEventListener('message', fmcUi.handleWindowMessage.bind(fmcUi));
  elements.window.addEventListener('resize', fmcUi.handleWindowResize.bind(fmcUi));

  await fmcUi.restoreSettings();

  if (typeof window.electronAPI === 'undefined') {
    FmcUi.testData();
  }
});
