/**
 * @title Echo experiment
 * @description Presents echo stimuli
 * @version 0.1
 *
 * The following lines specify which media directories will be packaged and preloaded by jsPsych.
 * Modify them to arbitrary paths (or comma-separated lists of paths) within the `media` directory,
 * or delete them.
 * @imageDir images
 * @audioDir audio
 * @videoDir video
 */
/* global jsPsych */
import '../styles/main.scss';

import 'jspsych/plugins/jspsych-html-keyboard-response';
import 'jspsych/plugins/jspsych-fullscreen';

import './plugins/blockBookendPlugin';
import './plugins/echoPlugin';
import './plugins/headphoneBackwardsCheckPlugin';
import './plugins/headphoneCheckPlugin';
import './plugins/keysetSelectPlugin';
import './plugins/pavloviaPlugin';
import './plugins/trainingPlugin';
import './plugins/consentFormPlugin';

import { createTrialBlocks, getAudioFilesForTrialBlocks } from './trials';
import { render } from './render';

import DeviceIneligible from './components/DeviceIneligible';
import { trainingFiles } from './components/TrainingSteps';

import { headphoneCheckFiles } from './headphoneCheck';
import { getCompletionUrl, getProlificIds } from './prolific';
import { getUrlParam } from './util';
import { getDeviceEligibility } from './device';
import { isTiny } from './params';

const isPavlovia = window.location.hostname.includes('pavlovia.org');
const isLocalhost = window.location.hostname.includes('localhost');

if (!(isLocalhost || isPavlovia)) {
    throw new Error('Cannot detect environment');
}

const { prolificPid } = getProlificIds();
const trialBlocks = createTrialBlocks();

export const preload_audio = [
    ...getAudioFilesForTrialBlocks(trialBlocks),
    ...trainingFiles,
    ...headphoneCheckFiles,
];

const { isIneligible, ...deviceProblems } = getDeviceEligibility();

export function createTimeline() {
    let timeline = [];

    if (!getUrlParam('skipTraining')) {
        if (!getUrlParam('skipToTraining')) {
            if (isIneligible) {
                timeline.push({
                    type: 'html-keyboard-response',
                    choices: jsPsych.NO_KEYS,
                    stimulus: render(DeviceIneligible, { deviceProblems }),
                });
            }

            if (isPavlovia) {
                timeline.push({
                    type: 'pavlovia',
                    command: 'init',
                    participantId: prolificPid,
                });
            }

            // timeline.push({
            //     type: 'html-keyboard-response',
            //     stimulus: render(WelcomeScreen),
            // });

            // timeline.push({
            //     type: 'consent-form',
            // });

            timeline.push({
                type: 'keyset-select',
            });

            // timeline.push({
            //     type: 'headphone-check',
            // });

            // timeline.push({
            //     type: 'headphone-backwards-check',
            // });
        }

        timeline.push({
            type: 'training',
        });
    }

    trialBlocks.forEach((block, blockIndex, { length: blockCount }) => {
        const blockNumber = blockIndex + 1;
        timeline.push({
            type: 'block-bookend',
            blockNumber,
            blockCount,
        });
        block.presentations.forEach((presentation, trialIndex, { length: trialCount }) => {
            timeline.push({
                type: 'echo-presentation',
                presentation: presentation,
                progress: {
                    blockNumber,
                    blockCount,
                    trialCount,
                    trialNumber: trialIndex + 1,
                },
            });
        });
        timeline.push({
            type: 'block-bookend',
            isEnd: true,
            blockNumber,
            blockCount,
        });
    });

    if (isPavlovia) {
        timeline.push({
            type: 'pavlovia',
            command: 'finish',
            participantId: prolificPid,
            onComplete: () => {
                if (isPavlovia && !isTiny) {
                    window.location.href = getCompletionUrl();
                }
            },
        });
    }

    return timeline;
}
