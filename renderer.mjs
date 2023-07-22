// Electron's render process (web page)

import { FmcUi } from './classes/FmcUi.mjs';
import { FmcCroppersUi } from './classes/FmcCroppersUi.mjs';
import { FmcThumbsUi } from './classes/FmcThumbsUi.mjs';

// listeners

window.addEventListener('DOMContentLoaded', async () => {
  // instantiate classes

  const controlHintClass = 'control-hint';
  const thumbClass = 'thumb';
  const thumbImgClass = 'thumb-img';

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
    initDelay: 5000,
    updateDelay: (typeof Cypress !== 'undefined') ? 0 : 1000
  });

  const fmcThumbsUiInstance = new FmcThumbsUi({
    selectedClass: 'btn-selected',
    thumbButtonClass: 'btn-thumb',
    thumbClass,
    thumbImgClass,
    thumbImgWrapperClass: 'thumb-img-wrapper',
    thumbMetaClass: 'thumb-meta',
    thumbsCountId: 'thumb-count',
    thumbsId: 'thumbs'
  });

  const fmcUi = new FmcUi({
    fmcCroppersUiInstance,
    fmcThumbsUiInstance,
    elements: {
      console: document.getElementById('console'),
      copyPaths: document.querySelectorAll('.control-copy'),
      copyPathInButton: document.getElementById('copy-path-in'),
      copyPathOutButton: document.getElementById('copy-path-out'),
      copyPathWebEmbedButton: document.getElementById('copy-path-web-embed'),
      croppersContainer: document.getElementById('croppers'),
      editWebpageButton: document.getElementById('edit-webpage'),
      exportCropsAndSizesButton: document.getElementById('crop-image'),
      focalpointAutoSaveInput: document.getElementsByName('focalpoint-autosave'),
      focalpointDeleteButton: document.getElementById('delete-focalpoint'),
      focalpointInput: document.querySelectorAll('#focalpoint-x, #focalpoint-y'),
      focalpointResetButton: document.getElementById('reset-focalpoint'),
      focalpointXInput: document.getElementById('focalpoint-x'),
      focalpointYInput: document.getElementById('focalpoint-y'),
      folderInButton: document.getElementById('folder-in'),
      folderOutButton: document.getElementById('folder-out'),
      folderOutButtonDependent: document.querySelector('[data-dependent="folder-out"]'),
      fileWebpageButton: document.getElementById('file-webpage'),
      folderWebsiteButton: document.getElementById('folder-website'),
      lastCropperImg: document.querySelector('#croppers .img-container-last img'),
      pathLinks: document.querySelectorAll('.control-link'),
      pathInLink: document.getElementById('link-path-in'),
      pathOutLink: document.getElementById('link-path-out'),
      thumbsContainer: document.getElementById('thumbs'),
      thumbFileName: document.getElementById('thumb-filename'),
      window: window
    },
    selectors: {
      controlHintClass,
      thumbClass,
      thumbImgClass
    }
  });

  // function calls

  fmcUi.addEventListeners();

  await fmcUi.restoreSettings();

  if (typeof window.electronAPI === 'undefined') {
    FmcUi.testData();
  }
});
