import * as React from 'react'
import { shallow } from 'enzyme';
import makeValueSetter from '../valueSetterHoc';

describe("value-setter HOC", () => {
    test("passes down an initial set of values", () => {
        const ValueSetter = makeValueSetter<void, { foo: string }>(() => ({ foo: "bar" }), { foo: "baz" });
        // const renderer = createRenderer();
        // renderer.render(<ValueSetter>{values => (<div>{JSON.stringify(values)}</div>)}</ValueSetter>)
        // console.log(renderer.getRenderOutput);
        shallow(
            <ValueSetter>
                {values => {
                    expect(values.foo).toBe("baz")
                    return <div />
                }}
            </ValueSetter>
        );
    })
})