import React from 'react';
import makeDemo from '../demos/demo-01';

class Demo01 extends React.Component {
    canvasRef

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext("webgl");
        makeDemo(canvas, context);
    }

    render() {
        return (
            <body>
                <canvas ref={this.canvasRef}></canvas>
                <style jsx>{`
                * {
                    margin: 0;
                }
                body, html {
                    width: 100vw;
                    height: 100vh;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
            </body>
        )
    }
}

export default Demo01;