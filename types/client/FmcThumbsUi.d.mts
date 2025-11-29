export class FmcThumbsUi {
    /**
     * @function getNextIndex
     * @summary Get the index of the next node in a nodelist
     * @param {NodeList} nodeList - List of thumb items
     * @param {number} selectedIndex - Index of selected thumb item
     * @returns {number} nextIndex | -1
     * @memberof FmcThumbsUi
     * @static
     */
    static getNextIndex(nodeList: NodeList, selectedIndex: number): number;
    /**
     * @function getPreviousIndex
     * @summary Get the index of the previous node in a nodelist
     * @param {NodeList} nodeList - List of thumb items
     * @param {number} selectedIndex - Index of selected thumb item
     * @returns {number} previousIndex | -1
     * @memberof FmcThumbsUi
     * @static
     */
    static getPreviousIndex(nodeList: NodeList, selectedIndex: number): number;
    /**
     * @class FmcThumbsUi
     * @summary Manages rendering and manipulation of the sequence of thumbnails below the croppers
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set elements(elements: object);
    /**
     * elements
     * @summary DOM elements shared between fmcCroppersUiInstance, fmcThumbsUiInstance, fmcUi
     * @type {object}
     * @memberof FmcThumbsUi
     */
    get elements(): object;
    _elements: any;
    set fmcCroppersUiInstance(fmcCroppersUiInstance: object);
    /**
     * fmcCroppersUiInstance
     * @summary An instance of FmcCroppersUi
     * @type {object}
     * @memberof FmcThumbsUi
     */
    get fmcCroppersUiInstance(): object;
    _fmcCroppersUiInstance: any;
    set selectors(selectors: object);
    /**
     * selectors
     * @summary DOM selectors
     * @type {object}
     * @memberof FmcThumbsUi
     */
    get selectors(): object;
    _selectors: any;
    /**
     * @function applySelectedClass
     * @summary Apply the 'selected' class to the selected thumb
     * @param {HTMLElement} target - Selected thumb
     * @memberof FmcThumbsUi
     */
    applySelectedClass(target: HTMLElement): void;
    /**
     * @function changeSelectedImageSrc
     * @summary Change the src attribute of the specified IMG element
     * @param {string} src - New src
     * @memberof FmcThumbsUi
     */
    changeSelectedImageSrc(src: string): void;
    /**
     * @function setCssImagePercentXY
     * @summary Set alt and style attributes on a thumb button in order to display the focalpoint circle
     * @param {object} args - Arguments
     * @param {HTMLElement} args.thumbButton - DOM Element
     * @param {HTMLElement} args.thumbImg - DOM Element
     * @param {number} args.thumbIndex - Thumb index
     * @param {number} args.imagePercentX - Image percent X
     * @param {number} args.imagePercentY - Image percent Y
     * @memberof FmcThumbsUi
     */
    setCssImagePercentXY({ thumbButton, thumbImg, thumbIndex, imagePercentX, imagePercentY }: {
        thumbButton: HTMLElement;
        thumbImg: HTMLElement;
        thumbIndex: number;
        imagePercentX: number;
        imagePercentY: number;
    }): void;
    /**
     * @function containsThumbs
     * @summary Whether the thumb area of the UI contains any thumbs
     * @returns {number} thumbLength (truthy|falsy)
     * @memberof FmcThumbsUi
     */
    containsThumbs(): number;
    /**
     * @function displayCount
     * @summary Update the value of the #N / NN counter which appears next to the current image title
     * @param {object} args - Arguments
     * @param {number} args.thumbTotal - Thumb total
     * @param {number} args.thumbIndex - Thumb index (first is 1)
     * @memberof FmcThumbsUi
     */
    displayCount({ thumbTotal, thumbIndex }: {
        thumbTotal: number;
        thumbIndex: number;
    }): void;
    /**
     * @function filterByFilenameAndCropped
     * @summary Hide thumbs which don't match the search string, or which are uncropped (if "Hide Uncropped Thumbnails" is enabled)
     * @param {string} searchStr - Search string
     * @memberof FmcThumbsUi
     */
    filterByFilenameAndCropped(searchStr: string): void;
    /**
     * @function focusThumb
     * @summary Click then scroll the appropriate thumb into view
     * @param {string} position - Position of thumb (previous|next|selected)
     * @memberof FmcThumbsUi
     */
    focusThumb(position: string): void;
    /**
     * @function generateThumbsHtml
     * @summary Inject the thumb images and their scaffolding, then select the selected thumb
     * @param {Array} imagesData - Images data
     * @param {number} selectedThumbIndex - Selected thumb index
     * @memberof FmcThumbsUi
     */
    generateThumbsHtml(imagesData: any[], selectedThumbIndex: number): Promise<void>;
    /**
     * @function clickSelectedThumb
     * @summary Click the selected thumb
     * @param {number} selectedThumbIndex - Selected thumb index
     * @memberof FmcThumbsUi
     */
    clickSelectedThumb(selectedThumbIndex: number): void;
    /**
     * @function getButtons
     * @summary Get all thumbs buttons
     * @returns {NodeList} thumbsButtons - Thumb buttons
     * @memberof FmcThumbsUi
     */
    getButtons(): NodeList;
    /**
     * @function getClickedButton
     * @summary Get the thumb button which was clicked and the its index within all thumb buttons
     * @param {object} event - Event
     * @returns {HTMLElement} button
     * @memberof FmcThumbsUi
     */
    getClickedButton(event: object): HTMLElement;
    /**
     * @function getSelectedThumbIndex
     * @summary Get the index of the selected thumb from a data- property in the DOM
     * @returns {string} thumbIndex
     * @memberof FmcThumbsUi
     */
    getSelectedThumbIndex(): string;
    /**
     * @function formatDateTimeOriginal
     * @summary Convert '2015:08:23 11:28:48' into a human readable date
     * @param {string} dateTimeOriginal - DateTimeOriginal.description
     * @returns {object} { dayTimeStr, dateStr }
     * @memberof FmcThumbsUi
     */
    formatDateTimeOriginal(dateTimeOriginal: string): object;
    /**
     * @function removeSelectedClass
     * @summary Remove the 'selected' class from the selected thumb
     * @memberof FmcThumbsUi
     */
    removeSelectedClass(): void;
}
//# sourceMappingURL=FmcThumbsUi.d.mts.map