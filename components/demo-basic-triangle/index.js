import React from 'react';
import ResponsiveCanvas from '../common/responsive-canvas';
import makeDemo from './makeDemo';

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
            <React.Fragment>
                <ResponsiveCanvas getCanvas={canvas => this.canvas = canvas} />
                <div>
                    This is the minimum amount of code needed to render a triangle in WebGL, based on the demo from <a href="https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html">WebGL Fundamentals</a>.
                </div>
            </React.Fragment>
        )
    }
}

export default BasicTriangle;