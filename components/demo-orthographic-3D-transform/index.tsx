/**
 * Demo for Orthographic 3D in WebGL built using
 * the ValueContext component
 */
import React from "react";
import ResponsiveCanvasInitializer from "../common/responsiveCanvasInitializer";
import makeValueContext from "../common/valueContext";
import { DemoGrid, DemoArea, ControlsArea, TitleArea } from "../common/demo-grid";
import { Controls, Slider } from '../common/demo-controls';
import Title from '../common/title';
import Matrix4, { TMatrix4 } from '../common/matrix4';
import makeDemo from "./makeDemo";

type DemoAPI = {
    drawScene: (matrix: TMatrix4) => void
}
type DemoUpdateProps = {
    drawScene: (matrix4: TMatrix4) => void
}

function initializer({ drawScene }: DemoAPI) {
    return {
        drawScene
    }
}

const {
    withValueContextProvider,
    withValueContextContainer,
    withValueContextInitializer
} = makeValueContext(initializer, {
    drawScene() { }
})

const Canvas = withValueContextInitializer(ResponsiveCanvasInitializer);

class Orthograpic3DTransformDemo extends React.Component<DemoUpdateProps> {

    state = {
        scaleX: 1.5,
        scaleY: 1.5,
        scaleZ: 1.5,
        rotateX: Math.PI / 4,
        rotateY: Math.PI / 4,
        rotateZ: Math.PI / 4,
        translateX: 100,
        translateY: 100,
        translateZ: 100
    }

    componentDidUpdate() {
        const scaleMatrix = Matrix4.scale(this.state.scaleX, this.state.scaleY, this.state.scaleZ);
        const rotateMatrix = Matrix4.compose([
            Matrix4.identity(),
            Matrix4.rotateX(this.state.rotateX),
            Matrix4.rotateY(this.state.rotateY),
            Matrix4.rotateZ(this.state.rotateZ)
        ]);
        const translateMatrix = Matrix4.translate(this.state.translateX, this.state.translateY, this.state.translateZ)
        const matrix = Matrix4.compose([scaleMatrix, rotateMatrix, translateMatrix])
        this.props.drawScene(matrix);
    }

    handleScaleX = (value: number) => {
        this.setState({
            scaleX: value
        })
    }

    handleScaleY = (value: number) => {
        this.setState({
            scaleY: value
        })
    }

    handleScaleZ = (value: number) => {
        this.setState({
            scaleZ: value
        })
    }
    handleTranslateX = (value: number) => {
        this.setState({
            translateX: value
        })
    }

    handleTranslateY = (value: number) => {
        this.setState({
            translateY: value
        })
    }

    handleTranslateZ = (value: number) => {
        this.setState({
            translateZ: value
        })
    }

    handleRotateX = (value: number) => {
        this.setState({
            rotateX: value
        })
    }


    handleRotateY = (value: number) => {
        this.setState({
            rotateY: value
        })
    }

    handleRotateZ = (value: number) => {
        this.setState({
            rotateZ: value
        })
    }

    render() {
        return (
            <DemoGrid>
                <ControlsArea>
                    <Controls>
                        <Slider name="scaleX" min={-10} max={10} step={0.1} onChange={this.handleScaleX}>Scale X</Slider>
                        <Slider name="scaleY" min={-10} max={10} step={0.1} onChange={this.handleScaleY}>Scale Y</Slider>
                        <Slider name="scaleZ" min={-10} max={10} step={0.1} onChange={this.handleScaleZ}>Scale Z</Slider>
                        <Slider name="rotateX" min={-2 * Math.PI} max={2 * Math.PI} step={0.01} onChange={this.handleRotateX}>Rotate X</Slider>
                        <Slider name="rotateY" min={-2 * Math.PI} max={2 * Math.PI} step={0.01} onChange={this.handleRotateY}>Rotate Y</Slider>
                        <Slider name="rotateZ" min={-2 * Math.PI} max={2 * Math.PI} step={0.01} onChange={this.handleRotateZ}>Rotate Z</Slider>
                        <Slider name="translateX" min={0} max={500} step={1} onChange={this.handleTranslateX}>Translate X</Slider>
                        <Slider name="translateY" min={0} max={500} step={1} onChange={this.handleTranslateY}>Translate Y</Slider>
                        <Slider name="translateZ" min={0} max={500} step={1} onChange={this.handleTranslateZ}>Translate Z</Slider>
                    </Controls>
                </ControlsArea>
                <TitleArea><Title>Orthographic 3D Transforms</Title></TitleArea>
                <DemoArea>
                    <Canvas makeCanvasAPI={makeDemo} />
                </DemoArea>
            </DemoGrid>
        )
    }
}

export default withValueContextProvider(withValueContextContainer(Orthograpic3DTransformDemo));