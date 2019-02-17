const glsl = x => x;

const vertShaderSource = glsl`
    attribute vec4 a_position;

    void main() {
        gl_Position = a_position;
    };
`;

const fragShaderSource = glsl`
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
    };
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertShader, fragShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export default function makeDemo(canvas, gl) {

    // INITIALIZATION CODE 

    // create the program 
    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
    const program = createProgram(gl, vertShader, fragShader);

    // get the location of attributes
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // bind data to the buffer
    // prettier-ignore
    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // RENDERING CODE

    // convert from clip-space to pixels
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // use the program
    gl.useProgram(program);

    // turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // tell the attribute how to get data out of the position buffer
    (() => {
        const size = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    })();

    // draw the data in the buffer
    (() => {
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 3;
        gl.drawArrays(primitiveType, offset, count);
    })()
}