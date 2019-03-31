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
            // left column front
            0, 0, 0,
            0, 150, 0,
            30, 0, 0,
            0, 150, 0,
            30, 150, 0,
            30, 0, 0,

            // top rung front
            30, 0, 0,
            30, 30, 0,
            100, 0, 0,
            30, 30, 0,
            100, 30, 0,
            100, 0, 0,

            // middle rung front
            30, 60, 0,
            30, 90, 0,
            67, 60, 0,
            30, 90, 0,
            67, 90, 0,
            67, 60, 0,

            // left column back
            0, 0, 30,
            30, 0, 30,
            0, 150, 30,
            0, 150, 30,
            30, 0, 30,
            30, 150, 30,

            // top rung back
            30, 0, 30,
            100, 0, 30,
            30, 30, 30,
            30, 30, 30,
            100, 0, 30,
            100, 30, 30,

            // middle rung back
            30, 60, 30,
            67, 60, 30,
            30, 90, 30,
            30, 90, 30,
            67, 60, 30,
            67, 90, 30,

            // top
            0, 0, 0,
            100, 0, 0,
            100, 0, 30,
            0, 0, 0,
            100, 0, 30,
            0, 0, 30,

            // top rung right
            100, 0, 0,
            100, 30, 0,
            100, 30, 30,
            100, 0, 0,
            100, 30, 30,
            100, 0, 30,

            // under top rung
            30, 30, 0,
            30, 30, 30,
            100, 30, 30,
            30, 30, 0,
            100, 30, 30,
            100, 30, 0,

            // between top rung and middle
            30, 30, 0,
            30, 60, 30,
            30, 30, 30,
            30, 30, 0,
            30, 60, 0,
            30, 60, 30,

            // top of middle rung
            30, 60, 0,
            67, 60, 30,
            30, 60, 30,
            30, 60, 0,
            67, 60, 0,
            67, 60, 30,

            // right of middle rung
            67, 60, 0,
            67, 90, 30,
            67, 60, 30,
            67, 60, 0,
            67, 90, 0,
            67, 90, 30,

            // bottom of middle rung.
            30, 90, 0,
            30, 90, 30,
            67, 90, 30,
            30, 90, 0,
            67, 90, 30,
            67, 90, 0,

            // right of bottom
            30, 90, 0,
            30, 150, 30,
            30, 90, 30,
            30, 90, 0,
            30, 150, 0,
            30, 150, 30,

            // bottom
            0, 150, 0,
            0, 150, 30,
            30, 150, 30,
            0, 150, 0,
            30, 150, 30,
            30, 150, 0,

            // left side
            0, 0, 0,
            0, 0, 30,
            0, 150, 30,
            0, 0, 0,
            0, 150, 30,
            0, 150, 0]),
        gl.STATIC_DRAW);
}

function setColors(gl: WebGLRenderingContext) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
            // left column front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // top rung front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // middle rung front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // left column back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // middle rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,

            // top rung right
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,

            // under top rung
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,

            // between top rung and middle
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,

            // top of middle rung
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,

            // right of middle rung
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,

            // bottom of middle rung.
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,

            // right of bottom
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,

            // bottom
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,

            // left side
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220]),
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
    const colorLocation = gl.getAttribLocation(program, "a_color");

    // lookup the uniform locations
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // 1. create a buffer to put the positions
    // 2. bind it to the ARRAY_BUFFER
    // 3. put the geometry into the buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // 1. create a buffer to put the colors
    // 2. bind it to the ARRAY_BUFFER
    // 3. put the it into the buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl);

    const drawScene = function drawScene(matrix: TMatrix4) {
        // set the viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // turn on culling so that backfacing triangles
        // will be culled
        gl.enable(gl.CULL_FACE);

        // enable depth test
        gl.enable(gl.DEPTH_TEST);

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

        // turn on the color attribute
        gl.enableVertexAttribArray(colorLocation)

        // bind the color buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        // tell the attribute how to get data out of the 
        (() => {
            const size = 3;
            const type = gl.UNSIGNED_BYTE;
            const normalize = true;
            const stride = 0;
            const offset = 0;
            gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);
        })()

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
            const count = 96;
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