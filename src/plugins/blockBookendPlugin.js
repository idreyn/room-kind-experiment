import React from 'react';

import BlockBookend from '../components/BlockBookend';

import { createReactPlugin } from './createReactPlugin';

createReactPlugin({
    name: 'block-bookend',
    key: 'block-bookend',
    render: ({ data: { isEnd, blockNumber, blockCount }, onFinish }) => (
        <BlockBookend
            isEnd={isEnd}
            blockNumber={blockNumber}
            blockCount={blockCount}
            onFinish={onFinish}
        />
    ),
});
