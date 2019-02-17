webpackHotUpdate("static/development/pages/demos/01-basic-triangle.js",{

/***/ "./components/demo-basic-triangle/index.js":
/*!*************************************************!*\
  !*** ./components/demo-basic-triangle/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_responsive_canvas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/responsive-canvas */ "./components/common/responsive-canvas.js");
/* harmony import */ var _makeDemo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./makeDemo */ "./components/demo-basic-triangle/makeDemo.js");







var _jsxFileName = "/Users/benjaminwilcox/Projects/active/webgl-demos/components/demo-basic-triangle/index.js";




var makeDemoText = __webpack_require__(/*! !raw-loader!./makeDemo.js */ "./node_modules/raw-loader/index.js!./components/demo-basic-triangle/makeDemo.js");

var BasicTriangle =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(BasicTriangle, _React$Component);

  function BasicTriangle(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, BasicTriangle);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(BasicTriangle).call(this, props));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "canvas", void 0);

    _this.canvasRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(BasicTriangle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var context = this.canvas.getContext("webgl");
      console.log(_makeDemo__WEBPACK_IMPORTED_MODULE_9__["default"]);
      Object(_makeDemo__WEBPACK_IMPORTED_MODULE_9__["default"])(this.canvas, context);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_common_responsive_canvas__WEBPACK_IMPORTED_MODULE_8__["default"], {
        getCanvas: function getCanvas(canvas) {
          return _this2.canvas = canvas;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, "This is the minimum amount of code needed to render a triangle in WebGL, based on the demo from ", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
        href: "https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, "WebGL Fundamentals"), "."), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("pre", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        },
        __self: this
      }, makeDemoText)));
    }
  }]);

  return BasicTriangle;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (BasicTriangle);

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./components/demo-basic-triangle/makeDemo.js":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./components/demo-basic-triangle/makeDemo.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "const glsl = x => x;\n\nconst vertShaderSource = glsl`\n    attribute vec4 a_position;\n\n    void main() {\n        gl_Position = a_position;\n    }\n`;\n\nconst fragShaderSource = glsl`\n    precision mediump float;\n\n    void main() {\n        gl_FragColor = vec4(1, 0, 0.5, 1);\n    }\n`;\n\nfunction createShader(gl, type, source) {\n    const shader = gl.createShader(type);\n    gl.shaderSource(shader, source);\n    gl.compileShader(shader);\n    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\n    if (success) {\n        return shader;\n    }\n    console.error(gl.getShaderInfoLog(shader));\n    gl.deleteShader(shader);\n}\n\nfunction createProgram(gl, vertShader, fragShader) {\n    const program = gl.createProgram();\n    gl.attachShader(program, vertShader);\n    gl.attachShader(program, fragShader);\n    gl.linkProgram(program);\n    const success = gl.getProgramParameter(program, gl.LINK_STATUS);\n    if (success) {\n        return program;\n    }\n    console.error(gl.getProgramInfoLog(program));\n    gl.deleteProgram(program);\n}\n\nexport default function makeDemo(canvas, gl) {\n\n    console.log(gl);\n    console.log(canvas);\n    // INITIALIZATION CODE \n\n    // create the program \n    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);\n    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);\n    const program = createProgram(gl, vertShader, fragShader);\n\n    // get the location of attributes\n    const positionAttributeLocation = gl.getAttribLocation(program, \"a_position\");\n\n    // create buffers\n    const positionBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n\n    // bind data to the buffer\n    // prettier-ignore\n    const positions = [\n        0, 0,\n        0, 0.5,\n        0.7, 0\n    ];\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);\n\n    // RENDERING CODE\n\n    // convert from clip-space to pixels\n    canvas.width = canvas.clientWidth;\n    canvas.height = canvas.clientHeight;\n    gl.viewport(0, 0, canvas.width, canvas.height);\n\n    // clear the canvas\n    gl.clearColor(0, 0, 0, 0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n\n    // use the program\n    gl.useProgram(program);\n\n    // turn on the attribute\n    gl.enableVertexAttribArray(positionAttributeLocation);\n\n    // tell the attribute how to get data out of the position buffer\n    (() => {\n        const size = 2;\n        const type = gl.FLOAT;\n        const normalize = false;\n        const stride = 0;\n        const offset = 0;\n        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);\n    })();\n\n    // draw the data in the buffer\n    (() => {\n        const primitiveType = gl.TRIANGLES;\n        const offset = 0;\n        const count = 3;\n        gl.drawArrays(primitiveType, offset, count);\n    })()\n}"

/***/ })

})
//# sourceMappingURL=01-basic-triangle.js.13f44dccc26eabc2785e.hot-update.js.map