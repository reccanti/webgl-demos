/**
 * This creates a Grid used to display the responsive canvas and
 * related components. 
 */
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

export const DemoGrid = (props: Props) => (
    <div className="grid grid-demo-areas grid-demo-areas-portrait height-100 width-100">
        {props.children}
    </div>
)

export const DemoArea = (props: Props) => (
    <div className="grid-area-demo grid-background">
        {props.children}
    </div>
)

export const ControlsArea = (props: Props) => (
    <div className="grid-area-controls grid-foreground">
        {props.children}
    </div>
)

export const TitleArea = (props: Props) => (
    <div className="grid-area-title grid-foreground">
        {props.children}
    </div>
)
