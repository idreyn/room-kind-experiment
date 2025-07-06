import React, { useEffect } from 'react';
import EchoVisualization from './EchoVisualization';

import { useAudio } from './hooks/useAudio';

const EchoPresentation = ({ description, presentation, onFinish }) => {
    const { playFile } = useAudio();

    useEffect(() => playFile(presentation.filename, onFinish), []);

    return <EchoVisualization>{description}</EchoVisualization>;
};

export default EchoPresentation;
