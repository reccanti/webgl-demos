import vertexShaderSource from 'raw-loader!./vertexShader.glsl';
import fragmentShaderSource from 'raw-loader!./fragmentShader.glsl';
import Matrix4, { TMatrix4 } from '../common/matrix4';

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
function setGeometry(gl: WebGLRenderingContext) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left column
            0, 0, 0,
            30, 0, 0,
            0, 150, 0,
            0, 150, 0,
            30, 0, 0,
            30, 150, 0,

            // top rung
            30, 0, 0,
            100, 0, 0,
            30, 30, 0,
            30, 30, 0,
            100, 0, 0,
            100, 30, 0,

            // middle rung
            30, 60, 0,
            67, 60, 0,
            30, 90, 0,
            30, 90, 0,
            67, 60, 0,
            67, 90, 0]),
        gl.STATIC_DRAW);
}

type DemoAPI = {
    drawScene: (matrix: TMatrix4) => void
}

const defaultDemoAPI = {
    drawScene() { }
}

export default function makeDemo(canvas: HTMLCanvasElement): DemoAPI {

    // create webgl rendering context
    const gl = canvas.getContext("webgl");
    if (!gl) {
        return defaultDemoAPI;
    }

    // set the size of the canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // setup the GLSL program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!(vertexShader && fragmentShader)) {
        return defaultDemoAPI;
    }
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
        return defaultDemoAPI;
    }

    // lookup where the vertex information needs to go
    const positionLocation = gl.getAttribLocation(program, "a_position");

    // lookup the uniform locations
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");
    const colorLocation = gl.getUniformLocation(program, "u_color");

    // 1. create a buffer to put the positions
    // 2. bind it to the ARRAY_BUFFER
    // 3. put the geometry into the buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // create a random color
    const color = [Math.random(), Math.random(), Math.random(), 1]

    const drawScene = function drawScene(matrix: TMatrix4) {
        // set the viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        // tell the program to use the shader
        gl.useProgram(program);

        // turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // bind the position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // tell the attribute how to get data out of the position buffer
        (() => {
            const size = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
        })()

        // set the color
        gl.uniform4fv(colorLocation, color);

        // normalize and set the matrix
        const normalizedMatrix = Matrix4.compose([
            matrix,
            Matrix4.identity(),
            Matrix4.scale(2 / canvas.width, -2 / canvas.height, 2 / 4000),
            Matrix4.translate(-1, 1, 0)
        ])
        gl.uniformMatrix4fv(matrixLocation, false, normalizedMatrix);

        // Draw the geometry
        (() => {
            const primitiveType = gl.TRIANGLES;
            const offset = 0;
            const count = 18;
            gl.drawArrays(primitiveType, offset, count);
        })()

    }

    // draw the initial scene
    drawScene(Matrix4.compose([
        Matrix4.identity()
    ]));

    // return the API
    return {
        drawScene
    }

}