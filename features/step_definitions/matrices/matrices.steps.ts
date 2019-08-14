import { loadFeature, defineFeature} from 'jest-cucumber';
import { IMatrix, Matrix } from '../../../src/utils/matrices/matrices';

const feature = loadFeature('../../matrices/matrices.feature', {loadRelativePath: true});


defineFeature(feature, (test) => {

    test('Constructing and inspecting a 4x4 matrix', ({ given, then, and }) => {

        let matrix: IMatrix;

        given(/^the following 4x4 matrix M:$/, (table) => {
            let mat = new Array(4);

            for (let row = 0; row < 4; row++ ){

                 mat[row] = [0,0,0,0];

                 for (let col = 0; col < 4; col++ ){
                    mat[row][col] = parseFloat(table[row.toString()][col]);

                }
            }

            matrix = new Matrix(mat);
    	});

    	then("M[0,0] = 1", () => {
            expect(matrix.matrix[0][0]).toEqual(1);
    	});

    	and("M[0,3] = 4", () => {
            expect(matrix.matrix[0][3]).toEqual(4);
    	});

    	and("M[1,0] = 5.5", () => {
            expect(matrix.matrix[1][0]).toEqual(5.5);
    	});

    	and("M[1,2] = 7.5", () => {
            expect(matrix.matrix[1][2]).toEqual(7.5);
    	});

    	and("M[2,2] = 11", () => {
            expect(matrix.matrix[2][2]).toEqual(11);
    	});

    	and("M[3,0] = 13.5", () => {
            expect(matrix.matrix[3][0]).toEqual(13.5);
    	});

    	and("M[3,2] = 15.5", () => {
            expect(matrix.matrix[3][2]).toEqual(15.5);
    	});
    });

    test('A 2x2 matrix ought to be representable', ({ given, then, and }) => {
    	given(/^the following (.*)x(.*) matrix M:$/, (arg0, arg1, table) => {
            pending();
    	});

    	then("M[0,0] = -3", () => {
            pending();
    	});

    	and("M[0,1] = 5", () => {
            pending();
    	});

    	and("M[1,0] = 1", () => {
            pending();
    	});

    	and("M[1,1] = -2", () => {
            pending();
    	});
    });

    test('A 3x3 matrix ought to be representable', ({ given, then, and }) => {
    	given(/^the following (.*)x(.*) matrix M:$/, (arg0, arg1, table) => {
            pending();
    	});

    	then("M[0,0] = -3", () => {
            pending();
    	});

    	and("M[1,1] = -2", () => {
            pending();
    	});

    	and("M[2,2] = 1", () => {
            pending();
    	});
    });

    test('Matrix equality with identical matrices', ({ given, and, then }) => {
    	given('the following matrix A:', (table) => {
            pending();
    	});

    	and('the following matrix B:', (table) => {
            pending();
    	});

    	then('A = B', () => {
            pending();
    	});
    });

    test('Matrix equality with different matrices', ({ given, and, then }) => {
    	given('the following matrix A:', (table) => {
            pending();
    	});

    	and('the following matrix B:', (table) => {
            pending();
    	});

    	then('A != B', () => {
            pending();
    	});
    });
});
