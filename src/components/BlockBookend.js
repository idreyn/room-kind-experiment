import React from 'react';

import { KeyboardTrigger, ContinueKey } from './KeyboardResponse';

const BlockBookendAfter = ({ blockNumber, blockCount, onFinish }) => {
    if (blockNumber === blockCount) {
        return (
            <div className="text-content">
                <p>
                    <b>
                        Finished block {blockNumber} of {blockCount}.
                    </b>{' '}
                    Nice work! Please do not close this browser tab yet.
                </p>
                <p>
                    <ContinueKey handler={onFinish} />
                </p>
            </div>
        );
    }
    const nextOrFinal = blockNumber + 1 === blockCount ? 'final' : 'next';
    return (
        <div className="text-content">
            <p>
                <b>
                    Finished block {blockNumber} of {blockCount}.
                </b>{' '}
                Nice work. Take a moment, and when you're ready, press{' '}
                <KeyboardTrigger trigger="enter" handler={onFinish} /> to continue to the{' '}
                {nextOrFinal} block.
            </p>
        </div>
    );
};

const BlockBookendBefore = ({ onFinish }) => {
    return (
        <>
            It's time to begin the next block. Press{' '}
            <KeyboardTrigger trigger="enter" handler={onFinish} /> to begin.
        </>
    );
};

const BlockBookend = (props) => {
    const { isEnd, ...restProps } = props;
    if (isEnd) {
        return <BlockBookendAfter {...restProps} />;
    }
    return <BlockBookendBefore {...restProps} />;
};

export default BlockBookend;
