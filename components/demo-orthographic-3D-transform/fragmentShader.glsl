precision mediump float;

uniform vec4 u_color;

// passed in from the vertex shader
varying vec4 v_color;

void main() {
    gl_FragColor = v_color;
}