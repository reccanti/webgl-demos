import React from 'react';
import Highlight from 'react-highlight.js';
import Grid, { Column } from '../common/grid';
import ResponsiveCanvas from '../common/responsive-canvas';
import makeDemo from './makeDemo';
import vertexShaderSource from 'raw-loader!./vertexShader.glsl'
import fragmentShaderSource from 'raw-loader!./fragmentShader.glsl'
import makeDemoText from '!!raw-loader!./makeDemo.js'

class BasicTriangle extends React.Component {
    canvas

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const context = this.canvas.getContext("webgl");
        makeDemo(this.canvas, context);
    }

    render() {
        return (
            <Grid columns={8} autoRow="90vh">
                <Column columnSpan={8}>
                    <ResponsiveCanvas getCanvas={canvas => this.canvas = canvas} />
                </Column>
                <Column columnSpan={8}>
                    <Grid columns={8} backgroundColor="gray">
                        <Column columnSpan={3}>
                            <section className="padding-2 margin-2 margin-1-between background-color-white">
                                <h2 className="margin-0 font-inconsolata">Basic Triangle</h2>
                                <p className=" margin-0 font-lato">
                                    This is the minimum amount of code needed to render a triangle in WebGL, based on the demo from <a href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html">WebGL Fundamentals</a>.
                                </p>
                            </section>
                        </Column>
                        <Column columnSpan={5}>
                            <section className="padding-2 margin-2 margin-1-between background-color-white">
                                <h2 className="margin-0 font-inconsolata">vertexShader.glsl</h2>
                                <Highlight language="glsl">
                                    {vertexShaderSource}
                                </Highlight>
                                <h2 className="margin-0 font-inconsolata">fragmentShader.glsl</h2>
                                <Highlight language="glsl">
                                    {fragmentShaderSource}
                                </Highlight>
                                <h2 className="margin-0 font-inconsolata">makeDemo.js</h2>
                                <Highlight language="javascript">
                                    {makeDemoText}
                                </Highlight>
                            </section>
                        </Column>
                    </Grid>
                </Column>
            </Grid >
        )
    }
}

export default BasicTriangle;