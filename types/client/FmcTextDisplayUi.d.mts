export class FmcTextDisplayUi {
    /**
     * @class FmcTextDisplayUi
     * @summary Manages UI text display fields (span/div/hx with dynamic text inside)
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set element(element: HTMLElement);
    /**
     * element
     * @summary Text display element
     * @type {HTMLElement}
     * @memberof FmcTextDisplayUi
     */
    get element(): HTMLElement;
    _element: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcTextDisplayUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcTextDisplayUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcTextDisplayUi
     */
    handleUpdate(event: object): void;
}
//# sourceMappingURL=FmcTextDisplayUi.d.mts.map