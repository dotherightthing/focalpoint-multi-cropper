export class FmcCroppersUi {
    /**
     * @function getImageTitle
     * @summary Get the image Title from its EXIF data
     * @param {string} imagePath - Image path
     * @returns {Promise<object>} { Title }
     * @memberof FmcCroppersUi
     * @static
     */
    static getImageTitle(imagePath: string): Promise<object>;
    /**
     * @class FmcCroppersUi
     * @summary Manages croppers component, containing instances of cropperjs
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set cropperImageElements(cropperImageElements: HTMLElement[]);
    /**
     * cropperImageElements
     * @summary 4x src-less image placeholders which are replaced by 4x croppers
     * @type {HTMLElement[]}
     * @memberof FmcCroppersUi
     */
    get cropperImageElements(): HTMLElement[];
    set croppers(croppers: any[]);
    /**
     * croppers
     * @summary Multiple visible instances of Cropper, including one master and several with unique proportions
     * @type {Array}
     * @memberof FmcCroppersUi
     */
    get croppers(): any[];
    set resizers(resizers: any[]);
    /**
     * resizers
     * @summary Multiple hidden instances of resizer, which resizes images without cropping
     * @type {Array}
     * @memberof FmcCroppersUi
     */
    get resizers(): any[];
    set masterCropperCropBoxWasDragged(masterCropperCropBoxWasDragged: boolean);
    /**
     * masterCropperCropBoxWasDragged
     * @summary Tracks whether the cropbox was dragged
     * @type {boolean}
     * @memberof FmcCroppersUi
     */
    get masterCropperCropBoxWasDragged(): boolean;
    set Cropper(Cropper: Cropper);
    /**
     * Cropper
     * @summary The Cropper constructor creates a new Cropper instance
     * @type {Cropper}
     * @memberof FmcCroppersUi
     */
    get Cropper(): Cropper;
    _Cropper: any;
    _cropperImageElements: any;
    _croppers: any;
    set croppersOptions(croppersOptions: object);
    /**
     * croppersOptions
     * @summary Options supplied to the Cropper constructor when creating a new Cropper instance
     * @type {object}
     * @memberof FmcCroppersUi
     */
    get croppersOptions(): object;
    _croppersOptions: any;
    set elements(elements: object);
    /**
     * elements
     * @summary DOM elements shared between fmcCroppersUiInstance, fmcThumbsUiInstance, fmcUi
     * @type {object}
     * @memberof FmcCroppersUi
     */
    get elements(): object;
    _elements: any;
    set imageSrc(imageSrc: string);
    /**
     * imageSrc
     * @summary Stores the value of the current cropper image source, via this.changeSourceImage
     * @type {string}
     * @memberof FmcCroppersUi
     */
    get imageSrc(): string;
    _imageSrc: any;
    set masterCropper(masterCropper: object);
    /**
     * masterCropper
     * @summary The object containing the master cropper instance
     * @type {object}
     * @memberof FmcCroppersUi
     */
    get masterCropper(): object;
    _masterCropper: any;
    _masterCropperCropBoxWasDragged: any;
    _resizers: any;
    set selectors(selectors: object);
    /**
     * selectors
     * @summary DOM selectors
     * @type {object}
     * @memberof FmcCroppersUi
     */
    get selectors(): object;
    _selectors: any;
    set slaveCroppers(slaveCroppers: any[]);
    /**
     * slaveCroppers
     * @summary An array of objects, each containing a slave (non-master) instance of Cropper
     * @type {Array}
     * @memberof FmcCroppersUi
     */
    get slaveCroppers(): any[];
    _slaveCroppers: any;
    set updateDelay(updateDelay: number);
    /**
     * updateDelay
     * @summary Number of milliseconds to wait after dragging the focalpoint, before applying rounding
     * @type {number}
     * @memberof FmcCroppersUi
     */
    get updateDelay(): number;
    _updateDelay: any;
    /**
     * @function calcCanvasOffsets
     * @summary cropper.getCanvasData().top ignores preceding UI and returns 0, this function returns the actual offset
     * @returns {object} { top, left }
     * @memberof FmcCroppersUi
     * @see {@link cypress/e2e/electron-spec.cy.js}
     */
    calcCanvasOffsets(): object;
    /**
     * @function calcCropBoxXYFromPageXY
     * @summary Calculate the XY position of the cropbox from the XY click or cropend position
     * @param {object} args - Arguments
     * @param {number} args.pageX - Page X
     * @param {number} args.pageY - Page Y
     * @returns {object} { cropBoxX, cropBoxY }
     * @memberof FmcCroppersUi
     */
    calcCropBoxXYFromPageXY({ pageX, pageY }: {
        pageX: number;
        pageY: number;
    }): object;
    /**
     * @function calcImageXYFromImagePercentXY
     * @summary Calculate the XY position of the image click from the percentage position of the image click
     * @param {object} args - Arguments
     * @param {number} args.imagePercentX - Image percentage X
     * @param {number} args.imagePercentY - Image percentage Y
     * @returns {object} { imageX, imageY }
     * @memberof FmcCroppersUi
     * @see {@link cypress/e2e/electron-spec.cy.js}
     */
    calcImageXYFromImagePercentXY({ imagePercentX, imagePercentY }: {
        imagePercentX: number;
        imagePercentY: number;
    }): object;
    /**
     * @function calcImageXYFromPageXY
     * @summary Calculate the XY position of the image click from the position of the page click
     * @param {object} args - Arguments
     * @param {number} args.pageX - Page X
     * @param {number} args.pageY - Page Y
     * @returns {object} { imageX, imageY }
     * @memberof FmcCroppersUi
     */
    calcImageXYFromPageXY({ pageX, pageY }: {
        pageX: number;
        pageY: number;
    }): object;
    /**
     * @function calcPageXYForRoundedImagePercentXY
     * @summary Change x and y so they correspond with a rounded percentage
     * @param {object} args - Method arguments
     * @param {number} args.pageXRaw - Page X raw (unrounded)
     * @param {number} args.pageYRaw - Page Y raw (unrounded)
     * @returns {object} { pageX, pageY }
     * @memberof FmcCroppersUi
     */
    calcPageXYForRoundedImagePercentXY({ pageXRaw, pageYRaw }: {
        pageXRaw: number;
        pageYRaw: number;
    }): object;
    /**
     * @function calcPageXYFromImageXY
     * @summary Calculate the XY location of the page click from the location of the click relative to the cropper image
     * @param {object} args - Arguments
     * @param {number} args.imageX - Image X
     * @param {number} args.imageY - Image Y
     * @returns {object} { pageX, pageY }
     * @memberof FmcCroppersUi
     * @see {@link cypress/e2e/electron-spec.cy.js}
     */
    calcPageXYFromImageXY({ imageX, imageY }: {
        imageX: number;
        imageY: number;
    }): object;
    /**
     * @function calcImagePercentXYFromImageXorY
     * @summary Get the X or Y coordinate as a percentage of the image dimension, so that it can be stored and recalled later.
     * @param {object} args - Arguments
     * @param {number} args.imageXorY - Image X or Image Y
     * @param {number} args.dimensionLength - Dimension length (width or height)
     * @param {boolean} args.round - Round the result to the nearest whole number
     * @returns {number} percentage
     * @memberof FmcCroppersUi
     * @see {@link cypress/e2e/electron-spec.cy.js}
     */
    calcImagePercentXYFromImageXorY({ imageXorY, dimensionLength, round }: {
        imageXorY: number;
        dimensionLength: number;
        round: boolean;
    }): number;
    /**
     * @function calcImagePercentXYFromPageXY
     * @summary Calculate the XY location of the page click as it relates to the scaled image
     * @param {object} args - Arguments
     * @param {number} args.pageX - Page X
     * @param {number} args.pageY - Page Y
     * @param {boolean} args.round - Round the result to the nearest whole number
     * @returns {object} { imagePercentX, imagePercentY }
     * @memberof FmcCroppersUi
     * @see {@link cypress/e2e/electron-spec.cy.js}
     */
    calcImagePercentXYFromPageXY({ pageX, pageY, round }: {
        pageX: number;
        pageY: number;
        round: boolean;
    }): object;
    /**
     * @function changeSourceImage
     * @summary Change the cropper image (when a thumbnail is clicked on)
     * @param {string} newImageSrc - New image src
     * @memberof FmcCroppersUi
     */
    changeSourceImage(newImageSrc: string): void;
    /**
     * @function destroy
     * @summary Destroy instances of cropperjs
     * @memberof FmcCroppersUi
     */
    destroy(): void;
    /**
     * @function displayImagePercentXY
     * @summary Move cropbox to focalpoint
     * @param {object} args - Arguments
     * @param {number} args.imagePercentY - Image percentage top
     * @param {number} args.imagePercentX - Image percentage X
     * @memberof FmcCroppersUi
     */
    displayImagePercentXY({ imagePercentY, imagePercentX }: {
        imagePercentY: number;
        imagePercentX: number;
    }): void;
    /**
     * @function getCropperOptions
     * @summary Build an options object to pass to the cropperjs Cropper constructor
     * @param {number|null} exportWidth - Export width
     * @param {number|null} exportHeight - Export height
     * @param {string} role - master | slave
     * @param {string} action - resizeAndCrop (with preview) | resize
     * @returns {object} options
     * @memberof FmcCroppersUi
     */
    getCropperOptions(exportWidth: number | null, exportHeight: number | null, role: string, action: string): object;
    /**
     * @function setFocalpointSaveState
     * @summary Determine whether the current focalpoint settings have been saved to the current image
     * @param {object} args - Arguments
     * @param {boolean} args.focalpointReset - Focalpoint was reset to previously stored values
     * @param {string} args.thumbIndexPrevious - The index of the previously selected thumbnail
     * @param {string} args.thumbIndex - The index of the currently selected thumbnail
     * @param {string} args.imagePercentXUi - Image Percent X as shown in the UI controls
     * @param {string} args.imagePercentYUi - Image Percent Y as shown in the UI controls
     * @param {string} args.imageProportionsUi - Image Proportions setting as shown in the UI controls
     * @returns {Promise<string>} state
     * @memberof FmcCroppersUi
     */
    setFocalpointSaveState({ focalpointReset, thumbIndexPrevious, thumbIndex, imagePercentXUi, imagePercentYUi, imageProportionsUi }: {
        focalpointReset: boolean;
        thumbIndexPrevious: string;
        thumbIndex: string;
        imagePercentXUi: string;
        imagePercentYUi: string;
        imageProportionsUi: string;
    }): Promise<string>;
    /**
     * @function getImagePercentXYFromSrc
     * @summary Get the values stored in the filename
     * @param {object} args - Arguments
     * @param {string} args.src - Image src
     * @param {string} args.title - Image title
     * @returns {object} imagePercentXY
     * @memberof FmcCroppersUi
     */
    getImagePercentXYFromSrc({ src, title }: {
        src: string;
        title: string;
    }): object;
    /**
     * @function getFlagsFromSrc
     * @summary Get any flags stored in the filename
     * @param {object} args - Arguments
     * @param {string} args.src - Image src
     * @param {string} args.title - Image title
     * @returns {object} imageFlags
     * @memberof FmcCroppersUi
     */
    getFlagsFromSrc({ src, title }: {
        src: string;
        title: string;
    }): object;
    /**
     * @function getResizedImageCenterXY
     * @summary Get the center point of the resized image
     * @param {string} fileName - Image file name and path
     * @param {number} resizeW - Resize width
     * @param {number} resizeH - Resize height
     * @returns {Promise<object>} { centerX, centerY }
     * @memberof FmcCroppersUi
     */
    getResizedImageCenterXY(fileName: string, resizeW: number, resizeH: number): Promise<object>;
    /**
     * @function init
     * @summary Initialise cropper instances (master and slaves)
     * @memberof FmcCroppersUi
     */
    init(): void;
    /**
     * @function initCropper
     * @summary Initialise cropper instance
     * @param {HTMLElement} cropperImage - Cropper image
     * @returns { object } cropper - Object containing cropperInstance
     * @memberof FmcCroppersUi
     */
    initCropper(cropperImage: HTMLElement): object;
    /**
     * @function initResizer
     * @summary Initialise resizer instance
     * @param {HTMLElement} resizerImage - Resizer image
     * @returns { object } resizer
     * @memberof FmcCroppersUi
     */
    initResizer(resizerImage: HTMLElement): object;
    /**
     * @function injectHeading
     * @summary Inject a heading element above a cropper image
     * @param {HTMLElement} cropperImage - Cropper image
     * @param {string} label - Cropper label
     * @param {number|null} exportWidth - Export width
     * @param {number|null} exportHeight - Export height
     * @returns {HTMLElement} heading element
     * @memberof FmcCroppersUi
     */
    injectHeading(cropperImage: HTMLElement, label: string, exportWidth: number | null, exportHeight: number | null): HTMLElement;
    /**
     * @function moveCropperCropBoxToPageXY
     * @summary Move the cropbox to the location where the page was clicked
     * @param {object} args - Method arguments
     * @param {number} args.pageX - Page X
     * @param {number} args.pageY - Page Y
     * @memberof FmcCroppersUi
     */
    moveCropperCropBoxToPageXY({ pageX, pageY }: {
        pageX: number;
        pageY: number;
    }): void;
    /**
     * @function moveMasterCropperCropBoxToPageXY
     * @summary When the canvas is clicked, move the crop box on the master cropper so it centers on the pointer location
     * @param {object} args - Arguments
     * @param {number} args.pageX - Page X (corresponding to a rounded percent)
     * @param {number} args.pageY - Page Y (corresponding to a rounded percent)
     * @memberof FmcCroppersUi
     */
    moveMasterCropperCropBoxToPageXY({ pageX, pageY }: {
        pageX: number;
        pageY: number;
    }): void;
    /**
     * @function moveSlaveCropperCropBoxToPageXY
     * @summary Move the crop box on the dependent cropper
     * @param {object} args - Arguments
     * @param {object} args.cropper - Slave cropper
     * @param {number} args.masterCropperCanvasLeft - gap between edge of viewport and start of master image
     * @param {number} args.masterCropperCanvasOffsetTop - Height of preceding UI
     * @param {number} args.pageX - Page X
     * @param {number} args.pageY - Page Y
     * @memberof FmcCroppersUi
     */
    moveSlaveCropperCropBoxToPageXY({ cropper, masterCropperCanvasLeft, masterCropperCanvasOffsetTop, pageX, pageY }: {
        cropper: object;
        masterCropperCanvasLeft: number;
        masterCropperCanvasOffsetTop: number;
        pageX: number;
        pageY: number;
    }): void;
    /**
     * @function resizeAndCropImage
     * @summary Resize and crop an image
     * @param {string} targetFolder - Target folder
     * @returns {Promise<string>} baseExportPath
     * @memberof FmcCroppersUi
     */
    resizeAndCropImage(targetFolder: string): Promise<string>;
    /**
     * @function deleteImagePercentXYFromImage
     * @summary Remove the focalpoint from the image filename or title
     * @returns {Promise<string>} msg
     * @memberof FmcCroppersUi
     */
    deleteImagePercentXYFromImage(): Promise<string>;
    /**
     * @function isDefaultFocalpoint
     * @summary Determine whether the supplied focalpoint settings are the defaults
     * @param {object} args - Arguments
     * @param {string|number} args.imagePercentX - Image percent X
     * @param {string|number} args.imagePercentY - Image percent Y
     * @param {string} args.imageProportions - Image proportions
     * @returns {boolean} isDefaultFocalpoint
     * @memberof FmcCroppersUi
     */
    isDefaultFocalpoint({ imagePercentX, imagePercentY, imageProportions }: {
        imagePercentX: string | number;
        imagePercentY: string | number;
        imageProportions: string;
    }): boolean;
    /**
     * @function reinstateImagePercentXYFromImage
     * @summary Update the XY fields from the focalpoint saved in the image filename or title
     * @memberof FmcCroppersUi
     */
    reinstateImagePercentXYFromImage(): Promise<void>;
    /**
     * @function scaleSlaveVal
     * @summary Slave croppers are smaller than the Master cropper. Scale down values derived from calculations on the Master cropper.
     * @param {object} slaveCropper - Slave cropper instance
     * @param {number} val - Value to scale
     * @returns {number} Scaled value
     * @memberof FmcCroppersUi
     */
    scaleSlaveVal(slaveCropper: object, val: number): number;
    /**
     * @function setLoadingState
     * @summary Set the focalpoint cropbox to loading, which hides it via the CSS stylesheet
     * @param {boolean} loading - Loading
     * @memberof FmcCroppersUi
     */
    setLoadingState(loading: boolean): void;
    /**
     * @function setSaveState
     * @summary Set the focalpoint saved state to default|dirty|saved
     * @param {string} state - State (default|dirty|saved)
     * @memberof FmcCroppersUi
     */
    setSaveState(state: string): void;
    /**
     * @function validateCroppersImage
     * @summary Check that the croppers' image src is valid
     * @returns {boolean} valid
     * @memberof FmcCroppersUi
     */
    validateCroppersImage(): boolean;
    /**
     * @function formatDateTimeOriginalForPhotosApp
     * @summary Reformat the value of the EXIF DateTimeOriginal tag to a string suitable for searching in Photos.app
     * @param {object} DateTimeOriginal - DateTimeOriginal
     * @param {string} dateTimeOriginalAsDate - dateTimeOriginalAsDate
     * @returns {object} { date }
     * @memberof FmcCroppersUi
     */
    formatDateTimeOriginalForPhotosApp(DateTimeOriginal: object, dateTimeOriginalAsDate: string): object;
    /**
     * @function writeImagePercentXYToImage
     * @summary Save the values to the image filename
     * @param {object} args - Arguments
     * @param {string} args.imageFlags - Image flags (comma separated)
     * @param {string} args.imagePercentX - Image percentage X
     * @param {string} args.imagePercentY - Image percentage Y
     * @returns {Promise<object>} { msg, type }
     * @memberof FmcCroppersUi
     */
    writeImagePercentXYToImage({ imageFlags, imagePercentX, imagePercentY }: {
        imageFlags: string;
        imagePercentX: string;
        imagePercentY: string;
    }): Promise<object>;
}
//# sourceMappingURL=FmcCroppersUi.d.mts.map