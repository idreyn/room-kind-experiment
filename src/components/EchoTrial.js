import React, { useEffect, useRef, useState } from 'react';

import { getLabelForRoomKind } from '../manifest';
import { getChosenKeyset } from '../keyset';

import EchoPresentation from './EchoPresentation';
import EchoVisualization from './EchoVisualization';
import { ChoiceKeyset, KeyboardTrigger } from './KeyboardResponse';

const EchoTrial = ({ presentation, onFinish, prefix = null, timeoutAfterMs = null }) => {
    const { responseKeys, triggerKey } = getChosenKeyset();
    const timeoutRef = useRef(null);
    const [presentationState, setPresentationState] = useState('waiting');
    const [alreadyChosenResponse, setAlreadyChosenResponse] = useState(null);
    const [playStartTime, setPlayStartTime] = useState(null);
    const { choices } = presentation;

    useEffect(() => {
        if (presentationState === 'playing') {
            setPlayStartTime(Date.now());
            if (typeof timeoutAfterMs === 'number') {
                timeoutRef.current = setTimeout(
                    () => onFinish({ timedOut: 'true' }),
                    timeoutAfterMs
                );
            }
        }
    }, [presentationState]);

    const handleResponseByLabel = (response) => {
        if (alreadyChosenResponse) {
            return;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const responseDelay = Date.now() - playStartTime;
        setAlreadyChosenResponse(response);
        setTimeout(() => onFinish({ response, responseDelay }), 500);
    };

    const renderResponseKeyset = () => {
        return (
            <div className="text-content">
                <p>What kind of room is this echo from?</p>
                <ChoiceKeyset
                    triggers={responseKeys}
                    choices={choices}
                    labels={choices.map((choice) => getLabelForRoomKind(choice))}
                    onSelect={handleResponseByLabel}
                />
            </div>
        );
    };

    if (presentationState === 'played') {
        return <EchoVisualization>{renderResponseKeyset()}</EchoVisualization>;
    }

    if (presentationState === 'playing') {
        return (
            <EchoPresentation
                showPulseAnimation={false}
                presentation={presentation}
                onFinish={() => setPresentationState('played')}
            />
        );
    }

    return (
        <EchoVisualization>
            <span>
                {prefix}Press the{' '}
                <KeyboardTrigger
                    trigger={triggerKey}
                    handler={() => setPresentationState('playing')}
                />{' '}
                key to play.
            </span>
        </EchoVisualization>
    );
};

export default EchoTrial;
