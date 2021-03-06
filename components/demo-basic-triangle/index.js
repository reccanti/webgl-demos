import React from 'react';
import Highlight from 'react-highlight.js';
import Title from "../common/title";
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
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
            <DemoGrid>
                <DemoArea>
                    <ResponsiveCanvas getCanvas={canvas => this.canvas = canvas} />
                </DemoArea>
                <TitleArea><Title>Basic Triangle</Title></TitleArea>
            </DemoGrid>
        )
    }
}

export default BasicTriangle;