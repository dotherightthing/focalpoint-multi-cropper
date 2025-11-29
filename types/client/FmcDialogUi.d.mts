export class FmcDialogUi {
    /**
     * @class FmcDialogUi
     * @summary Manages UI dialogs
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set appendedElement(appendedElement: HTMLElement);
    /**
     * appendedElement
     * @type {HTMLElement}
     * @memberof FmcDialogUi
     */
    get appendedElement(): HTMLElement;
    _appendedElement: any;
    set appendedSelector(appendedSelector: string);
    /**
     * appendedSelector
     * @summary Selector of element to append to dialog when open
     * @type {string}
     * @memberof FmcDialogUi
     */
    get appendedSelector(): string;
    _appendedSelector: any;
    set closerElement(closerElement: HTMLElement);
    /**
     * closerElement
     * @type {HTMLElement}
     * @memberof FmcDialogUi
     */
    get closerElement(): HTMLElement;
    _closerElement: any;
    set element(element: HTMLDialogElement);
    /**
     * element
     * @type {HTMLDialogElement}
     * @memberof FmcDialogUi
     */
    get element(): HTMLDialogElement;
    _element: any;
    set openerElement(openerElement: HTMLElement);
    /**
     * openerElement
     * @type {HTMLElement}
     * @memberof FmcDialogUi
     */
    get openerElement(): HTMLElement;
    _openerElement: any;
    set openHandler(openHandler: any[]);
    /**
     * openHandler
     * @summary Function to run when the dialog is opened
     * @type {Array}
     * @memberof FmcDialogUi
     */
    get openHandler(): any[];
    _openHandler: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcDialogUi
     */
    get selector(): string;
    _selector: any;
    /**
     * @function open
     * @memberof FmcUi
     */
    open(): Promise<void>;
    /**
     * @function close
     * @memberof FmcUi
     */
    close(): void;
}
//# sourceMappingURL=FmcDialogUi.d.mts.map