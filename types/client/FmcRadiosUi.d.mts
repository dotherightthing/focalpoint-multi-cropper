export class FmcRadiosUi {
    /**
     * @class FmcRadiosUi
     * @summary Manages UI radio button pairs
     * @param {object} config - Instance config
     * @public
     */
    constructor(config?: object);
    set changeHandler(changeHandler: any[]);
    /**
     * changeHandler
     * @summary Function to run when a radio button is checked
     * @type {Array}
     * @memberof FmcRadiosUi
     */
    get changeHandler(): any[];
    _changeHandler: any;
    set elements(elements: HTMLElement[]);
    /**
     * elements
     * @summary Radio button elements
     * @type {HTMLElement[]}
     * @memberof FmcRadiosUi
     * @todo Validation
     */
    get elements(): HTMLElement[];
    _elements: HTMLElement[];
    set selector(selector: string);
    /**
     * selector
     * @summary DOM selector
     * @type {string}
     * @memberof FmcRadiosUi
     */
    get selector(): string;
    _selector: any;
    set updateListener(updateListener: string);
    /**
     * updateListener
     * @summary Custom event to listen for, before responding with handleUpdate
     * @type {string}
     * @memberof FmcRadiosUi
     */
    get updateListener(): string;
    _updateListener: any;
    /**
     * @function getState
     * @summary Get the state of the radio button set by determining which one is checked
     * @returns {boolean} state
     * @memberof FmcRadiosUi
     */
    getState(): boolean;
    /**
     * @function handleUpdate
     * @summary Respond to an emitted custom event which matches this.updateListener
     * @param {object} event - Custom event which matches this.updateListener
     * @memberof FmcRadiosUi
     */
    handleUpdate(event: object): void;
    /**
     * @function setState
     * @summary Change the state of the radio button set by checking one of the radios
     * @param {string} state - on|off
     * @returns {HTMLElement} checkedRadio
     * @memberof FmcRadiosUi
     */
    setState(state: string): HTMLElement;
}
//# sourceMappingURL=FmcRadiosUi.d.mts.map