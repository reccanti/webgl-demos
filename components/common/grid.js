/**
 * A set of components that are used to interact with a
 * CSS grid
 */

export const Column = props => {
    const { children } = props;
    const classes = [];
    if (props.columnSpan) {
        classes.push(`grid-col-span-${props.columnSpan}`)
    }
    const className = classes.join(" ");
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const Grid = props => {
    const { children } = props;
    const classes = ['grid'];
    if (props.columns) {
        classes.push(`grid-col-${props.columns}`)
    }
    if (props.autoRow) {
        classes.push(`grid-row-${props.autoRow}`);
    }
    if (props.backgroundColor) {
        classes.push(`background-color-${props.backgroundColor}`)
    }
    const className = classes.join(" ");

    return (
        <div className={className}>
            {children}
        </div>
    )
}
export default Grid;