/**
 * A higher-order component used to store arbitrary values that can
 * be set in a child component. Useful for something like a canvas
 * that requires initialization, but may need to be updated by a 
 * component at the same level or higher
 */
import * as React from 'react';

type Props<S, T> = {
    children: (values: T & { init: (config: S) => void }) => React.ReactNode
}
type State<T> = T

export default function makeValueSetter<S, T>(initializer: (config: S) => T, initialValue: T): React.ComponentClass<Props<S, T>, State<T>> {

    return class ValueSetter extends React.Component<Props<S, T>, State<T>> {

        state = {
            ...initialValue
        }

        init = (config: S) => {
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