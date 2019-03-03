import Matrix2 from "../matrix2"

describe("Matrix2", () => {
    test("Constructs a translation matrix", () => {
        expect(Matrix2.translate(8, 8)).toEqual([
            // prettier-ignore
            1, 0, 0,
            0, 1, 0,
            8, 8, 1
        ])
    })
    test("Constructs a scaling matrix", () => {
        expect(Matrix2.scale(8, 8)).toEqual([
            // prettier-ignore
            8, 0, 0,
            0, 8, 0,
            0, 0, 1
        ])
    })
    test("Constructs a rotation matrix", () => {
        expect(Matrix2.rotate(Math.PI)).toEqual([
            // prettier-ignore
            Math.cos(Math.PI), -Math.sin(Math.PI), 0,
            Math.sin(Math.PI), Math.cos(Math.PI), 0,
            0, 0, 1
        ])
    })
    test("Can compose matrices", () => {
        const scale = Matrix2.scale(8, 8);
        const translate = Matrix2.translate(8, 8);
        expect(Matrix2.compose([scale, translate])).toEqual([
            // prettier-ignore
            8, 0, 0,
            0, 8, 0,
            8, 8, 1
        ])
    })
})