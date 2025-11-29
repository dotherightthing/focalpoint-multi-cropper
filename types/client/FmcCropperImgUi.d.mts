export class FmcCropperImgUi {
    /**
     * @class FmcCropperImgUi
     * @summary Manages UI cropper (see also FmcCroppersUi)
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set element(element: HTMLElement);
    /**
     * element
     * @summary Image element within the (last) cropper
     * @type {HTMLElement}
     * @memberof FmcCropperImgUi
     */
    get element(): HTMLElement;
    _element: any;
    set readyHandler(readyHandler: any[]);
    /**
     * readyHandler
     * @summary Function to run after cropperjs fires a "ready" event for the (last) cropper image - each time an image is loaded into the cropper
     * @type {Array}
     * @memberof FmcCropperImgUi
     */
    get readyHandler(): any[];
    _readyHandler: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcCropperImgUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcCropperImgUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcCropperImgUi
     */
    handleUpdate(event: object): void;
}
//# sourceMappingURL=FmcCropperImgUi.d.mts.map