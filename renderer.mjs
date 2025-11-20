// Electron's render process (web page)

import { FmcButtonUi } from './classes/FmcButtonUi.mjs';
import { FmcCroppersUi } from './classes/FmcCroppersUi.mjs';
import { FmcRadiosUi } from './classes/FmcRadiosUi.mjs';
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

  const elements = {
    activePresetName: document.getElementById('active-preset-name'),
    consoleContainer: document.getElementById('console'),
    consoleContainerOuter: document.getElementById('console-container'),
    consoleType: document.getElementById('console-type'),
    copyLatLongButton: new FmcButtonUi({
      selector: '#copy-lat-long',
      updateEventName: 'updateLatLng',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathInButton: new FmcButtonUi({
      selector: '#copy-path-in',
      updateEventName: 'updatePathIn',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathOutButton: new FmcButtonUi({
      selector: '#copy-path-out',
      updateEventName: 'updatePathOut',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathWebEmbedButton: new FmcButtonUi({
      selector: '#copy-path-web-embed',
      updateEventName: 'updatePathWebEmbed',
      clickEventHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    croppersContainer: document.getElementById('croppers'),
    openPresetsInput: document.getElementById('open-presets'),
    fileWebpageInput: document.getElementById('file-webpage'),
    filter: document.getElementById('thumb-filename-filter'),
    focalpointAutoSaveRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-autosave"]',
      storeKey: 'focalpointAutoSave'
    }),
    focalpointProportionsRadios: document.getElementsByName('focalpoint-proportions'),
    focalpointWriteFilenameRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-filename"]',
      storeKey: 'focalpointWriteFilename'
    }),
    focalpointWriteTitleRadios: new FmcRadiosUi({
      selector: 'input[name="focalpoint-write-title"]',
      storeKey: 'focalpointWriteTitle'
    }),
    focalpointXInput: document.getElementById('focalpoint-x'),
    focalpointYInput: document.getElementById('focalpoint-y'),
    folderInInput: document.getElementById('folder-in'),
    folderOutInput: document.getElementById('folder-out'),
    folderOutInputDependent: document.querySelector('[data-dependent="folder-out"]'),
    folderWebsiteInput: document.getElementById('folder-website'),
    lastCropperImg: document.querySelector('#croppers .img-container-last img'),
    options: document.getElementById('options'),
    pathInLink: new FmcButtonUi({
      selector: '#link-path-in',
      updateEventName: 'updatePathInLink',
      clickEventHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    pathOutLink: new FmcButtonUi({
      selector: '#link-path-out',
      updateEventName: 'updatePathOutLink',
      clickEventHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    presetNamesSelect: document.getElementById('preset-names'),
    settings: document.getElementById('settings'),
    presetNameInput: document.getElementById('settings-preset-name'),
    thumbsContainer: document.getElementById(thumbsContainerId),
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
    selectors: {
      cropperCanvasClass: 'cropper-canvas',
      cropperImageClass: 'cropper-image',
      croppersId: 'croppers'
    },
    updateDelay: (typeof Cypress === 'undefined') ? 1000 : 0
  });

  const fmcThumbsUiInstance = new FmcThumbsUi({
    elements,
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
    elements,
    exportDelay: 750,
    fmcCroppersUiInstance,
    fmcThumbsUiInstance,
    selectors: {
      thumbButtonClass,
      thumbClass,
      thumbImgClass
    }
  });

  // add these elements once fmcUi exists
  fmcUi.elements = {
    ...fmcUi.elements,
    editWebpageButton: new FmcButtonUi({
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
      selector: '#file-webpage-button',
      clickEventHandler: [ fmcUi, 'handleFileWebpageBrowse' ]
    }),
    filterClearButton: new FmcButtonUi({
      selector: '#thumb-filename-filter-clear',
      clickEventHandler: [ fmcUi, 'handleFilterClear' ]
    }),
    filterSubmitButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#thumb-filename-filter-submit',
      clickEventHandler: [ fmcUi, 'handleFilterSubmit' ]
    }),
    focalpointDeleteButton: new FmcButtonUi({
      selector: '#delete-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointDelete' ]
    }),
    focalpointResetButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#reset-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointReset' ]
    }),
    focalpointSaveButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#save-focalpoint',
      clickEventHandler: [ fmcUi, 'handleFocalpointSave' ]
    }),
    folderInButton: new FmcButtonUi({
      selector: '#folder-in-button',
      clickEventHandler: [ fmcUi, 'handleFolderInBrowse' ]
    }),
    folderOutButton: new FmcButtonUi({
      selector: '#folder-out-button',
      clickEventHandler: [ fmcUi, 'handleFolderOutBrowse' ]
    }),
    folderWebsiteButton: new FmcButtonUi({
      selector: '#folder-website-button',
      clickEventHandler: [ fmcUi, 'handleFolderWebsiteBrowse' ]
    }),
    openPresetsButton: new FmcButtonUi({
      selector: '#open-presets-button',
      clickEventHandler: [ fmcUi, 'handleEditPresets' ]
    }),
    optionsCloseButton: new FmcButtonUi({
      selector: '#options-close',
      clickEventHandler: [ fmcUi, 'handleOptionsClose' ]
    }),
    optionsOpenButton: new FmcButtonUi({
      selector: '#options-open',
      clickEventHandler: [ fmcUi, 'handleOptionsOpen' ]
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
    })
  };

  const handleFocalpointInputDebounced = FmcUi.debounce(fmcUi.handleFocalpointInputChange, fmcUi.debounceDelay);

  elements.croppersContainer.addEventListener('imageRenamed', fmcUi.handleImageRenamed.bind(fmcUi));
  elements.focalpointAutoSaveRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleAutosaveRadioChange.bind(fmcUi)));
  elements.focalpointProportionsRadios.forEach(el => el.addEventListener('change', fmcUi.handleFocalpointInputChange.bind(fmcUi)));
  elements.focalpointWriteFilenameRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleWriteFilenameRadioChange.bind(fmcUi)));
  elements.focalpointWriteTitleRadios.elements.forEach(el => el.addEventListener('change', fmcUi.handleWriteTitleRadioChange.bind(fmcUi)));
  elements.focalpointXInput.addEventListener('change', handleFocalpointInputDebounced.bind(fmcUi));
  elements.focalpointYInput.addEventListener('change', handleFocalpointInputDebounced.bind(fmcUi));
  elements.lastCropperImg.addEventListener('ready', fmcUi.handleLastCropperImgReady.bind(fmcUi));
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
