// Electron's render process (web page)

import { CrCroppersUi } from './classes/CrCroppersUi.mjs';
import { CrDebugUi } from './classes/CrDebugUi.mjs';
import { CrThumbsUi } from './classes/CrThumbsUi.mjs';
import { CrUtilsUi } from './classes/CrUtilsUi.mjs';

const appDebugDir = "/Volumes/DanHDD4TB1/Don't Believe The Hype/2022.12.31 - 2023.01.08 - Wellington to Acheron, St James, Rainbow, to Wellington/Day 04 - 2023.01.03 - Aratere Valley to Acheron Campsite";

// globals

// const rotateEl = document.getElementById('rotate');

// functions

// const reinstateCropCenterFromPercentages = () => {};

// const storeCropCenterAsPercentages = (cropBoxCenterX, cropBoxCenterY, imageWidth, imageHeight) => {};

/**
 * @function uiSelectFolder
 */
async function uiSelectFolder() {
  // npm run serve
  if (typeof window.electronAPI === 'undefined') {
    CrUtilsUi.emitEvent('root', 'selectedFolder', {
      folderPath: appDebugDir,
      imagesData: [
        {
          src: './data/Tour1/Day1/default.jpeg',
          dateTimeOriginal: '2023:01:03 04:35:26'
        },
        {
          src: './data/Tour1/Day1/portrait.jpeg',
          dateTimeOriginal: '2023:01:03 05:35:26'
        },
        {
          src: './data/Tour1/Day1/square.jpg',
          dateTimeOriginal: '2023:01:03 06:35:26'
        },
        {
          src: './data/Tour1/Day1/screenshot.PNG',
          dateTimeOriginal: '2023:01:03 07:35:26'
        },
        {
          src: './data/Tour1/Day1/landscape.jpeg',
          dateTimeOriginal: '2023:01:03 08:35:26'
        },
        {
          src: './data/Tour1/Day1/panorama.jpeg',
          dateTimeOriginal: '2023:01:03 09:35:26'
        }
      ]
    });

    return;
  }

  const { folderPath, imagesData } = await window.electronAPI.selectFolder({
    appDebugDir
  });

  // if folder select was cancelled
  if ((typeof folderPath === 'undefined') || (typeof imagesData === 'undefined')) {
    return;
  }

  CrUtilsUi.emitEvent('root', 'selectedFolder', {
    folderPath,
    imagesData
  });
}

// listeners

window.addEventListener('DOMContentLoaded', () => {
  // instantiate classes

  const crCroppersUiInstance = new CrCroppersUi({
    Cropper: window.Cropper,
    cropperCanvasClass: 'cropper-canvas',
    cropperImageClass: 'cropperImage',
    croppersId: 'croppers',
    croppersOptions: {
      autoCrop: true, // Enable to crop the image automatically when initialized
      autoCropArea: 1, // Define the automatic cropping area size - as 100% of the image
      background: true, // Show the grid background of the container
      center: true, // Show the center indicator above the crop box
      checkCrossOrigin: true, // Check if the current image is a cross-origin image
      checkOrientation: true, // Check the current image's Exif Orientation information
      cropBoxMovable: false, // Enable to move the crop box by dragging
      cropBoxResizable: false, // Enable to resize the crop box by dragging
      dragMode: 'none', // create a new crop box | move the canvas | do nothing
      guides: true, // Show the dashed lines above the crop box
      highlight: true, // Show the white modal above the crop box (highlight the crop box)
      modal: true, // Show the black modal above the image and under the crop box
      movable: false, // Enable to move the image
      preview: '', // Add extra elements (containers) for preview
      responsive: true, // Re-render the cropper when resizing the window
      restore: true, // Restore the cropped area after resizing the window
      rotatable: true, // TODO: rotate should affect entire image, not just the crop, so requires an additional pre-crop
      scalable: false, // Enable to scale the image
      toggleDragModeOnDblclick: false, // Enable to toggle drag mode between "crop" and "move" when clicking twice on the cropper
      viewMode: 1, // restrict the crop box not to exceed the size of the canvas
      zoomable: false, // Enable to zoom the image
      zoomOnTouch: false, // Enable to zoom the image by dragging touch
      zoomOnWheel: false // Enable to zoom the image by mouse wheeling
    },
    controlIds: {
      deleteCropCoordinates: 'delete-crop-coordinates'
    },
    initDelay: 5000
  });

  const crDebugUiInstance = new CrDebugUi({
    debugBarId: 'debug-bar',
    debugFieldClass: 'debug-param'
  });

  const crThumbsUiInstance = new CrThumbsUi({
    selectedClass: 'btn-selected',
    thumbButtonClass: 'btn-thumb',
    thumbClass: 'thumb',
    thumbImgClass: 'thumb-img',
    thumbMetaClass: 'thumb-meta',
    thumbsCountId: 'thumb-count-num',
    thumbsFolderId: 'thumb-folder',
    thumbsId: 'thumbs'
  });

  // listen for native and custom events

  document.body.addEventListener('keydown', (event) => {
    if (!document.querySelectorAll('#thumbs img').length) {
      return;
    }

    const { keyCode } = event;

    if (keyCode === 37) {
      event.preventDefault(); // don't operate the native container scrollbar
      crThumbsUiInstance.scrollToThumb('previous');
    } else if (keyCode === 39) {
      event.preventDefault();
      crThumbsUiInstance.scrollToThumb('next');
    }
  });

  document.getElementById('croppers').addEventListener('click', (event) => {
    const { masterCropper } = crCroppersUiInstance;

    crDebugUiInstance.debugClickLocation(event, masterCropper);
  });

  document.getElementById('croppers').addEventListener('createdMasterCropper', () => {
    crDebugUiInstance.clearDebugFields();
    crDebugUiInstance.injectDebugFields();
  });

  document.getElementById('croppers').addEventListener('imageRenamed', (event) => {
    const { newFileName } = event.detail;

    crThumbsUiInstance.changeSelectedImageSrc(newFileName);
  });

  document.getElementById('debug-bar').addEventListener('injectedDebugFields', (event) => {
    const { cropperDebugFieldIds } = event.detail;

    crCroppersUiInstance.getMasterCropper().outputIds = cropperDebugFieldIds;
  });

  document.getElementById('delete-crop-coordinates').addEventListener('click', (event) => {
    crCroppersUiInstance.removeCropCoordinatesFromImage(event);
  });

  document.getElementById('read-crop-coordinates').addEventListener('click', () => {
    const position = crCroppersUiInstance.getCropCoordinatesFromImage();

    crCroppersUiInstance.setFocalPoint(position);
  });

  document.getElementById('reset-focal-point').addEventListener('click', (event) => {
    crCroppersUiInstance.resetFocalPoint(event);
  });

  document.getElementById('root').addEventListener('selectedFolder', (event) => {
    const { folderPath, imagesData } = event.detail;

    crThumbsUiInstance.generateThumbsHtml(folderPath, imagesData);
  });

  document.getElementById('save-crop-coordinates').addEventListener('click', (event) => {
    crCroppersUiInstance.saveCropCoordinatesEl(event);
  });

  document.getElementById('thumbs').addEventListener('click', (event) => {
    const target = crThumbsUiInstance.getClickedButton(event);

    crThumbsUiInstance.applySelectedClass(target);
    crThumbsUiInstance.scrollToThumb('selected');

    // calls crCroppersUiInstance.init
    crCroppersUiInstance.changeSourceImage(target);
  });

  window.addEventListener('resize', () => {
    crThumbsUiInstance.scrollToThumb('selected');
  });

  uiSelectFolder();
});