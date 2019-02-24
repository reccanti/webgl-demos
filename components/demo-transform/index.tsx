import React from 'react';
import Title from "../common/title";
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
import ResponsiveCanvas from '../common/responsive-canvas';
// import makeDemo from './makeDemo';

type Props = {}

class BasicTriangle extends React.Component<Props> {
    canvas: HTMLCanvasElement | null

    constructor(props: Props) {
        super(props);
        this.canvas = null;
    }

    componentDidMount() {
        if (!this.canvas) {
            return;
        }
        const context = this.canvas.getContext("webgl");
        // makeDemo(this.canvas, context);
    }

    render() {
        return (
            <DemoGrid>
                <DemoArea>
                    <ResponsiveCanvas getCanvas={(canvas: HTMLCanvasElement) => this.canvas = canvas} />
                </DemoArea>
                <TitleArea><Title>Matrix Transforms</Title></TitleArea>
            </DemoGrid>
        )
    }
}

export default BasicTriangle;