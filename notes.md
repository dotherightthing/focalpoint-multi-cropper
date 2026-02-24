graph TD;

    fmcUi.loadOptions-->FmcStore.getOptions(null)
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateFocalpointAutoSave;
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateFocalpointWriteFilename;
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateFocalpointWriteTitle;
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateThumbsAutoSelectFiltered;
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateThumbsFilterUncropped;
    fmcUi.loadOptions-->fmcUi.emitEvent-->updateStatus;


sequenceDiagram
    participant FmcUi
    participant FmcCroppersUi
    participant FmcThumbsUi
    participant FmcFile
    actor FmcStore
    FmcUi: loadOptions
    FmcUi->>: FmcStore
    FmcStore: getOptions


sequenceDiagram
    participant FmcThumbsUi
    participant FmcCroppersUi
    participant FmcUi
    participant FmcStore
    participant FmcFile

    Note over FmcUi,FmcStore: Load options

    alt Stored options
        FmcUi-)FmcStore: getOptions
        FmcStore--)FmcUi: options
    else No stored options
    end

flowchart TD
  subgraph FmcUi.loadOptions
    direction LR
      FmcUi-->x[(FmcStore)]-->getOptions
    end
    subgraph FmcUi.emitElementEvent
      direction LR
        options-->updateFocalpointAutoSave
        options-->updateFocalpointWriteFilename
        options-->updateFocalpointWriteTitle
        options-->updateThumbsAutoSelectFiltered
        options-->updateThumbsFilterUncropped
        options-->updateStatus
    end
    FmcUi.loadOptions --> C{options}
    C -->|Yes| FmcUi.emitElementEvent
    C -->|No| D{foobar}
