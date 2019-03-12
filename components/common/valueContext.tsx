import * as React from 'react';

const noop = () => { }

export default function makeValueContext<Config, Value>(initializer: (config: Config) => Value, initialValue: Value) {

    type InitializeFunction = (config: Config) => Value;
    type ContextValue = Value & {
        initialize?: InitializeFunction
    }

    const { Provider, Consumer } = React.createContext<ContextValue>({ ...initialValue });

    // a Component which sets initial values and updates itself when
    // the initializer is called
    class ValueContextProvider extends React.Component<{}, Value> {

        state = {
            ...initialValue
        }

        intialize = (config: Config) => {
            this.setState({
                ...initializer(config)
            })
        }

        render() {
            return (
                <Provider value={{ ...this.state, initialize: this.intialize }}>
                    {this.props.children}
                </Provider>
            );
        }
    }

    // a function which wraps a given component with a ValueContextProvider
    function withValueContextProvider<Props>(MyComponent: React.ComponentType<Props>): React.ComponentType<Props> {
        return ((props: Props) => (
            <ValueContextProvider>
                <MyComponent {...props} />
            </ValueContextProvider>
        ));
    }

    // a function which passes a values from the Provider to a given component
    function withValueContextContainer<Props>(MyComponent: React.ComponentType<Props>): React.ComponentType<Props> {
        return ((props: Props) => (
            <Consumer>
                {({ initialize, ...value }) => (
                    <MyComponent {...props} {...value} />
                )}
            </Consumer>
        ));
    }

    interface InitializerProp {
        initialize?: (config: Config) => void
    }

    function withValueContextInitializer<Props>(MyComponent: React.ComponentType<Props & InitializerProp>): React.ComponentType<Props> {
        return (props: Props) => (
            <Consumer>
                {({ initialize }) => (
                    <MyComponent {...props} initialize={initialize} />
                )}
            </Consumer>
        )
    }

    return {
        withValueContextProvider,
        withValueContextContainer,
        withValueContextInitializer
    }
}