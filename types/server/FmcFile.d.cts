export = FmcFile;
declare class FmcFile {
    /**
     * @class FmcFile
     * @summary Manages file manipulation
     * @param {object} config - Instance config
     * @public
     */
    /**
     * @function copyFromClipboard
     * @summary Copy the value that is on the system clipboard
     * @returns {Promise<string>} text
     * @memberof FmcFile
     * @static
     */
    static copyFromClipboard(): Promise<string>;
    /**
     * @function copyToClipboard
     * @summary Copy a value to the system clipboard
     * @param {event} event - FmcFile:copyToClipboard event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.text - Text
     * @memberof FmcFile
     * @static
     */
    static copyToClipboard(event: Event, data: {
        text: string;
    }): void;
    /**
     * getFocalpointRegex
     * @summary Isolate the part of the filename or image title which contains focalpoint information
     * @returns {RegExp} regex
     * @memberof FmcFile
     * @static
     */
    static getFocalpointRegex(): RegExp;
    /**
     * @function resizeAndCropImage
     * @summary Deleting existing resizes and crops and generate new ones
     * @param {event} event - FmcFile:resizeAndCropImage event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.fileName - Filename
     * @param {number} data.quality - Quality
     * @param {string} data.targetFolder - Target folder
     * @param {Array} data.cropsAndSizes - Crops and sizes
     * @returns {Promise<object>} { baseExportPath, counts }
     * @memberof FmcFile
     * @static
     */
    static resizeAndCropImage(event: Event, data: {
        fileName: string;
        quality: number;
        targetFolder: string;
        cropsAndSizes: any[];
    }): Promise<object>;
    /**
     * @function gmResizeAndCrop
     * @summary Resize and/or crop an image using gm (GraphicsMagick)
     * @param {object} data - Data
     * @param {number|undefined} data.centerX - Center of image (X axis)
     * @param {number|undefined} data.centerY - Center of image (Y axis)
     * @param {number|undefined} data.cropW - Width of the cropped area
     * @param {number|undefined} data.cropH - Height of the cropped area
     * @param {number|undefined} data.cropX - Offset left of the cropped area
     * @param {number|undefined} data.cropY - Offset top of the cropped area
     * @param {string} data.fileNameSuffix - Suffix to add to the image
     * @param {boolean} data.marker - Draw focalpoint marker on image
     * @param {string} data.markerHex - Hex color of the focalpoint marker
     * @param {number} data.markerStrokeW - Stroke width of the focalpoint marker
     * @param {number} data.markerWH - Width/Height of the focalpoint marker
     * @param {number} data.quality - Image quality
     * @param {number} data.resizeW - Width to resize the image to
     * @param {number|undefined} data.resizeH - Height to resize the image to
     * @param {string} data.sourceFileName - Source file name
     * @param {string} data.targetFilename - Export filename
     * @returns {Promise<string>} successMessage
     * @memberof FmcFile
     * @static
     */
    static gmResizeAndCrop(data: {
        centerX: number | undefined;
        centerY: number | undefined;
        cropW: number | undefined;
        cropH: number | undefined;
        cropX: number | undefined;
        cropY: number | undefined;
        fileNameSuffix: string;
        marker: boolean;
        markerHex: string;
        markerStrokeW: number;
        markerWH: number;
        quality: number;
        resizeW: number;
        resizeH: number | undefined;
        sourceFileName: string;
        targetFilename: string;
    }): Promise<string>;
    /**
     * @function getRelativePath
     * @param {event} event - FmcFile:getRelativePath event captured by ipcMain.handle
     * @summary Get the relative path from From to To based on the selected Base directory
     * @param {object} data - Data
     * @param {string} data.base - Website path
     * @param {string} data.from - From path
     * @param {string} data.to - To path
     * @returns {string} relativePath
     * @memberof FmcFile
     * @static
     */
    static getRelativePath(event: Event, data: {
        base: string;
        from: string;
        to: string;
    }): string;
    /**
     * @function deleteImagePercentXYFromImage
     * @summary Remove focalpoint data from an image's filename
     * @param {event} event - FmcFile:deleteImagePercentXYFromImage event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.fileName - Filename
     * @returns {Promise<object>} { msg, type }
     * @memberof FmcFile
     * @static
     */
    static deleteImagePercentXYFromImage(event: Event, data: {
        fileName: string;
    }): Promise<object>;
    /**
     * @function pathExists
     * @summary Check that a file path exists
     * @param {event} event - FmcFile:pathExists event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.path - Path
     * @returns {Promise<boolean>} exists
     * @memberof FmcFile
     * @static
     * @see {@link https://futurestud.io/tutorials/node-js-check-if-a-file-exists}
     */
    static pathExists(event: Event, data: {
        path: string;
    }): Promise<boolean>;
    /**
     * @function getFileNameParts
     * @summary Separate a filepath out into various parts
     * @param {event} event - FmcFile:resizeAndCropImage event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.fileName - File name
     * @returns {Promise<object>} fileNameParts
     * @memberof FmcFile
     * @static
     */
    static getFileNameParts(event: Event, data: {
        fileName: string;
    }): Promise<object>;
    /**
     * @function getFiles
     * @summary Get all filenames within a directory, ignoring subfolders
     * @param {string} dir - Directory path
     * @returns {string[]} filenames
     * @memberof FmcFile
     * @static
     */
    static getFiles(dir: string): string[];
    /**
     * @function getImageFiles
     * @summary Get all image filenames within a directory
     * @param {string} dir - Directory path
     * @returns {Promise<string[]>} filenames
     * @memberof FmcFile
     * @static
     */
    static getImageFiles(dir: string): Promise<string[]>;
    /**
     * @function setTitleInPhotosApp
     * @summary Locate matching image in Photos app library and amend its title with the focalpoint settings
     * @param {event} event - FmcFile:setTitleInPhotosApp event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.imageName - Image name
     * @param {string} data.title - EXIF/IPTC title
     * @param {string} data.date - Date created
     * @returns {Promise<object>} msgObj
     * @memberof FmcFile
     * @static
     */
    static setTitleInPhotosApp(event: Event, data: {
        imageName: string;
        title: string;
        date: string;
    }): Promise<object>;
    /**
     * @function getImagesData
     * @summary Get the path to a folder and the supported images within it
     * @param {Array} imageFiles - Supported file types contained within the folder
     * @returns {Promise<object[]>} imagesData
     * @memberof FmcFile
     * @static
     */
    static getImagesData(imageFiles: any[]): Promise<object[]>;
    /**
     * @function openInEditor
     * @summary Open a file in an editor application
     * @param {event} event - FmcFile:openInEditor event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.editorCommand - Editor command (e.g. 'code')
     * @param {string} data.fileDescription - File description
     * @param {string} data.filePath - Path to website file
     * @param {string} data.folderPath - Path to website (workspace) folder
     * @returns {Promise<string>} statusMessage
     * @memberof FmcFile
     * @static
     */
    static openInEditor(event: Event, data: {
        editorCommand: string;
        fileDescription: string;
        filePath: string;
        folderPath: string;
    }): Promise<string>;
    /**
     * @function openInFinder
     * @summary Open the Finder and select a file
     * @param {event} event - FmcFile:openInFinder event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.href - HREF
     * @memberof FmcFile
     * @static
     */
    static openInFinder(event: Event, data: {
        href: string;
    }): void;
    /**
     * @function selectFile
     * @summary Open a Finder file-picker at the previous folder location
     * @param {event} event - FmcFile:selectFile event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.dialogTitle - Title for the dialog
     * @param {boolean} data.restore - Restore setting if it was previously stored
     * @param {string} data.storeKey - Key under which to persist the file path in the JSON file
     * @returns {Promise<object>} { fileName, filePath }
     * @memberof FmcFile
     * @static
     */
    static selectFile(event: Event, data: {
        dialogTitle: string;
        restore: boolean;
        storeKey: string;
    }): Promise<object>;
    /**
     * @function sortDateOrderAscending
     * @summary Sort images in date order, ascending
     * @param {object[]} imagesData - Images data
     * @returns {number[]} imagesDataSorted
     * @memberof FmcFile
     * @static
     */
    static sortDateOrderAscending(imagesData: object[]): number[];
    /**
     * @function selectFolder
     * @summary Open a Finder folder-picker at the previous folder location
     * @param {event} event - FmcFile:selectFolder event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.dialogTitle - Title for the dialog
     * @param {boolean} data.retrieveImagesData - Get information about images in the folder
     *  (The UI contains multiple folder 'Browse' buttons, but only the 'folderIn' needs access to imagesData.)
     * @param {boolean} data.restore - Restore setting if it was previously stored
     * @param {string} data.storeKey - Key under which to persist the folder path in the JSON file
     * @returns {Promise<object>} { folderName, folderPath, imagesData }
     * @memberof FmcFile
     * @static
     */
    static selectFolder(event: Event, data: {
        dialogTitle: string;
        retrieveImagesData: boolean;
        restore: boolean;
        storeKey: string;
    }): Promise<object>;
    /**
     * @function isEmptyObject
     * @summary Determine whether an object is empty ({})
     * @param {object} obj - Object
     * @returns {boolean} is empty
     * @see {@link https://stackoverflow.com/a/49729848}
     * @memberof FmcFile
     * @static
     */
    static isEmptyObject(obj: object): boolean;
    /**
     * @function exiftool
     * @summary Read or write image EXIF/IPTC using exiftool library
     * @param {event} event - FmcFile:exiftool event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.method - exiftool method to call
     * @param {string} data.fileNameWithPath - File name with path
     * @param {object} data.exifData - EXIF data
     * @returns {Promise<object>} { tags, extras }
     * @see {@link https://stackoverflow.com/a/49729848}
     * @memberof FmcFile
     * @static
     */
    static exiftool(event: Event, data: {
        method: string;
        fileNameWithPath: string;
        exifData: object;
    }): Promise<object>;
    /**
     * @function renameSync
     * @summary Rename a file to add or remove a focalpoint from the filename
     * @param {event} event - FmcFile:renameSync event captured by ipcMain.handle
     * @param {object} data - Data
     * @param {string} data.oldFileNameWithPath - Old file name with path
     * @param {string} data.newFileNameWithPath - New file name with path
     * @returns {Promise<object>} { statusMessage, statusType }
     * @memberof FmcFile
     * @static
     */
    static renameSync(event: Event, data: {
        oldFileNameWithPath: string;
        newFileNameWithPath: string;
    }): Promise<object>;
}
//# sourceMappingURL=FmcFile.d.cts.map