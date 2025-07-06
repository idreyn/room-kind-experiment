/* global jsPsych */
import { queryManifestEntries } from './manifest';
import { getProlificIds } from './prolific';
import { ROOM_TYPE_REPEATS_PER_BLOCK, VERSION, NUMBER_OF_BLOCKS, isTiny } from './params';
import { range } from './util';
import { roomKinds, getStimsForRoomKind } from './manifest';

const maybeMakeTiny = (items) => {
    if (isTiny) {
        return items.slice(0, 3);
    }
    return items;
};

export const createPresentationWithChoices = (params, choices) => {
    return {
        choices,
        ...queryManifestEntries(params),
    };
};

jsPsych.data.addProperties({
    ...getProlificIds(),
    userAgent: navigator.userAgent,
    version: VERSION,
});

export const createTrialBlocks = () => {
    return range(1, NUMBER_OF_BLOCKS).map(() => {
        const presentationsInOrder = roomKinds
            .map((kind) => {
                const stims = jsPsych.randomization.sampleWithoutReplacement(
                    getStimsForRoomKind(kind),
                    ROOM_TYPE_REPEATS_PER_BLOCK
                );
                return stims.map((stim) => ({
                    kind,
                    filename: stim,
                    choices: jsPsych.randomization.shuffle(roomKinds),
                }));
            })
            .flat();

        const presentations = maybeMakeTiny(jsPsych.randomization.shuffle(presentationsInOrder));
        return { presentations };
    });
};

export const getAudioFilesForTrialBlocks = (trialBlocks) =>
    new Set(trialBlocks.map((block) => block.presentations.map((pres) => pres.filename)).flat());

export const getDataEntryForTrial = (presentation, response, responseDelay) => {
    return {
        ...presentation,
        response,
        responseDelay,
    };
};
