import * as React from 'react'
import { shallow } from 'enzyme';
import makeValueSetter from '../valueSetterHoc';

type TestConfigShape = void;
type TestValueShape = {
    foo: string
}

describe("value-setter HOC", () => {
    test("passes down an initial set of values", () => {
        const ValueSetter = makeValueSetter<TestConfigShape, TestValueShape>(() => ({ foo: "bar" }), { foo: "baz" });
        shallow(
            <ValueSetter>
                {values => {
                    expect(values.foo).toBe("baz")
                    return <div />
                }}
            </ValueSetter>
        );
    })
    test("updates values when the `init` function is called", () => {
        const MockComponent = jest.fn();
        const ValueSetter = makeValueSetter<TestConfigShape, TestValueShape>(() => ({ foo: "bar" }), { foo: "baz" });
        const wrapper = shallow(
            <ValueSetter>
                {values => {
                    return <MockComponent {...values} />
                }}
            </ValueSetter>
        )
        wrapper.find(MockComponent).props().init()
        expect(wrapper.find(MockComponent).props().foo).toBe("bar");
    })
})