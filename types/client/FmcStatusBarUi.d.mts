export class FmcStatusBarUi {
    /**
     * @class FmcStatusBarUi
     * @summary Manages UI status bar
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set element(element: HTMLElement);
    /**
     * element
     * @summary The status bar container element
     * @type {HTMLElement}
     * @memberof FmcStatusBarUi
     */
    get element(): HTMLElement;
    _element: any;
    /**
     * statusMessageElement
     * @summary The status bar element which displays messages
     * @type {HTMLElement}
     * @memberof FmcStatusBarUi
     */
    get statusMessageElement(): HTMLElement;
    /**
     * statusTypeElement
     * @summary The status bar element which displays the message type
     * @type {HTMLElement}
     * @memberof FmcStatusBarUi
     */
    get statusTypeElement(): HTMLElement;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcStatusBarUi
     */
    get selector(): string;
    _selector: any;
    set statusTypes(statusTypes: any[]);
    /**
     * statusTypes
     * @summary Types of status messages
     * @type {Array}
     * @memberof FmcStatusBarUi
     */
    get statusTypes(): any[];
    _statusTypes: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcStatusBarUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcStatusBarUi
     * @see {link https://www.macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous}
     * @see {link https://stackoverflow.com/a/65144294}
     */
    handleUpdate(event: object): Promise<void>;
}
//# sourceMappingURL=FmcStatusBarUi.d.mts.map