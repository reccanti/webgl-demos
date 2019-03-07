// prettier-ignore
export type TMatrix4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
]

const Matrix4 = {
    identity(): TMatrix4 {
        return [
            // prettier-ignore
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    },
    translate(x: number, y: number, z: number): TMatrix4 {
        // prettier-ignore
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]
    },
    scale(x: number, y: number, z: number): TMatrix4 {
        // prettier-ignore
        return [
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]
    },
    // This page does a good job explaining why 2D rotation works
    // https://matthew-brett.github.io/teaching/rotation_2d.html#equation-x_2_y_2
    rotateX(radians: number): TMatrix4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        // prettier-ignore
        return [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]
    },
    rotateY(radians: number): TMatrix4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        // prettier-ignore
        return [
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ]
    },
    rotateZ(radians: number): TMatrix4 {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        // prettier-ignore
        return [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    },
    compose(matrices: TMatrix4[]): TMatrix4 {
        // a convenience function to multiply 2 matrices together
        function multiplyMatrix(m1: TMatrix4, m2: TMatrix4): TMatrix4 {
            const [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11, a12, a13, a14, a15, a16] = m1;
            const [b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, b12, b13, b14, b15, b16] = m2;
            return [
                a01 * b01 + a02 * b05 + a03 * b09 + a04 * b13,
                a01 * b02 + a02 * b06 + a03 * b10 + a04 * b14,
                a01 * b03 + a02 * b07 + a03 * b11 + a04 * b15,
                a01 * b04 + a02 * b08 + a03 * b12 + a04 * b16,

                a05 * b01 + a06 * b05 + a07 * b09 + a08 * b13,
                a05 * b02 + a06 * b06 + a07 * b10 + a08 * b14,
                a05 * b03 + a06 * b07 + a07 * b11 + a08 * b15,
                a05 * b04 + a06 * b08 + a07 * b12 + a08 * b16,

                a09 * b01 + a10 * b05 + a11 * b09 + a12 * b13,
                a09 * b02 + a10 * b06 + a11 * b10 + a12 * b14,
                a09 * b03 + a10 * b07 + a11 * b11 + a12 * b15,
                a09 * b04 + a10 * b08 + a11 * b12 + a12 * b16,

                a13 * b01 + a14 * b05 + a15 * b09 + a16 * b13,
                a13 * b02 + a14 * b06 + a15 * b10 + a16 * b14,
                a13 * b03 + a14 * b07 + a15 * b11 + a16 * b15,
                a13 * b04 + a14 * b08 + a15 * b12 + a16 * b16,
            ]
        }
        return matrices.reduce((accMat, mat) => {
            const newMat = multiplyMatrix(accMat, mat);
            return newMat;
        }, Matrix4.identity())
    }
}

export default Matrix4