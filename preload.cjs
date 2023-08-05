// preload script
// runs before web page is loaded
// has access to both DOM APIs and the Node.js environment
// exposes privileged APIs to the renderer via the contextBridge API
// sets up inter-process communication (IPC) interfaces to pass arbitrary messages between Electron's main and renderer processes

const {
  contextBridge,
  ipcRenderer
} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // The ipcRenderer module is an EventEmitter, for inter-process communication (IPC) with the main process
  // ipcRenderer.send() sends to ipcMain.on()
  // ipcRenderer.invoke() invokes ipcMain.handle()
  //
  // function in renderer.js or frontend class calls window.electronAPI.methodName, with or without a data object
  // backend responds and returns data to calling function

  copyFromClipboard: (data) => ipcRenderer.invoke('FmcFile:copyFromClipboard', data),
  copyToClipboard: (data) => ipcRenderer.invoke('FmcFile:copyToClipboard', data),
  getRelativePath: (data) => ipcRenderer.invoke('FmcFile:getRelativePath', data),
  openInEditor: (data) => ipcRenderer.invoke('FmcFile:openInEditor', data),
  openInFinder: (data) => ipcRenderer.invoke('FmcFile:openInFinder', data),
  pathExists: (data) => ipcRenderer.invoke('FmcFile:pathExists', data),
  selectFile: (data) => ipcRenderer.invoke('FmcFile:selectFile', data),
  selectFolder: (data) => ipcRenderer.invoke('FmcFile:selectFolder', data),
  deleteImagePercentXYFromImage: (data) => ipcRenderer.invoke('FmcFile:deleteImagePercentXYFromImage', data),
  saveImagePercentXYToImage: (data) => ipcRenderer.invoke('FmcFile:saveImagePercentXYToImage', data),
  resizeImage: (data) => ipcRenderer.invoke('FmcFile:resizeImage', data),
  resizeAndCropImage: (data) => ipcRenderer.invoke('FmcFile:resizeAndCropImage', data),
  getActivePreset: (data) => ipcRenderer.invoke('Store:getActivePreset', data),
  getKeys: (data) => ipcRenderer.invoke('Store:getKeys', data),
  getPreset: (data) => ipcRenderer.invoke('Store:getPreset', data),
  getPresetNames: (data) => ipcRenderer.invoke('Store:getPresetNames', data),
  setActivePresetName: (data) => ipcRenderer.invoke('Store:setActivePresetName', data),
  setKeys: (data) => ipcRenderer.invoke('Store:setKeys', data),
  setPreset: (data) => ipcRenderer.invoke('Store:setPreset', data)
});
