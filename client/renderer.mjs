// Electron's render process (web page)

import { FmcButtonUi } from './FmcButtonUi.mjs';
import { FmcCropperImgUi } from './FmcCropperImgUi.mjs';
import { FmcCroppersUi } from './FmcCroppersUi.mjs';
import { FmcDialogUi } from './FmcDialogUi.mjs';
import { FmcRadiosUi } from './FmcRadiosUi.mjs';
import { FmcSelectUi } from './FmcSelectUi.mjs';
import { FmcStatusBarUi } from './FmcStatusBarUi.mjs';
import { FmcTextDisplayUi } from './FmcTextDisplayUi.mjs';
import { FmcTextfieldUi } from './FmcTextfieldUi.mjs';
import { FmcThumbsUi } from './FmcThumbsUi.mjs';
import { FmcUi } from './FmcUi.mjs';

// listeners

window.addEventListener('DOMContentLoaded', async () => {
  // instantiate classes

  const hideClass = 'cropper-hide';
  const thumbButtonClass = 'btn-thumb';
  const thumbClass = 'thumb';
  const thumbImgClass = 'thumb-img';
  const thumbsContainerId = 'thumbs';

  const fmcCroppersUiInstance = new FmcCroppersUi({
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

  FmcUi.debug = true;

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
      selector: '#preset-name-active',
      updateListener: 'updatePresetNameActive'
    }),
    copyLatLongButton: new FmcButtonUi({
      selector: '#image-copy-lat-long',
      updateListener: 'updateImageLatLong',
      clickHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathInButton: new FmcButtonUi({
      selector: '#image-copy-path-in',
      updateListener: 'updateImagePathIn',
      clickHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathOutButton: new FmcButtonUi({
      selector: '#image-copy-path-out',
      updateListener: 'updateImagePathOut',
      clickHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    copyPathWebEmbedButton: new FmcButtonUi({
      selector: '#image-copy-path-web-embed',
      updateListener: 'updateWebEmbedPath',
      clickHandler: [ FmcButtonUi, 'handleCopyPath' ]
    }),
    cropperLastImg: new FmcCropperImgUi({
      selector: '#croppers .img-container-last img',
      updateListener: 'updateLastCropperListener',
      readyHandler: [ fmcUi, 'handleLastCropperImgReady' ]
    }),
    croppersContainer: document.getElementById('croppers'),
    editWebpageButton: new FmcButtonUi({
      selector: '#preset-edit-webpage',
      clickHandler: [ fmcUi, 'handlePresetEditWebpage' ]
    }),
    exportAllButton: new FmcButtonUi({
      selector: '#crop-all',
      clickHandler: [ fmcUi, 'handleExportAll' ]
    }),
    exportSelectedButton: new FmcButtonUi({
      selector: '#crop-selected',
      clickHandler: [ fmcUi, 'handleExportSelected' ]
    }),
    fileWebpageButton: new FmcButtonUi({
      selector: '#preset-website-file-button',
      clickHandler: [ fmcUi, 'handlePresetFileWebpageBrowse' ]
    }),
    fileWebpageInput: new FmcTextfieldUi({
      selector: '#preset-website-file',
      updateListener: 'updatePresetFileWebpage'
    }),
    filter: new FmcTextfieldUi({
      selector: '#thumb-filename-filter',
      updateListener: 'updateFilter'
    }),
    filterClearButton: new FmcButtonUi({
      selector: '#thumb-filename-filter-clear',
      clickHandler: [ fmcUi, 'handleFilterClear' ]
    }),
    filterSubmitButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#thumb-filename-filter-submit',
      clickHandler: [ fmcUi, 'handleFilterSubmit' ]
    }),
    focalpointAutoSaveRadios: new FmcRadiosUi({
      selector: 'input[name="options-autosave-focalpoint"]',
      updateListener: 'updateFocalpointAutoSave',
      changeHandler: [ fmcUi, 'handleAutosaveRadiosChange' ]
    }),
    focalpointDeleteButton: new FmcButtonUi({
      selector: '#delete-focalpoint',
      clickHandler: [ fmcUi, 'handleFocalpointDelete' ]
    }),
    focalpointResetButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#reset-focalpoint',
      clickHandler: [ fmcUi, 'handleFocalpointReset' ]
    }),
    focalpointProportionsRadios: document.getElementsByName('focalpoint-proportions'),
    focalpointSaveButton: new FmcButtonUi({ // also referenced by fmcUi
      selector: '#save-focalpoint',
      clickHandler: [ fmcUi, 'handleFocalpointSave' ]
    }),
    focalpointWriteFilenameRadios: new FmcRadiosUi({
      selector: 'input[name="options-write-focalpoint-to-filename"]',
      updateListener: 'updateFocalpointWriteFilename',
      changeHandler: [ fmcUi, 'handleWriteFilenameRadiosChange' ]
    }),
    focalpointWriteTitleRadios: new FmcRadiosUi({
      selector: 'input[name="options-write-focalpoint-to-title"]',
      updateListener: 'updateFocalpointWriteTitle',
      changeHandler: [ fmcUi, 'handleWriteTitleRadiosChange' ]
    }),
    focalpointXInput: new FmcTextfieldUi({
      selector: '#focalpoint-x',
      updateListener: 'updateFocalpointX',
      changeHandler: [ fmcUi, 'handleFocalpointInputChange', 500 ]
    }),
    focalpointYInput: new FmcTextfieldUi({
      selector: '#focalpoint-y',
      updateListener: 'updateFocalpointY',
      changeHandler: [ fmcUi, 'handleFocalpointInputChange', 500 ]
    }),
    folderInButton: new FmcButtonUi({
      selector: '#preset-source-folder-button',
      clickHandler: [ fmcUi, 'handleFolderInBrowse' ]
    }),
    folderInInput: new FmcTextfieldUi({
      selector: '#preset-source-folder',
      updateListener: 'updateFolderIn'
    }),
    folderOutButton: new FmcButtonUi({
      selector: '#preset-target-folder-button',
      clickHandler: [ fmcUi, 'handleFolderOutBrowse' ]
    }),
    folderOutInput: new FmcTextfieldUi({
      selector: '#preset-target-folder',
      updateListener: 'updateFolderOut'
    }),
    folderOutInputDependent: document.querySelector('[data-dependent="preset-target-folder"]'),
    folderWebsiteButton: new FmcButtonUi({
      selector: '#preset-website-folder-button',
      clickHandler: [ fmcUi, 'handleFolderWebsiteBrowse' ]
    }),
    folderWebsiteInput: new FmcTextfieldUi({
      selector: '#preset-website-folder',
      updateListener: 'updateFolderWebsite'
    }),
    openPresetsButton: new FmcButtonUi({
      selector: '#user-preferences-file-button',
      clickHandler: [ fmcUi, 'handleEditPresets' ]
    }),
    openPresetsInput: new FmcTextfieldUi({
      selector: '#user-preferences-file',
      updateListener: 'updatePresetsFile'
    }),
    options: new FmcDialogUi({
      selector: '#options',
      appendedSelector: '#status-bar'
    }),
    pathInLink: new FmcButtonUi({
      selector: '#image-link-path-in',
      updateListener: 'updateImagePathIn',
      clickHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    pathOutLink: new FmcButtonUi({
      selector: '#image-link-path-out',
      updateListener: 'updateImagePathOut',
      clickHandler: [ FmcButtonUi, 'handleLinkToPath' ]
    }),
    presetNameInput: new FmcTextfieldUi({
      selector: '#preset-name',
      updateListener: 'updatePresetNameActive'
    }),
    presetNamesSelect: new FmcSelectUi({
      selector: '#preset-names',
      updateListener: 'updatePresets'
    }),
    presetLoadButton: new FmcButtonUi({
      selector: '#preset-load',
      clickHandler: [ fmcUi, 'handlePresetLoad' ]
    }),
    presets: new FmcDialogUi({
      selector: '#presets',
      appendedSelector: '#status-bar',
      openHandler: [ fmcUi, 'handlePresetsOpen' ]
    }),
    presetSaveButton: new FmcButtonUi({
      selector: '#preset-save',
      clickHandler: [ fmcUi, 'handlePresetSave' ]
    }),
    statusBar: new FmcStatusBarUi({
      selector: '#status-bar',
      updateListener: 'updateStatus'
    }),
    thumbsAutoSelectFilteredRadios: new FmcRadiosUi({
      selector: 'input[name="options-autoselect-first-filtered-result"]',
      updateListener: 'updateThumbsAutoSelectFiltered',
      changeHandler: [ fmcUi, 'handleAutoSelectFilteredRadiosChange' ]
    }),
    thumbFileName: new FmcTextDisplayUi({
      selector: '#thumb-filename'
    }),
    thumbsFilterUncroppedRadios: new FmcRadiosUi({
      selector: 'input[name="options-hide-uncropped-thumbnails"]',
      updateListener: 'updateThumbsFilterUncropped',
      changeHandler: [ fmcUi, 'handleThumbsFilterUncroppedRadiosChange' ]
    }),
    thumbsContainer: document.getElementById(thumbsContainerId),
    thumbsContainerOuter: document.getElementById('thumbs-container'),
    window: window
  };

  fmcCroppersUiInstance.elements = elements;
  fmcThumbsUiInstance.elements = elements;
  fmcUi.elements = elements;

  elements.croppersContainer.addEventListener('imageRenamed', await fmcUi.handleImageRenamed.bind(fmcUi));
  elements.focalpointProportionsRadios.forEach(el => el.addEventListener('change', fmcUi.handleFocalpointInputChange.bind(fmcUi)));
  elements.thumbsContainer.addEventListener('click', fmcUi.handleThumbClick.bind(fmcUi));
  elements.window.addEventListener('keydown', fmcUi.handleWindowKeydown.bind(fmcUi));
  elements.window.addEventListener('resize', fmcUi.handleWindowResize.bind(fmcUi));

  if (FmcUi.debug) {
    console.clear();
  }

  FmcUi.log('renderer.js -> fmcUi.loadOptions');
  await fmcUi.loadOptions();

  FmcUi.log('renderer.js -> fmcUi.selectActivePreset');
  await fmcUi.selectActivePreset();

  FmcUi.log('renderer.js -> fmcUi.handlePresetLoad');
  await fmcUi.handlePresetLoad();

  if ((typeof window.FmcFile === 'undefined') || (typeof window.FmcStore === 'undefined')) {
    await FmcUi.testData();
  }
});
