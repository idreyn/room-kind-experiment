import manifestJson from './_manifestData';

const stimFileName = (name) => `media/audio/stims/${name}`;

const roomKindEntries = manifestJson['room-kinds'];

export const roomKinds = [...new Set(roomKindEntries.map((entry) => entry.kind))];

export const getStimsForRoomKind = (kind) => {
    const entry = roomKindEntries.find((entry) => entry.kind === kind);
    if (!entry) {
        throw new Error(`Could not find room kind ${kind}`);
    }
    return entry.stims.map(stimFileName);
};

export const getLabelForRoomKind = (kind) => {
    const entry = roomKindEntries.find((entry) => entry.kind === kind);
    if (!entry) {
        throw new Error(`Could not find room kind ${kind}`);
    }
    return entry.label;
};

export const getAnyStimFilename = () => {
    return stimFileName(roomKindEntries[0].stims[0]);
};
