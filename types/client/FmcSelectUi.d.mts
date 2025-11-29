export class FmcSelectUi {
    /**
     * @class FmcSelectUi
     * @summary Manages UI select menus
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set changeHandler(changeHandler: any[]);
    /**
     * changeHandler
     * @summary Function to run when an option is selected
     * @type {Array}
     * @memberof FmcSelectUi
     */
    get changeHandler(): any[];
    _changeHandler: any;
    set element(element: HTMLElement);
    /**
     * element
     * @summary The select element
     * @type {HTMLElement}
     * @memberof FmcSelectUi
     */
    get element(): HTMLElement;
    _element: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcSelectUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcSelectUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcSelectUi
     */
    handleUpdate(event: object): void;
}
//# sourceMappingURL=FmcSelectUi.d.mts.map