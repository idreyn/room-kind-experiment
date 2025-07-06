import React, { useCallback, useState } from 'react';

import EchoVisualization from './EchoVisualization';
import { KeyboardResponse, ContinueKey } from './KeyboardResponse';
import EchoTrial from './EchoTrial';
import { getAnyStimFilename, roomKinds } from '../manifest';

export const trainingFiles = [];

const background = (next) => (
    <div className="text-content">
        <p>This task is about how you hear echoes.</p>
        <p>
            You will hear the echo of a loud sound projected into a room. Your task is to decide
            what kind of room you think the echo is coming from.
        </p>
        <p>Let's try it out.</p>
        <p>
            <KeyboardResponse delaySeconds={0}>
                <ContinueKey handler={next} />
            </KeyboardResponse>
        </p>
    </div>
);

const sampleTrial = (next) => (
    <EchoTrial
        presentation={{
            choices: roomKinds,
            kind: 'test',
            filename: getAnyStimFilename(),
        }}
        onFinish={next}
    />
);

const readyToBegin = (next) => (
    <div className="text-content">
        <p>Nice job. You're ready to begin.</p>
        <p>
            <ContinueKey handler={next} />
        </p>
    </div>
);

const steps = [background, sampleTrial, readyToBegin];

const TrainingSteps = ({ onFinish }) => {
    const [stepIndex, setStepIndex] = useState(0);

    const next = useCallback(() => {
        if (stepIndex === steps.length - 1) {
            onFinish();
        } else {
            setStepIndex((i) => i + 1);
        }
    }, [stepIndex]);

    return steps[stepIndex](next);
};

export default TrainingSteps;
