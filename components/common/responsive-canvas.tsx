import React from "react";

type Props = {
    getCanvas: (canvas: HTMLCanvasElement) => void
}
export default class ResponsiveCanvas extends React.Component<Props> {
    canvasRef: React.RefObject<HTMLCanvasElement> | null = null

    state = {
        width: 300,
        height: 240
    }

    constructor(props: Props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.updateCanvasDimensions();
        if (this.canvasRef && this.canvasRef.current) {
            this.props.getCanvas(this.canvasRef.current);
        }
    }

    shouldComponentUpdate(nextProps: Props) {
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
        if (this.canvasRef && this.canvasRef.current) {
            this.setState({
                width: this.canvasRef.current.clientWidth,
                height: this.canvasRef.current.clientHeight
            });
        }
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
