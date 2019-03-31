/**
 * A component which takes the Responsive Canvas component
 * and uses its `canvas` to create a demo with an API. This
 * API can be passed "up" via the ValueContext components
 */

import React from "react";
import ResponsiveCanvas from './responsive-canvas';

type Props<Config> = {
    initialize?: (config: Config) => void,
    makeCanvasAPI: (canvas: HTMLCanvasElement) => Config
}

class ResponsiveCanvasInitializer<Config> extends React.PureComponent<Props<Config>> {

    canvas: HTMLCanvasElement | null = null;

    componentDidMount() {
        this.setupCanvas();
    }

    setupCanvas = () => {
        if (!this.canvas) {
            return;
        }
        const api = this.props.makeCanvasAPI(this.canvas);
        if (!this.props.initialize || !api) {
            return
        }
        this.props.initialize(api);
    }

    render() {
        return <ResponsiveCanvas getCanvas={(canvas: HTMLCanvasElement) => this.canvas = canvas} />
    }
}

export default ResponsiveCanvasInitializer;