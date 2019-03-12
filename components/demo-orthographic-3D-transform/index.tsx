/**
 * Demo for Orthographic 3D in WebGL built using
 * the ValueContext component
 */
import React, { ChangeEvent } from "react";
import ResponsiveCanvasInitializer from "../common/responsiveCanvasInitializer";
import makeValueContext from "../common/valueContext";

type ColorSetterAPI = {
    setColor: (color: string) => void,
    drawRectangle: () => void
}
type ColorUpdateProps = {
    updateColor: (color: string) => void
}

function initializer(api: ColorSetterAPI) {
    return {
        updateColor: function updateColor(color: string) {
            api.setColor(color);
            api.drawRectangle();
        }
    }
}

const {
    withValueContextProvider,
    withValueContextContainer,
    withValueContextInitializer
} = makeValueContext<ColorSetterAPI, ColorUpdateProps>(initializer, {
    updateColor() { }
})

function makeDemo(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (context) {
        context.canvas.width = canvas.clientWidth;
        context.canvas.height = canvas.clientHeight;

        // default color. This can be set
        let color = 'black';

        // our API for setting and updating the canvas
        const setColor = (newColor: string) => {
            color = newColor;
        }
        const drawRectangle = () => {
            context.fillStyle = color;
            context.fillRect(20, 10, 150, 100);
        }

        drawRectangle();

        return {
            setColor,
            drawRectangle
        }

    }
    return {
        setColor() { },
        drawRectangle() { }
    }
}

const Canvas = withValueContextInitializer(ResponsiveCanvasInitializer);

const Orthograpic3DTransformDemo = React.memo((props: ColorUpdateProps) => {

    function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
        props.updateColor(String(event.target.value));
    }

    return (
        <React.Fragment>
            <input type="text" name="testing" onChange={handleUpdate} />
            <Canvas makeCanvasAPI={makeDemo} />
        </React.Fragment>
    )
})

export default withValueContextProvider(withValueContextContainer(Orthograpic3DTransformDemo));