// prettier-ignore
type Matrix2 = [
    number, number, number,
    number, number, number,
    number, number, number
]

export default {
    translate(x: number, y: number): Matrix2 {
        // prettier-ignore
        return [
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ]
    },
    // rotate(angle: number): Matrix2 {

    // },
    // compose(matrices: Matrix2[])
}