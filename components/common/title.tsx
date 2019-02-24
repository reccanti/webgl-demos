import React, { ReactNode } from "react"

type Props = {
    children?: ReactNode;
}

const Title = (props: Props) => (
    <header className="font-openSans font-size-2rem font-weight-extraBold padding-1 margin-1 background-color-darkYellow">
        {props.children}
    </header>
)

export default Title;