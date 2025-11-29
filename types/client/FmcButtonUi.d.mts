export class FmcButtonUi {
    /**
     * @function handleCopyPath
     * @summary Copy the element's title to the clipboard
     * @param {object} event - Click event
     * @memberof FmcButtonUi
     * @static
     * @todo Why is title used rather than data-title or better still data-path?
     */
    static handleCopyPath(event: object): void;
    /**
     * @function handleLinkToPath
     * @summary Open the element's data-href in Finder
     * @param {object} event - Click event
     * @memberof FmcButtonUi
     * @static
     */
    static handleLinkToPath(event: object): Promise<void>;
    /**
     * @class FmcButtonUi
     * @summary Manages UI buttons
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set clickHandler(clickHandler: any[]);
    /**
     * clickHandler
     * @summary Function to run when the button is clicked
     * @type {Array}
     * @memberof FmcButtonUi
     */
    get clickHandler(): any[];
    _clickHandler: any;
    set element(element: HTMLElement);
    /**
     * element
     * @summary Button element
     * @type {HTMLElement}
     * @memberof FmcButtonUi
     */
    get element(): HTMLElement;
    _element: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcButtonUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcButtonUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function disable
     * @summary Disable the button
     * @memberof FmcButtonUi
     */
    disable(): void;
    /**
     * @function enable
     * @summary Re-enable the button
     * @param {string} value - Value
     * @memberof FmcButtonUi
     */
    enable(value: string): void;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcButtonUi
     */
    handleUpdate(event: object): void;
}
//# sourceMappingURL=FmcButtonUi.d.mts.map