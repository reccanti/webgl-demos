/**
 * A higher-order component used to store arbitrary values that can
 * be set in a child component. Useful for something like a canvas
 * that requires initialization, but may need to be updated by a 
 * component at the same level or higher
 */
import * as React from 'react';

type InitFunction<Config> = (config: Config) => void;
type Props<Config, Value> = {
    children: (values: Value & { init: InitFunction<Config> }) => React.ReactNode
}
type State<Value> = Value

export default function makeValueSetter<Config, Value>(initializer: (config: Config) => Value, initialValue: Value): React.ComponentClass<Props<Config, Value>, State<Value>> {

    return class ValueSetter extends React.Component<Props<Config, Value>, State<Value>> {

        state = {
            ...initialValue
        }

        init = (config: Config) => {
            this.setState({
                ...initializer(config)
            });
        }

        render() {
            return (
                <React.Fragment>
                    {this.props.children({
                        init: this.init,
                        ...this.state
                    })}
                </React.Fragment>
            )
        }
    }
}

/**
 * A higher-order component which uses `makeValueSetter` to create an
 * entire structure using just the function
 * 
 * @param initializer a function which creates the values that will be passed from a given configuration
 * @param initialValue the default values that will be used before the value is initialized by the initializer
 * @param mapValueToProps a function which maps those values to a set of props
 */
export function withValueSetter<Config, Value, Props>(
    initializer: (config: Config) => Value,
    initialValue: Value,
    mapValueToProps: (value: Value & { init: InitFunction<Config> }) => Props
) {
    const ValueSetter = makeValueSetter(initializer, initialValue)
    return (Component: React.ComponentType<Props>) => (props: Props) => (
        <ValueSetter>
            {value => {
                const valueProps = mapValueToProps(value);
                return (
                    <Component {...props} {...valueProps} />
                )
            }}
        </ValueSetter>
    )
} 