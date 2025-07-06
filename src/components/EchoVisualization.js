import React from 'react';

const EchoVisualization = (props) => {
    const { children } = props;
    return (
        <div className="echo-visualization">
            <div className="stage">{children}</div>
        </div>
    );
};

export default EchoVisualization;
