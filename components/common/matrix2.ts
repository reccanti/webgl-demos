// prettier-ignore
export type TMatrix2 = [
    number, number, number,
    number, number, number,
    number, number, number
]

const Matrix2 = {
    identity(): TMatrix2 {
        return [
            // prettier-ignore
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]
    },
    translate(x: number, y: number): TMatrix2 {
        // prettier-ignore
        return [
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        ]
    },
    scale(x: number, y: number): TMatrix2 {
        // prettier-ignore
        return [
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ]
    },
    // This page does a good job explaining why 2D rotation works
    // https://matthew-brett.github.io/teaching/rotation_2d.html#equation-x_2_y_2
    rotate(angle: number): TMatrix2 {
        const { cos, sin } = Math;
        // prettier-ignore
        return [
            cos(angle), -sin(angle), 0,
            sin(angle), cos(angle), 0,
            0, 0, 1
        ]
    },
    compose(matrices: TMatrix2[]): TMatrix2 {
        // a convenience function to multiply 2 matrices together
        function multiplyMatrix(m1: TMatrix2, m2: TMatrix2): TMatrix2 {
            const [a1, a2, a3, a4, a5, a6, a7, a8, a9] = m1;
            const [b1, b2, b3, b4, b5, b6, b7, b8, b9] = m2;
            return [
                a1 * b1 + a2 * b4 + a3 * b7,
                a1 * b2 + a2 * b5 + a3 * b8,
                a1 * b3 + a2 * b6 + a3 * b9,

                a4 * b1 + a5 * b4 + a6 * b7,
                a4 * b2 + a5 * b5 + a6 * b8,
                a4 * b3 + a5 * b6 + a6 * b9,

                a7 * b1 + a8 * b4 + a9 * b7,
                a7 * b2 + a8 * b5 + a9 * b8,
                a7 * b3 + a8 * b6 + a9 * b9,
            ]
        }
        return matrices.reduce((accMat, mat) => {
            const newMat = multiplyMatrix(accMat, mat);
            // console.log(`${accMat}\n${mat}\n${newMat}`)
            return newMat;
        }, Matrix2.identity())
    }
}

export default Matrix2