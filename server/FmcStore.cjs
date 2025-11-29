const electron = require('electron');
const path = require('path');
const fs = require('fs');

class FmcStore {
  /**
   * @class FmcStore
   * @summary Manages storage of user preferences in user-preferences.json
   * @see {@link https://cameronnokes.com/blog/how-to-store-user-data-in-electron/}
   * @see {@link https://gist.githubusercontent.com/ccnokes/95cb454860dbf8577e88d734c3f31e08/raw/7b98c7eaa9c74b40f1a62ceb70116c799b9dd555/store.js}
   * @param {object} opts - Options
   * @public
   */
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData'); // Users/NAME/Library/Application\ Support/focalpoint-multi-cropper

    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, `${opts.configName}.json`);

    this.data = FmcStore.parseDataFile(this.path, opts.defaults);
  }

  /* Getters and Setters */

  // This will just return the property on the `data` object
  get(key) {
    return this.data[key];
  }

  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data.

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
      fs.copyFileSync(this.path, path.join(__dirname, '..', 'backup', 'user-preferences.json'));
    } catch (error) {
      throw new Error(`Cannot write to FmcStore: ${error}`);
    }
  }

  /* Static methods */

  /**
   * @function getActivePreset
   * @summary Load the preset which matches the name of the active preset
   * @param {event|null} event - FmcStore:getActivePreset event captured by ipcMain.handle
   * @returns {Promise<object>} preset
   * @memberof FmcStore
   * @static
   */
  static async getActivePreset(event) { // eslint-disable-line no-unused-vars
    // this returns { key: value, key2: value2 }
    let activePresetKeyValuePairs = await FmcStore.getKeys({
      keys: [ 'activePreset' ]
    });

    // in this case there's only one key
    let {
      activePreset: presetName
    } = activePresetKeyValuePairs;

    if (typeof presetName === 'undefined') {
      presetName = 'default';
    }

    const { preset } = await FmcStore.getPreset(null, { presetName });

    return preset;
  }

  /**
   * @function getKeys
   * @summary Retrieve key-value pairs for the supplied keys, optionally from a named preset
   * @param {object} data - Data
   * @param {Array} data.keys - Keys
   * @param {string} data.presetName - Preset name (if key was saved with preset)
   * @returns {Promise<object>} keyValuePairs
   * @memberof FmcStore
   * @static
   */
  static async getKeys(data) {
    // TODO Only called internally - async may be redundant, consider making #private
    const {
      keys,
      presetName
    } = data;

    const keyValuePairs = {};

    if (typeof presetName !== 'undefined') {
      const { preset } = await FmcStore.getPreset(null, {
        presetName
      });

      if (typeof preset !== 'undefined') {
        keys.forEach(key => {
          keyValuePairs[key] = (typeof preset[key] !== 'undefined') ? preset[key] : null; // value could also be nested object
        });
      }
    } else {
      for (let k = 0; k < keys.length; k += 1) {
        const key = keys[k];

        const value = await fmcStore.get(key, (error) => {
          if (error) {
            throw new Error(`Error ${key} does not exist: ${error}`);
          }
        });

        keyValuePairs[key] = value;
      }
    }

    return keyValuePairs;
  }

  /**
   * @function getOptions
   * @summary Retrieve the options object from the store
   * @param {event|null} event - FmcStore:getOptions event captured by ipcMain.handle
   * @returns {Promise<object>} options
   * @memberof FmcStore
   * @static
   */
  static async getOptions(event) { // eslint-disable-line no-unused-vars
    let msgObj;

    // TODO Check whether I am using getters and setters correctly in other files - and not just referencing by property name
    const options = await fmcStore.get('options') || {};

    if ((typeof options !== 'undefined') && Object.keys(options).length > 0) {
      msgObj = {
        statusMessage: 'Loaded options',
        statusType: 'success'
      };
    } else {
      msgObj = {
        statusMessage: 'Could not load options',
        statusType: 'warning'
      };
    }

    return {
      msgObj,
      options
    };
  }

  /**
   * @function getPreset
   * @summary Retrieve a named preset from the store
   * @param {event|null} event - FmcStore:getPreset event captured by ipcMain.handle
   * @param {object} data - Data
   * @param {string} data.presetName - Preset name (if key was saved with preset)
   * @returns {Promise<object>} { preset, presetIndex, presets }
   * @memberof FmcStore
   * @static
   */
  static async getPreset(event, data) {
    const {
      presetName
    } = data;

    let msgObj;
    let preset = {};
    let presetIndex = -1;

    const presets = await fmcStore.get('presets');

    if ((typeof presets !== 'undefined') && presets.length) {
      preset = presets.filter(item => item.name === presetName);
      presetIndex = presets.findIndex(item => item.name === presetName);

      msgObj = {
        statusMessage: 'Loaded preset',
        statusType: 'success'
      };
    } else {
      msgObj = {
        statusMessage: 'Could not load preset',
        statusType: 'warning'
      };
    }

    return {
      msgObj,
      preset: preset[0],
      presetIndex,
      presets
    };
  }

  /**
   * @function getPresetNames
   * @summary Get names of all presets in the store
   * @returns {Promise<string[]>} presets in alphabetical order
   * @memberof FmcStore
   * @static
   * @see {@link https://stackoverflow.com/a/8900922}
   */
  static async getPresetNames() {
    const presets = await fmcStore.get('presets');
    let presetNames = [];

    if (typeof presets !== 'undefined') {
      presetNames = presets.map(item => item.name);
      presetNames = presetNames.sort();
    }

    return presetNames;
  }

  /**
   * @function getStoreFilePath
   * @summary Get the path to the user-preferences.json file used by the store
   * @param {event|null} event - FmcStore:getStoreFilePath event captured by ipcMain.handle
   * @returns {Promise<string>} storeFilePath
   * @memberof FmcStore
   * @static
   */
  static async getStoreFilePath(event) { // eslint-disable-line no-unused-vars
    return fmcStore.path;
  }

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
  static parseDataFile(filePath, defaults) {
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      // if there was some kind of error, return the passed in defaults instead.
      return defaults;
    }
  }

  /**
   * @function setActivePresetName
   * @summary Store the value of the active preset name
   * @param {event|null} event - FmcStore:setActivePresetName event captured by ipcMain.handle
   * @param {object} data - Data
   * @param {string} data.presetName - Preset name
   * @memberof FmcStore
   * @static
   */
  static async setActivePresetName(event, data) {
    const {
      presetName
    } = data;

    FmcStore.setOrphanKeys(null, {
      keyValuePairs: [
        {
          activePreset: presetName
        }
      ]
    });
  }

  /**
   * @function setOrphanKeys
   * @summary Set or update the supplied key/value in the store's data file
   * @param {event|null} event - FmcStore:setOrphanKeys event captured by ipcMain.handle
   * @param {object} data - Data
   * @param {Array} data.keyValuePairs - Objects (key - val pairs)
   * @memberof FmcStore
   * @static
   */
  static async setOrphanKeys(event, data) {
    /*
    "foo": "bar"
    */

    const {
      keyValuePairs
    } = data;

    keyValuePairs.forEach(obj => {
      const [
        key,
        value
      ] = Object.entries(obj)[0];

      fmcStore.set(key, value, (error) => {
        if (error) {
          throw error;
        }
      });
    });
  }

  /**
   * @function setOptionsKeys
   * @summary Set or update the supplied key/value in the options section of the store's data file
   * @param {object} data - Data
   * @param {Array} data.keyValuePairs - Objects (key - val pairs)
   * @memberof FmcStore
   * @static
   */
  static async setOptionsKeys(data) {
    /*
    "options": [
      {
        "foo": "bar"
        "bar": "baz"
      }
    ]
    */

    const {
      keyValuePairs
    } = data;

    let { options = {} } = await FmcStore.getOptions(null);

    keyValuePairs.forEach(obj => {
      const [
        key,
        value // can be anything incl an object
      ] = Object.entries(obj)[0];

      options[key] = value;
    });

    fmcStore.set('options', options, (error) => {
      if (error) {
        throw error;
      }
    });
  }

  /**
   * @function setPresetKeys
   * @summary Set or update the supplied key/value in the presets section of the store's data file
   * @param {object} data - Data
   * @param {Array} data.keyValuePairs - Objects (key - val pairs)
   * @param {string} data.presetName - Preset name (to save keys with preset)
   * @memberof FmcStore
   * @static
   */
  static async setPresetKeys(data) {
    /*
    "presets": [
      {
        "name": "preset 1",
        "prop1": {
          "propA": "bar",
          "propB": "baz"
        },
        "prop2": "bar"
      }
    ]
    */

    const {
      keyValuePairs,
      presetName
    } = data;

    // allow non-preset settings such as UI auto-save toggle
    if (typeof presetName !== 'undefined') {
      let {
        preset = {},
        presetIndex = -1,
        presets = []
      } = await FmcStore.getPreset(null, { presetName });

      if (presetIndex === -1) {
        preset.name = presetName;

        presets.push(preset);
        presetIndex = presets.length - 1;
      }

      keyValuePairs.forEach(obj => {
        const [
          key,
          value // can be anything incl an object
        ] = Object.entries(obj)[0];

        preset[key] = value;
      });

      presets[presetIndex] = preset;

      fmcStore.set('presets', presets, (error) => {
        if (error) {
          throw error;
        }
      });
    }
  }

  /**
   * @function setOptions
   * @summary Update the options object in the store
   * @param {event} event - FmcStore:setOptions event captured by ipcMain.handle
   * @param {object} data - Data
   * @param {string} data.name - Preset name
   * @returns {Promise<object>} msgObj
   * @memberof FmcStore
   * @static
   */
  static async setOptions(event, data) {
    const keyValuePairs = [];

    const entries = Object.entries(data);

    entries.forEach(entry => {
      const key = entry[0];
      const val = entry[1];

      keyValuePairs.push({
        [key]: val
      });
    });

    keyValuePairs.push({
      lastModified: new Date().toLocaleString() // "13/08/2023, 8:52:55 pm"
    });

    await FmcStore.setOptionsKeys({ keyValuePairs });

    return new Promise(resolve => {
      resolve({
        statusMessage: 'Saved options',
        statusType: 'success'
      });
    });
  }

  /**
   * @function setPreset
   * @summary Update a preset object in the store
   * @param {event} event - FmcStore:setPreset event captured by ipcMain.handle
   * @param {object} data - Data
   * @param {string} data.name - Preset name
   * @returns {object} msgObj
   * @memberof FmcStore
   * @static
   */
  static async setPreset(event, data) {
    const {
      name = 'default'
    } = data;

    const keyValuePairs = [];

    const entries = Object.entries(data);

    entries.forEach(entry => {
      const key = entry[0];
      const val = entry[1];

      keyValuePairs.push({
        [key]: val
      });
    });

    keyValuePairs.push({
      lastModified: new Date().toLocaleString() // "13/08/2023, 8:52:55 pm"
    });

    await FmcStore.setPresetKeys({
      keyValuePairs,
      presetName: name
    });

    return new Promise(resolve => {
      resolve({
        statusMessage: 'Saved preset',
        statusType: 'success'
      });
    });
  }
}

// used internally to set and get data
const fmcStore = new FmcStore({
  configName: 'user-preferences',
  defaults: {}
});

// used externally to access static methods
export default FmcStore;
