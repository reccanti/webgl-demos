import React from 'react';
import Title from "../common/title";
import makeValueSetter from '../common/valueSetterHoc';
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
import { Controls, Slider } from '../common/demo-controls';
import ResponsiveCanvas from '../common/responsive-canvas';
import Matrix2, { TMatrix2 } from '../common/matrix2';
import makeDemo from './makeDemoRev';

/**
 * Create the ValueSetter for this component
 */
type Config = {
    canvas: HTMLCanvasElement,
    gl: WebGLRenderingContext
}
type Values = {
    drawScene: (transformMatrix: TMatrix2) => void
}
function initializeWebGL(config: Config) {
    return makeDemo(config.canvas, config.gl)
}
const ValueSetter = makeValueSetter<Config, Values>(
    initializeWebGL,
    {
        drawScene() { }
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
    drawScene: (transformMatrix: TMatrix2) => void
}
type State = {
    scaleX: number,
    scaleY: number,
    translateX: number,
    translateY: number,
    rotate: number
}
class MatrixTransform extends React.PureComponent<Props, State> {
    canvas: HTMLCanvasElement | null

    state = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        rotate: 0
    }

    constructor(props: Props) {
        super(props);
        this.canvas = null;
    }

    componentDidMount() {
        this.setupWebGL()
    }

    componentDidUpdate() {
        const scaleMatrix = Matrix2.scale(this.state.scaleX, this.state.scaleY);
        const translateMatrix = Matrix2.translate(this.state.translateX, this.state.translateY);
        const rotateMatrix = Matrix2.rotate(this.state.rotate);
        this.props.drawScene(Matrix2.compose([rotateMatrix, scaleMatrix, translateMatrix]))
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

    /**
     * Control Handlers
     */

    handleScaleX = (scaleX: number) => {
        this.setState({
            scaleX
        })
    }

    handleScaleY = (scaleY: number) => {
        this.setState({
            scaleY
        })
    }

    handleTranslateY = (translateY: number) => {
        this.setState({
            translateY
        })
    }

    handleTranslateX = (translateX: number) => {
        this.setState({
            translateX
        })
    }

    handleRotate = (angle: number) => {
        this.setState({
            rotate: angle
        })
    }

    render() {
        return (
            <DemoGrid>
                <ControlsArea>
                    <Controls>
                        <Slider name="scaleX" min={-10} max={10} step={0.1} onChange={this.handleScaleX}>Scale X</Slider>
                        <Slider name="scaleY" min={-10} max={10} step={0.1} onChange={this.handleScaleY}>Scale Y</Slider>
                        <Slider name="translateX" min={0} max={500} step={1} onChange={this.handleTranslateX}>Translate X</Slider>
                        <Slider name="translateY" min={0} max={500} step={1} onChange={this.handleTranslateY}>Translate Y</Slider>
                        <Slider name="translateY" min={-2 * Math.PI} max={2 * Math.PI} step={0.01} onChange={this.handleRotate}>Rotate</Slider>
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