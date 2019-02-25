import React from 'react';
import Title from "../common/title";
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
import { Controls, Slider } from '../common/demo-controls';
import ResponsiveCanvas from '../common/responsive-canvas';
import { init, drawScene } from './makeDemo';

type Props = {}

class MatrixTransform extends React.Component<Props> {
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
        if (!context) {
            return;
        }
        init(this.canvas, context);
    }

    render() {
        return (
            <DemoGrid>
                <ControlsArea>
                    <Controls>
                        <Slider name="translateX" min={0} max={100} onChange={() => { }}>Translate X</Slider>
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

export default MatrixTransform;