import React from 'react';
import Highlight from 'react-highlight.js';
import ResponsiveCanvas from '../common/responsive-canvas';
import makeDemo from './makeDemo';
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
            <div className="grid grid-col-8 grid-row-90vh width-100 height-100">
                <div className="grid-col-1-9">
                    <ResponsiveCanvas getCanvas={canvas => this.canvas = canvas} />
                </div>
                <div className="grid-col-1-9">
                    <div className="grid grid-col-8 padding-1 background-color-gray">
                        <div className="grid-col-span-3">
                            <section className="padding-1 margin-1 background-color-white">
                                <h2 className="margin-0 font-inconsolata">Basic Triangle</h2>
                                <p className="font-lato">
                                    This is the minimum amount of code needed to render a triangle in WebGL, based on the demo from <a href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html">WebGL Fundamentals</a>.
                                </p>
                            </section>
                        </div>
                        <div className="grid-col-span-5">
                            <section className="padding-1 margin-1 background-color-white">
                                <h2 className="margin-0 font-inconsolata">makeDemo.js</h2>
                                <Highlight language="javascript">
                                    {makeDemoText}
                                </Highlight>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicTriangle;