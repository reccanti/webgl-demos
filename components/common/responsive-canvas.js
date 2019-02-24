import React from "react";

export default class ResponsiveCanvas extends React.Component {
    canvasRef

    state = {
        width: 300,
        height: 240
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.updateCanvasDimensions();
        this.props.getCanvas(this.canvasRef.current);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.getCanvas !== nextProps.getCanvas) {
            return true;
        } else {
            return false;
        }
    }

    componentDidUpdate() {
        this.updateCanvasDimensions();
    }

    /**
     * get the current styled dimensions of the canvas
     * so that they can be applied to the canvas element
     */
    updateCanvasDimensions = () => {
        this.setState({
            width: this.canvasRef.current.clientWidth,
            height: this.canvasRef.current.clientHeight
        });
    }

    render() {
        return (
            <React.Fragment>
                <canvas className="width-100vw height-100vh display-block" width={this.state.width} height={this.state.height} ref={this.canvasRef}>
                    Sorry, your browser does not support the canvas element.
                </canvas>
            </React.Fragment>)
    }
}
