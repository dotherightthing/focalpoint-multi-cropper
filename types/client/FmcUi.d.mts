export class FmcUi {
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
    static debounce(func: Function, wait: number, immediate?: boolean): Function;
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
    static emitEvent(elementId: string, eventName: string, eventDetail?: object): void;
    /**
     * @function emitElementEvent
     * @summary Emit a custom event
     * @param {Window|HTMLElement} element - element that will dispatch the event
     * @param {string} eventName - Event names are case-sensitive
     * @param {object} eventDetail - name-value pair
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent}
     * @see {@link https://gomakethings.com/callbacks-vs.-custom-events-in-vanilla-js/}
     * @memberof FmcUi
     * @static
     */
    static emitElementEvent(element: Window | HTMLElement, eventName: string, eventDetail?: object): void;
    /**
     * @function getElementIndex
     * @summary Get the index of the selected node in a nodelist
     * @param {HTMLElement} element = Element
     * @param {NodeList} nodeList = NodeList
     * @returns {number} selectedIndex || -1
     * @memberof FmcUi
     * @static
     */
    static getElementIndex(element: HTMLElement, nodeList: NodeList): number;
    /**
     * @function getFileNameFromPath
     * @summary Isolate the file name from the file path
     * @param {string} path - File path
     * @returns {string} fileName
     * @memberof FmcUi
     * @static
     */
    static getFileNameFromPath(path: string): string;
    /**
     * @function getOffset
     * @summary Get the space between an element and the viewport (this matches the inline CSS translate implemented by cropperjs)
     * @param {HTMLElement} el - Element
     * @returns {object} offset - { top, left }
     * @see {@link https://usefulangle.com/post/179/jquery-offset-vanilla-javascript}
     * @memberof FmcUi
     * @static
     */
    static getOffset(el: HTMLElement): object;
    /**
     * @function getTargetElementOfType
     * @summary Ensures that the target element matches the expected element type
     * @param {object} event - Event
     * @param {string} elementType - Element type (tagName)
     * @returns {HTMLElement} targetElement
     * @memberof FmcUi
     * @static
     */
    static getTargetElementOfType(event: object, elementType: string): HTMLElement;
    /**
     * @function log
     * @summary Log debugging messages
     * @param {...any} args - Function arguments
     * @memberof FmcUi
     * @static
     */
    static log(...args: any[]): void;
    /**
     * @class FmcUi
     * @summary Manages rendering and manipulation of the UI
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set debounceDelay(debounceDelay: number);
    /**
     * debounceDelay
     * @summary Number of milliseconds to wait before actioning a repeated function call
     * @type {number}
     * @memberof FmcUi
     */
    get debounceDelay(): number;
    _debounceDelay: any;
    set debug(debug: boolean);
    /**
     * debug
     * @summary Toggles debugging on and off via FmcUi.log
     * @type {boolean}
     * @memberof FmcUi
     */
    get debug(): boolean;
    _debug: any;
    set elements(elements: object);
    /**
     * elements
     * @summary DOM elements shared between fmcCroppersUiInstance, fmcThumbsUiInstance, fmcUi
     * @type {object}
     * @memberof FmcUi
     */
    get elements(): object;
    _elements: any;
    set exportDelay(exportDelay: number);
    /**
     * exportDelay
     * @summary Time to wait between each export when exporting multiple images.
     * @type {number}
     * @memberof FmcUi
     */
    get exportDelay(): number;
    _exportDelay: any;
    set fmcCroppersUiInstance(fmcCroppersUiInstance: object);
    /**
     * fmcCroppersUiInstance
     * @summary An instance of FmcCroppersUi
     * @type {object}
     * @memberof FmcUi
     */
    get fmcCroppersUiInstance(): object;
    _fmcCroppersUiInstance: any;
    set fmcThumbsUiInstance(fmcThumbsUiInstance: object);
    /**
     * fmcThumbsUiInstance
     * @summary An instance of FmcThumbsUi
     * @type {object}
     * @memberof FmcUi
     */
    get fmcThumbsUiInstance(): object;
    _fmcThumbsUiInstance: any;
    set selectors(selectors: object);
    /**
     * selectors
     * @summary DOM selectors
     * @type {object}
     * @memberof FmcUi
     */
    get selectors(): object;
    _selectors: any;
    /**
     * @function autosaveFocalpoint
     * @summary Save the current focalpoint if "Auto-Save" is enabled
     * @param {boolean} on - Auto-Save is on (true) or off (false)
     * @memberof FmcUi
     */
    autosaveFocalpoint(on: boolean): Promise<void>;
    /**
     * @function getPathOut
     * @summary Set the target path in the footer
     * @param {string} imgSrc = Cropper image src
     * @returns {string} pathOut
     * @memberof FmcUi
     */
    getPathOut(imgSrc: string): string;
    /**
     * @function getPathWebEmbed
     * @summary Set the web embed path in the footer
     * @param {string} pathOut - Path out
     * @returns {Promise<string>} pathWebEmbed
     * @memberof FmcUi
     */
    getPathWebEmbed(pathOut: string): Promise<string>;
    /**
     * @function handleAutosaveRadiosChange
     * @summary Actions to run after the "Auto-Save" option is enabled or disabled
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleAutosaveRadiosChange(event: object): Promise<void>;
    /**
     * @function handleAutoSelectFilteredRadiosChange
     * @summary Actions to run after the "Auto-Select First Filter Result" option is enabled or disabled
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleAutoSelectFilteredRadiosChange(event: object): Promise<void>;
    /**
     * @function handleEditPresets
     * @summary Open user-preferences.json in VSCode
     * @memberof FmcUi
     */
    handleEditPresets(): Promise<void>;
    /**
     * @function handleExportAll
     * @summary Cycle through all thumbs and export those with focalpoints
     * @memberof FmcUi
     */
    handleExportAll(): Promise<void>;
    /**
     * @function handleExportSelected
     * @summary Export the image associated with the thumb selected in the UI, then update button paths and focus the "Copy base embed path" button
     * @returns {Promise<string>} baseExportPath
     * @memberof FmcUi
     */
    handleExportSelected(): Promise<string>;
    /**
     * @function handleFilterClear
     * @summary Actions to run after the "Thumbnail filter" "Clear" button is clicked
     * @memberof FmcUi
     */
    handleFilterClear(): Promise<void>;
    /**
     * @function handleFilterSubmit
     * @summary Actions to run after the "Thumbnail filter" "Go" button is clicked
     * @memberof FmcUi
     */
    handleFilterSubmit(): Promise<void>;
    /**
     * @function handleFocalpointDelete
     * @summary Delete focalpoint information from an image
     * @memberof FmcUi
     */
    handleFocalpointDelete(): Promise<void>;
    /**
     * @function handleFocalpointInputChange
     * @summary When the focalpoint XY fields are changed, move the cropbox and save the new focalpoint to the image filename or title
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleFocalpointInputChange(event: object): Promise<void>;
    /**
     * @function handleFocalpointReset
     * @summary Reset the values in the X and Y fields, to the values stored in the image filename or title
     * @param {object} event - Click event
     * @memberof FmcUi
     */
    handleFocalpointReset(event: object): Promise<void>;
    /**
     * @function handleFocalpointSave
     * @summary Save the focalpoint to the image filename or title
     * @memberof FmcUi
     */
    handleFocalpointSave(): Promise<void>;
    /**
     * @function handleFolderInBrowse
     * @summary Actions to run after the "Source folder" "Browse" button is clicked - and when handlePresetLoad is called
     * @param {object|null} event - Click event
     * @param {boolean} restore - Restore settings from store
     * @memberof FmcUi
     */
    handleFolderInBrowse(event: object | null, restore?: boolean): Promise<void>;
    /**
     * @function handleFolderOutBrowse
     * @summary Actions to run after the "Target folder" "Browse" button is clicked - and when handlePresetLoad is called
     * @param {object|null} event - Click event
     * @param {boolean} restore - Restore settings from store
     * @memberof FmcUi
     */
    handleFolderOutBrowse(event: object | null, restore?: boolean): Promise<void>;
    /**
     * @function handleFolderWebsiteBrowse
     * @summary Actions to run after the "Website folder" "Browse" button is clicked - and when handlePresetLoad is called
     * @param {object|null} event - Click event
     * @param {boolean} restore - Restore settings from store
     * @memberof FmcUi
     */
    handleFolderWebsiteBrowse(event: object | null, restore?: boolean): Promise<void>;
    /**
     * @function handleImageRenamed
     * @summary Actions to run after the cropper source is changed - due to a focalpoint being written to or deleted from the filename
     * @param {object} event - imageRenamed event
     * @memberof FmcUi
     */
    handleImageRenamed(event: object): Promise<void>;
    /**
     * @function handleLastCropperImgReady
     * @summary Actions to run after cropperjs fires a "ready" event for the last cropper image - each time an image is loaded into the cropper
     * @memberof FmcUi
     */
    handleLastCropperImgReady(): Promise<void>;
    /**
     * @function handlePresetEditWebpage
     * @summary Open the preset webpage file in VSCode
     * @memberof FmcUi
     */
    handlePresetEditWebpage(): Promise<void>;
    /**
     * @function handlePresetFileWebpageBrowse
     * @summary Actions to run after the "Webpage file" "Browse" button is clicked - and when handlePresetLoad is called
     * @param {object|null} event - Click event
     * @param {boolean} restore - Restore settings from store
     * @memberof FmcUi
     */
    handlePresetFileWebpageBrowse(event: object | null, restore?: boolean): Promise<void>;
    /**
     * @function handlePresetLoad
     * @summary Actions to run after the preset "Load" button is clicked
     * @param {object} event - click event
     * @summary Runs on init and when the Presets 'Load' button is pressed
     * @memberof FmcUi
     */
    handlePresetLoad(event?: object): Promise<void>;
    /**
     * @function handlePresetsOpen
     * @summary Actions to run after the presets modal is opened
     * @memberof FmcUi
     */
    handlePresetsOpen(): Promise<void>;
    /**
     * @function handlePresetSave
     * @summary Actions to run after the "Preset name" "Save" button is clicked
     * @memberof FmcUi
     */
    handlePresetSave(): Promise<void>;
    /**
     * @function handleThumbClick
     * @summary Actions to run after the thumbnails list element is clicked
     * @param {object} event - Click event
     * @memberof FmcUi
     */
    handleThumbClick(event: object): Promise<void>;
    /**
     * @function handleThumbsFilterUncroppedRadiosChange
     * @summary Actions to run after the "Hide Uncropped Thumbnails" option is enabled or disabled
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleThumbsFilterUncroppedRadiosChange(event: object): Promise<void>;
    /**
     * @function handleWindowKeydown
     * @summary Actions to run after a key is pressed down when the app window has focus
     * @param {object} event - Keydown event
     * @memberof FmcUi
     */
    handleWindowKeydown(event: object): Promise<void>;
    /**
     * @function handleWindowResize
     * @summary Actions to run after the app window is resized
     * @memberof FmcUi
     */
    handleWindowResize(): void;
    /**
     * @function handleWriteFilenameRadiosChange
     * @summary Actions to run after the "Write Focalpoint To Filename" option is enabled or disabled
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleWriteFilenameRadiosChange(event: object): Promise<void>;
    /**
     * @function handleWriteTitleRadiosChange
     * @summary Actions to run after the "Write Focalpoint To EXIF/IPTC Title" option is enabled or disabled
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleWriteTitleRadiosChange(event: object): Promise<void>;
    /**
     * @function loadOptions
     * @summary Restore previous UI settings when the UI initialises
     * @memberof FmcUi
     */
    loadOptions(): Promise<void>;
    /**
     * @function saveFocalpoint
     * @summary Save the focalpoint to the image filename or title
     * @memberof FmcUi
     */
    saveFocalpoint(): Promise<void>;
    /**
     * @function selectActivePreset
     * @summary Get the active preset from FmcStore. Select this preset in the dropdown in the Settings modal.
     * @memberof FmcUi
     */
    selectActivePreset(): Promise<void>;
    /**
     * @function setPaths
     * @summary Update attributes in the path links and buttons
     * @param {string} src - Image src
     * @param {string} pathOut - Path out
     * @param {boolean} checkPathExists - Check whether the baseExport path exists
     * @memberof FmcUi
     */
    setPaths(src: string, pathOut: string, checkPathExists?: boolean): Promise<void>;
    /**
     * @function sleep
     * @summary Pause code execution for a specified duration
     * @param {number} ms - Milliseconds
     * @memberof FmcUi
     * @returns {Promise} promise
     * @see https://leapcell.io/blog/how-to-sleep-in-javascript-using-async-await
     */
    sleep(ms: number): Promise<any>;
    /**
     * @function srcSafe
     * @summary Replace encoded spaces with regular ones
     * @param {string} src - Path
     * @returns {string} srcSafe
     * @memberof FmcUi
     */
    srcSafe(src: string): string;
    /**
     * @function useTestData
     * @summary Use fixed data for Cypress testing
     * @memberof FmcUi
     */
    testData(): Promise<void>;
}
//# sourceMappingURL=FmcUi.d.mts.map