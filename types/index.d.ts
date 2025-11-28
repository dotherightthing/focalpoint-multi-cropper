// export {}

export interface IFmcFile {
  loadPreferences: () => Promise<void>,
}

export interface IFmcStore {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    Cropper: any,
    FmcFile: IFmcFile,
    FmcStore: IFmcStore
  }
}