import React from 'react';
import { mount } from 'enzyme';
import makeValueContext from '../valueContext';

describe("ValueContext", () => {
    test("creates a ValueContext that exposes functions for creating valueContext objects", () => {
        const {
            withValueContextProvider,
            withValueContextContainer,
            withValueContextInitializer
        } = makeValueContext<void, { foo: string }>(() => ({ foo: "bar" }), { foo: "baz" })

        expect(typeof withValueContextProvider).toBe("function");
        expect(typeof withValueContextContainer).toBe("function");
        expect(typeof withValueContextInitializer).toBe("function");
    });

    test("The ValueContext created can be used to make Components with the default values mapped to props", () => {
        const {
            withValueContextProvider,
            withValueContextContainer,
        } = makeValueContext<void, { foo: string }>(() => ({ foo: "bar" }), { foo: "baz" })

        const MyComponent = jest.fn(() => React.createElement(React.Fragment));
        const Container = withValueContextProvider(withValueContextContainer(MyComponent));

        const wrapper = mount(
            <Container />
        );
        expect(wrapper.find(MyComponent).props()).toEqual({ foo: "baz" })
    });

    test("The ValueContext created can be updated by an 'initializer' function", () => {
        const {
            withValueContextProvider,
            withValueContextContainer,
            withValueContextInitializer
        } = makeValueContext<void, { foo: string }>(() => ({ foo: "bar" }), { foo: "baz" })

        // initialize all components
        class Initializer extends React.Component<{ initialize?: () => void }> {
            handleInitialize = () => {
                if (this.props.initialize) {
                    this.props.initialize();
                }
            }
            render() {
                return <React.Fragment />
            }
        }
        const WrappedInitializer = withValueContextInitializer(Initializer);
        const MyComponent = () => (
            <React.Fragment>
                <WrappedInitializer />
            </React.Fragment>
        )
        const WrappedComponent = withValueContextProvider(withValueContextContainer(MyComponent));

        const wrapper = mount(<WrappedComponent />)

        // simulate the Initializer's handleInitialize() function being called
        const InitializerInstance = wrapper.find(Initializer).instance() as Initializer;
        InitializerInstance.handleInitialize();
        wrapper.update();

        expect(wrapper.find(MyComponent).props()).toEqual({ foo: "bar" })
    })

    test("The ValueContext created can be updated by an `initializer` function with parameters", () => {

        // 1. create the context
        type Config = string;
        type Value = {
            foo: Config
        };
        function initializer(config: Config): Value {
            return {
                foo: config
            }
        }
        const {
            withValueContextProvider,
            withValueContextContainer,
            withValueContextInitializer
        } = makeValueContext(initializer, { foo: "baz" });

        // 2. initialize the components
        class Initializer extends React.Component<{ initialize?: (config: Config) => void }> {
            handleInitialize = () => {
                if (this.props.initialize) {
                    this.props.initialize("bar");
                }
            }
            render() {
                return <React.Fragment />
            }
        }
        const WrappedInitializer = withValueContextInitializer(Initializer);
        const MyComponent = () => (
            <React.Fragment>
                <WrappedInitializer />
            </React.Fragment>
        )
        const WrappedComponent = withValueContextProvider(withValueContextContainer(MyComponent));
        const wrapper = mount(<WrappedComponent />)

        // 3. simulate the Initializer's handleInitialize() function being called
        const InitializerInstance = wrapper.find(Initializer).instance() as Initializer;
        InitializerInstance.handleInitialize();
        wrapper.update();

        // 4. check to see if the value was updated
        expect(wrapper.find(MyComponent).props()).toEqual({ foo: "bar" })
    })
})