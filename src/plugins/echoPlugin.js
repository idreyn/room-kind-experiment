import React from 'react';

import EchoTrial from '../components/EchoTrial';
import ProgressIndicator from '../components/ProgressIndicator';
import { getDataEntryForTrial } from '../trials';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'echo-presentation',
    key: 'echo-presentation',
    render: ({ data: { presentation, progress }, onFinish }) => (
        <>
            <ProgressIndicator progress={progress} />
            <EchoTrial
                presentation={presentation}
                onFinish={({ response, responseDelay }) => {
                    const dataEntry = getDataEntryForTrial(presentation, response, responseDelay);
                    console.log(dataEntry);
                    onFinish(dataEntry);
                }}
                key={Date.now()}
            />
        </>
    ),
});
