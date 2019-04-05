/**
 * Demo for Orthographic 3D in WebGL built using
 * the ValueContext component
 */
import React, { ChangeEvent } from "react";
import CanvasWithDemo from "../common/demo-canvas";

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

const BasicDemoCanvas = React.memo(() => {
    return (
        <CanvasWithDemo
            initialAPI={{
                setColor() { },
                drawRectangle() { }
            }}
            makeDemo={makeDemo}
        >
            {({ canvasInstance, setColor, drawRectangle }) => {

                function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
                    setColor(String(event.target.value));
                    drawRectangle()
                }

                return (
                    <>
                        <input type="text" name="testing" onChange={handleUpdate} />
                        {canvasInstance}
                    </>
                )
            }
            }
        </CanvasWithDemo>
    )
})

export default BasicDemoCanvas;