import * as React from 'react';

const noop = () => { }

export default function makeValueContext<Config, Value>(_initializer: (config: Config) => Value, initialValue: Value) {
    const { Provider, Consumer } = React.createContext(initialValue);

    // a Component which sets initial values and updates itself when
    // the initializer is called
    class ValueContextProvider extends React.Component<{}, Value> {

        state = {
            ...initialValue
        }

        render() {
            return (
                <Provider value={this.state}>
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
                {value => (
                    <MyComponent {...props} {...value} />
                )}
            </Consumer>
        ));
    }

    return {
        withValueContextProvider,
        withValueContextContainer,
        withValueContextInitializer: noop
    }
}