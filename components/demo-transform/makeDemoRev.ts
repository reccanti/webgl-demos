import Matrix2, { TMatrix2 } from "../common/matrix2";
import vertexShaderSource from 'raw-loader!./vertexShader.glsl';
import fragmentShaderSource from 'raw-loader!./fragmentShader.glsl';

/**
 * A convenience function to create a shader from a plaintext source
 * @param gl the WebGL rendering context to use
 * @param type an enum indicating the type of shader, such as gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param source a raw glsl text string that defines the shader
 */
function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) {
        console.error("failed to create shader")
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}

/**
 * A convenience function to create a program out of a vertex shader and a fragment shader
 * @param gl the WebGL rendering context to use
 * @param vertShader a compiled vertex shader created by createShader
 * @param fragShader a compiled fragment shader created by createShader
 */
function createProgram(gl: WebGLRenderingContext, vertShader: WebGLShader, fragShader: WebGLShader) {
    const program = gl.createProgram();
    if (!program) {
        console.error("failed to create program");
        return null;
    }
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
}

/**
 * A convenience function that adds vertices to the ARRAY_BUFFER to draw
 * the letter "F"
 * @param gl the WebGL rendering context to use
 */
function setLetterGeometry(gl: WebGLRenderingContext) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // prettier-ignore
            // left column
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            // top rung
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            // bottom rung
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90
        ]), gl.STATIC_DRAW
    )
}

interface DemoAPI {
    drawScene: ((transformMatrix: TMatrix2) => void) | (() => void)
}

const defaultReturn: DemoAPI = {
    drawScene() { }
}

export default function makeDemo(canvas: HTMLCanvasElement, gl: WebGLRenderingContext): DemoAPI {

    // create the program
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!(vertShader && fragShader)) {
        return defaultReturn;
    }
    const program = createProgram(gl, vertShader, fragShader);
    if (!program) {
        return defaultReturn;
    }

    // get pointers to the attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const colorLocation = gl.getUniformLocation(program, "u_color");
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // create a position buffer and bind it to WebGL's ARRAY_BUFFER
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // set the canvas size and viewport
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // use the program
    gl.useProgram(program);

    // set the geometry and draw the scene with its initial state
    setLetterGeometry(gl);
    drawScene(Matrix2.identity());

    /**
     * A function which draws the scene based on 
     * a provided transformation matrix
     */
    function drawScene(transformMatrix: TMatrix2) {

        // clear the screen
        gl.clear(gl.COLOR_BUFFER_BIT);

        // turn on attributes
        gl.enableVertexAttribArray(positionLocation);

        // tell the attribute how to get data from the position buffer
        (() => {
            const size = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.vertexAttribPointer(
                positionLocation,
                size,
                type,
                normalize,
                stride,
                offset
            )
        })();

        // set uniforms
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
        gl.uniform4fv(colorLocation, new Float32Array([1, 0, 0.5, 1]));
        gl.uniformMatrix3fv(matrixLocation, false, new Float32Array(transformMatrix));

        // draw the geometry
        (() => {
            const primitiveType = gl.TRIANGLES;
            const offset = 0;
            const count = 18;
            gl.drawArrays(primitiveType, offset, count);
        })()
    }

    // Export the API to manipulate the demo
    return {
        drawScene
    }
}