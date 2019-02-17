webpackHotUpdate("static/development/pages/demo-01.js",{

/***/ "./demos/demo-01.js":
/*!**************************!*\
  !*** ./demos/demo-01.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");


function _templateObject2() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    precision mediump float;\n\n    void main() {\n        gl_FragColor = vec4(1, 0, 0.5, 1);\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    attribute vec4 a_position;\n\n    void main() {\n        gl_Position = a_position;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var glsl = function glsl(x) {
  return x;
};

var vertShaderSource = glsl(_templateObject());
var fragShaderSource = glsl(_templateObject2());

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertShader, fragShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

/* harmony default export */ __webpack_exports__["default"] = (function (canvas, gl) {
  // INITIALIZATION CODE 
  // create the program 
  var vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
  var fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
  var program = createProgram(gl, vertShader, fragShader); // get the location of attributes

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // create buffers

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // bind data to the buffer
  // prettier-ignore

  var positions = [0, 0, 0, 0.5, 0.7, 0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // RENDERING CODE
  // convert from clip-space to pixels

  console.log(canvas.clientWidth);
  gl.viewport(0, 0, canvas.width, canvas.height); // clear the canvas

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT); // use the program

  gl.useProgram(program); // turn on the attribute

  gl.enableVertexAttribArray(positionAttributeLocation); // tell the attribute how to get data out of the position buffer

  (function () {
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  })(); // draw the data in the buffer


  (function () {
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  })();
});

/***/ })

})
//# sourceMappingURL=demo-01.js.a5eb3f3c3ed1a381a189.hot-update.js.map