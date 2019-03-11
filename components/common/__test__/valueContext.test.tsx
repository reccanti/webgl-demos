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
    })
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
    })
    // test("Creates a value context with a default state", () => {
    //     type Props = {
    //         foo: string,
    //     };
    //     const MockComponent = jest.fn();
    //     const ConnectedComponent =
    //         withValueContextProvider(
    //             withValueContextContainer<void, Props>(
    //                 noop, {
    //                     foo: "bar"
    //                 })(MockComponent)
    //         );
    //     const wrapper = shallow(<ConnectedComponent />)
    //     console.log(MockComponent)
    // })
})