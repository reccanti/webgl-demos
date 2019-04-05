/**
 * This component does the following
 * 1. Creates a ResponsiveCanvas element and extracts its inner HTML Canvas
 * 2. Initializes the demo that was passed down as a prop and
 * 3. Passes the initialized ResponsiveCanvas and the demo API through a render prop
 */
import React from "react";
import ResponsiveCanvas from "./responsive-canvas";

type Props<DemoAPI> = {
    makeDemo: (canvas: HTMLCanvasElement) => DemoAPI,
    initialAPI: DemoAPI,
    children: (api: DemoAPI & {
        canvasInstance: React.ReactNode
    }) => React.ReactNode
}

type State<DemoAPI> = {
    api: DemoAPI
}

export default class CanvasWithDemo<DemoAPI> extends React.Component<Props<DemoAPI>, State<DemoAPI>> {

    /**
     * Create a canvas instance that we will pass down and use to set the API
     */
    getCanvasDemoAPI = (canvas: HTMLCanvasElement) => {
        this.setState({
            api: this.props.makeDemo(canvas)
        })
    }
    canvasInstance = <ResponsiveCanvas getCanvas={this.getCanvasDemoAPI} />

    state = {
        api: this.props.initialAPI
    }

    render() {
        return (
            <>
                {this.props.children({ canvasInstance: this.canvasInstance, ...this.state.api })}
            </>
        )
    }
}