export default FmcStore;
declare class FmcStore {
    /**
     * @function getActivePreset
     * @summary Load the preset which matches the name of the active preset
     * @param {event|null} event - FmcStore:getActivePreset event captured by ipcMain.handle
     * @returns {Promise<object>} preset
     * @memberof FmcStore
     * @static
     */
    static getActivePreset(event: Event | null): Promise<object>;
    /**
     * @function getKeys
     * @param {event|null} event - FmcStore:getKeys event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {Array} data.keys - Keys
     * @param {string} data.presetName - Preset name (if key was saved with preset)
     * @returns {Promise<object>} keyValuePairs
     * @memberof FmcStore
     * @static
     */
    static getKeys(event: Event | null, data: {
        keys: any[];
        presetName: string;
    }): Promise<object>;
    /**
     * @function getOptions
     * @param {event|null} event - FmcStore:getOptions event captured by ipcMain.handle
     * @returns {Promise<object>} options
     * @memberof FmcStore
     * @static
     */
    static getOptions(event: Event | null): Promise<object>;
    /**
     * @function getPreset
     * @param {event|null} event - FmcStore:getPreset event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.presetName - Preset name (if key was saved with preset)
     * @returns {Promise<object>} { preset, presetIndex, presets }
     * @memberof FmcStore
     * @static
     */
    static getPreset(event: Event | null, data: {
        presetName: string;
    }): Promise<object>;
    /**
     * @function getPresetNames
     * @returns {Promise<string[]>} presets in alphabetical order
     * @memberof FmcStore
     * @static
     * @see {@link https://stackoverflow.com/a/8900922}
     */
    static getPresetNames(): Promise<string[]>;
    /**
     * @function getStoreFilePath
     * @param {event|null} event - FmcStore:getStoreFilePath event captured by ipcMain.handle
     * @returns {Promise<string>} storeFilePath
     * @memberof FmcStore
     * @static
     */
    static getStoreFilePath(event: Event | null): Promise<string>;
    /**
     * @function parseDataFile
     * @summary Get the contents of the store's data file in JSON format
     * @description
     * Note: this doesn't use async as it is called from the constructor and the results are not passed to the frontend
     * @param {string} filePath - File path
     * @param {object} defaults - Defaults
     * @returns {object} data|defaults
     * @memberof FmcStore
     * @static
     */
    static parseDataFile(filePath: string, defaults: object): object;
    /**
     * @function setActivePresetName
     * @summary Store the value of the active preset name
     * @param {event|null} event - FmcStore:setActivePresetName event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.presetName - Preset name
     * @memberof FmcStore
     * @static
     */
    static setActivePresetName(event: Event | null, data: {
        presetName: string;
    }): Promise<void>;
    /**
     * @function setOrphanKeys
     * @summary Set or update the supplied key/value in the store's data file
     * @param {event|null} event - FmcStore:setOrphanKeys event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {Array} data.keyValuePairs - Objects (key - val pairs)
     * @memberof FmcStore
     * @static
     */
    static setOrphanKeys(event: Event | null, data: {
        keyValuePairs: any[];
    }): Promise<void>;
    /**
     * @function setOptionsKeys
     * @param {event|null} event - FmcStore:setOptionsKeys event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {Array} data.keyValuePairs - Objects (key - val pairs)
     * @memberof FmcStore
     * @static
     */
    static setOptionsKeys(event: Event | null, data: {
        keyValuePairs: any[];
    }): Promise<void>;
    /**
     * @function setPresetKeys
     * @param {event|null} event - FmcStore:setPresetKeys event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {Array} data.keyValuePairs - Objects (key - val pairs)
     * @param {string} data.presetName - Preset name (to save keys with preset)
     * @memberof FmcStore
     * @static
     */
    static setPresetKeys(event: Event | null, data: {
        keyValuePairs: any[];
        presetName: string;
    }): Promise<void>;
    /**
     * @function setOptions
     * @param {event} event - FmcStore:setOptions event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.name - Preset name
     * @returns {Promise<object>} msgObj
     * @memberof FmcStore
     * @static
     */
    static setOptions(event: Event, data: {
        name: string;
    }): Promise<object>;
    /**
     * @function setPreset
     * @param {event} event - FmcStore:setPreset event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.name - Preset name
     * @returns {object} msgObj
     * @memberof FmcStore
     * @static
     */
    static setPreset(event: Event, data: {
        name: string;
    }): object;
    constructor(opts: any);
    path: string;
    set data(data: object);
    /**
     * data
     * @summary The data object
     * @type {object}
     * @memberof FmcStatusBarUi
     */
    get data(): object;
    get(key: any): any;
    set(key: any, val: any): void;
    _data: any;
}
//# sourceMappingURL=FmcStore.d.cts.map