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

export default function makeDemo(_canvas: HTMLCanvasElement, _gl: WebGLRenderingContext) {
    return {
        drawScene: () => { console.log("drawing") }
    }
}