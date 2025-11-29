export class FmcTextfieldUi {
    /**
     * @class FmcTextfieldUi
     * @summary Manages UI textfields
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set changeHandler(changeHandler: any[]);
    /**
     * changeHandler
     * @summary Function to run when text is added or removed from the textfield
     * @type {Array}
     * @memberof FmcTextfieldUi
     */
    get changeHandler(): any[];
    _changeHandler: any;
    set element(element: HTMLElement);
    /**
     * element
     * @summary Textfield element
     * @type {HTMLElement}
     * @memberof FmcTextfieldUi
     */
    get element(): HTMLElement;
    _element: any;
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcTextfieldUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcTextfieldUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcTextfieldUi
     */
    handleUpdate(event: object): void;
}
//# sourceMappingURL=FmcTextfieldUi.d.mts.map