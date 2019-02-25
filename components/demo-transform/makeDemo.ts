import Matrix2, { TMatrix2 } from "../common/matrix2";
import vertexShaderSource from 'raw-loader!./vertexShader.glsl';
import fragmentShaderSource from 'raw-loader!./fragmentShader.glsl';

const state: {
    program: WebGLProgram | null,
    positionLocation: number | null,
    resolutionLocation: WebGLUniformLocation | null,
    colorLocation: WebGLUniformLocation | null,
    matrixLocation: WebGLUniformLocation | null,
    positionBuffer: WebGLBuffer | null
    translate: TMatrix2,
    scale: TMatrix2,
    rotate: TMatrix2
} = {
    program: null,
    positionLocation: null,
    resolutionLocation: null,
    colorLocation: null,
    matrixLocation: null,
    positionBuffer: null,
    translate: Matrix2.translate(1000, 1000),
    scale: Matrix2.scale(1, 1),
    rotate: Matrix2.rotate(0)
}

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

/**
 * A function which initializes the WebGL rendering environment
 * @param canvas The canvas element that this will be drawn on
 * @param gl the WebGL rendering context of that canvas
 */
export function init(canvas: HTMLCanvasElement, gl: WebGLRenderingContext) {

    // create the program
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!(vertShader && fragShader)) {
        return null;
    }
    state.program = createProgram(gl, vertShader, fragShader);
    if (!state.program) {
        return null;
    }

    // get the locations
    state.positionLocation = gl.getAttribLocation(state.program, "a_position");
    state.resolutionLocation = gl.getUniformLocation(state.program, "u_resolution");
    state.colorLocation = gl.getUniformLocation(state.program, "u_color");
    state.matrixLocation = gl.getUniformLocation(state.program, "u_matrix");

    // create a position buffer and bind it to WebGL's ARRAY_BUFFER
    state.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);

    // set the canvas size and viewport
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // use the program
    gl.useProgram(state.program);

    // set the geometry
    setLetterGeometry(gl);
    drawScene(gl);
}

/** 
 * a function which draws an element using the initialized WebGL context
 * @param gl the WebGL rendering context to draw to
 */
export function drawScene(gl: WebGLRenderingContext) {
    if (state.positionLocation === null) {
        console.error("positionLocation not set")
        return;
    }
    if (state.positionBuffer === null) {
        console.error("positionBuffer not set")
        return;
    }
    if (state.colorLocation === null) {
        console.error("colorLocation not set")
        return;
    }
    if (state.matrixLocation === null) {
        console.error("matrixLocation not set")
        return;
    }
    if (state.resolutionLocation == null) {
        console.error("resolutionLocation not set")
        return;
    }

    gl.useProgram(state.program);

    // clear the screen
    gl.clear(gl.COLOR_BUFFER_BIT);

    // turn on attributes
    gl.enableVertexAttribArray(state.positionLocation);

    // bind the position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);

    // tell the attribute how to get data out of the positionBuffer
    (() => {
        const size = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.vertexAttribPointer(
            state.positionLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );
    })();

    // set uniforms
    gl.uniform2f(state.resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform4fv(state.colorLocation, new Float32Array([1, 0, 0.5, 1.0]));

    // create matrix uniform
    const transformMatrix = Matrix2.compose([state.translate, state.scale, state.rotate]);
    console.log(transformMatrix);
    gl.uniformMatrix3fv(state.matrixLocation, false, new Float32Array(transformMatrix));

    // draw the geometry
    (() => {
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 18;
        gl.drawArrays(primitiveType, offset, count);
    })();
}