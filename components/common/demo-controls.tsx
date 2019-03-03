import React, { ReactNode, SyntheticEvent, ChangeEvent } from "react";

type ControlsProps = {
    children?: ReactNode
}
export const Controls = (props: ControlsProps) => (
    <div className="margin-1 padding-1 text-align-right">
        {props.children}
    </div>
)

type SliderProps = {
    min: number,
    max: number,
    step?: number,
    name: string,
    onChange: (value: number) => void,
    children: ReactNode
}

type SliderState = {
    currentValue: number
}

export class Slider extends React.Component<SliderProps, SliderState> {
    static defaultProps = {
        step: 1
    }

    state = {
        currentValue: 0
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        this.setState({
            currentValue: value
        })
        this.props.onChange(value);
    }

    render() {
        return (
            <div className="font-openSans margin-half-between-horizontal" >
                <span>{this.state.currentValue}</span>
                <input name={this.props.name} value={this.state.currentValue} type="range" onChange={this.handleChange} min={this.props.min} max={this.props.max} step={this.props.step} />
                <label htmlFor={this.props.name}>{this.props.children}</label>
            </div>
        )
    }
}