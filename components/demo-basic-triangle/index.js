import React from 'react';
import ResponsiveCanvas from '../common/responsive-canvas';
import makeDemo from './makeDemo';
const makeDemoText = require('!!raw-loader!./makeDemo.js');

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
            <div className="grid grid-col-8 grid-row-fill width-100 height-100">
                <div className="grid-col-1-9 grid-row-1-2">
                    <ResponsiveCanvas getCanvas={canvas => this.canvas = canvas} />
                </div>
                <div className="grid-col-4-9 grid-row-1-2 z-1000 overflow-scroll">
                    <div className="margin-1 ">
                        <p>
                            This is the minimum amount of code needed to render a triangle in WebGL, based on the demo from <a href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html">WebGL Fundamentals</a>.
                        </p>
                        <p>
                            <h2>Source</h2>
                            <pre>{makeDemoText}</pre>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicTriangle;