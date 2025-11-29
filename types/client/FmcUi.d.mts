export class FmcUi {
    /**
     * @function debounce
     * @param {Function} func - Function to call after delay
     * @param {number} wait - Wait time in ms
     * @param {boolean} [immediate] - Call the function immediately
     * @returns {Function} function
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
     * @param {...*} args - Function arguments
     * @memberof FmcUi
     * @static
     */
    static log(...args: any[]): void;
    /**
     * @class FmcUi
     * @summary Manages UI
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
     * @type {object}
     * @memberof FmcUi
     */
    get fmcCroppersUiInstance(): object;
    _fmcCroppersUiInstance: any;
    set fmcThumbsUiInstance(fmcThumbsUiInstance: object);
    /**
     * fmcThumbsUiInstance
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
     * @summary Actions to run after a "Auto-Save" radio button is checked
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleAutosaveRadiosChange(event: object): Promise<void>;
    /**
     * @function handleAutoSelectFilteredRadiosChange
     * @summary Actions to run after a "Auto-Select First Filter Result" radio button is checked
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleAutoSelectFilteredRadiosChange(event: object): Promise<void>;
    /**
     * @function handleEditPresets
     * @memberof FmcUi
     */
    handleEditPresets(): Promise<void>;
    /**
     * @function handleExportAll
     * @memberof FmcUi
     * @todo Replace exportDelay with more robust check
     */
    handleExportAll(): Promise<void>;
    /**
     * @function handleExportSelected
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
     * @memberof FmcUi
     */
    handleFocalpointDelete(): Promise<void>;
    /**
     * @function handleFocalpointInputChange
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleFocalpointInputChange(event: object): Promise<void>;
    /**
     * @function handleFocalpointReset
     * @param {object} event - Click event
     * @memberof FmcUi
     */
    handleFocalpointReset(event: object): Promise<void>;
    /**
     * @function handleFocalpointSave
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
     * @todo Rename to something more intuitive
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
     * @summary Actions to run after a "Hide Uncropped Thumbnails" radio button is checked
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
     * @summary Actions to run after a "Write Focalpoint To Filename" radio button is checked
     * @param {object} event - Change event
     * @memberof FmcUi
     */
    handleWriteFilenameRadiosChange(event: object): Promise<void>;
    /**
     * @function handleWriteTitleRadiosChange
     * @summary Actions to run after a "Write Focalpoint To EXIF/IPTC Title" radio button is checked
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
     * @memberof FmcUi
     */
    saveFocalpoint(): Promise<void>;
    /**
     * @function selectActivePreset
     * @summary Get the active preset from FmcStore. Select this preset in the dropdown in the Settings modal.
     * @todo Consider renaming to selectStoredActivePreset ?
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
     * @memberof FmcUi
     */
    testData(): Promise<void>;
}
//# sourceMappingURL=FmcUi.d.mts.map