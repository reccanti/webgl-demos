import React from 'react';
import Title from "../common/title";
import makeValueSetter from '../common/valueSetterHoc';
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
import { Controls, Slider } from '../common/demo-controls';
import ResponsiveCanvas from '../common/responsive-canvas';
import makeDemo from './makeDemoRev';

/**
 * Create the ValueSetter for this component
 */
type Config = {
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext
}
type Values = {
    drawScene: () => void
}
function initializeWebGL(config: Config) {
    return makeDemo(config.canvas, config.gl)
}
const ValueSetter = makeValueSetter<Config, Values>(
    initializeWebGL,
    {
        drawScene: () => { }
    }
)

/**
 * A container that transforms values from the ValueSetter
 * into props for the MatrixTransform demo component
 */
const MatrixTransformContainer = () => {
    return (
        <ValueSetter>
            {({ init, drawScene }) => {

                function handleWebGLMount(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {
                    init({ canvas, gl })
                }

                return <MatrixTransform onWebGLMount={handleWebGLMount} drawScene={drawScene} />
            }}
        </ValueSetter>
    )
}

/**
 * A presentation component describing a demo where a user can
 * manipulate a transformational component
 */
type Props = {
    onWebGLMount: (canvas: HTMLCanvasElement, gl: WebGLRenderingContext) => void,
    drawScene: () => void
}
class MatrixTransform extends React.Component<Props> {
    canvas: HTMLCanvasElement | null

    constructor(props: Props) {
        super(props);
        this.canvas = null;
    }

    /**
     * Function to setup WebGL
     */
    setupWebGL = () => {
        if (!this.canvas) {
            return;
        }
        const context = this.canvas.getContext("webgl");
        if (!context) {
            return;
        }
        this.props.onWebGLMount(this.canvas, context);
    }

    componentDidMount() {
        this.setupWebGL()
    }

    render() {
        return (
            <DemoGrid>
                <ControlsArea>
                    <Controls>
                        <Slider name="translateX" min={0} max={100} onChange={() => { this.props.drawScene() }}>Translate X</Slider>
                    </Controls>
                </ControlsArea>
                <TitleArea><Title>Matrix Transforms</Title></TitleArea>
                <DemoArea>
                    <ResponsiveCanvas getCanvas={(canvas: HTMLCanvasElement) => this.canvas = canvas} />
                </DemoArea>
            </DemoGrid>

        )
    }
}

export default MatrixTransformContainer;