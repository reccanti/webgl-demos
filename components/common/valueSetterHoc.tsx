import * as React from 'react';

type Props<S, T> = {
    children: (values: T & { init: (config: S) => void }) => React.ReactNode
}

export default function makeValueSetter<S, T>(_initializer: (config: S) => T, initialValue: T): React.FunctionComponent<Props<S, T>> {

    return (props: Props<S, T>) => (
        <React.Fragment>
            {props.children({
                init: () => { },
                ...initialValue
            })}
        </React.Fragment>
    )
}