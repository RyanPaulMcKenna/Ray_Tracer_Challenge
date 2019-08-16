import { loadFeature, defineFeature} from 'jest-cucumber';
import { IMatrix, Matrix, equalMatrices, multiply, IdentityMatrix, transpose, determinant, submatrix, minor, cofactor } from '../../../src/utils/matrices/matrices';
import { ITuple, Tuple, equalTuples } from '../../../src/utils/functions/utils';

const feature = loadFeature('../../matrices/matrices.feature', {loadRelativePath: true});


defineFeature(feature, (test) => {

    test('Constructing and inspecting a 4x4 matrix', ({ given, then, and }) => {

        let matrix: IMatrix;

        given(/^the following 4x4 matrix M:$/, (table) => {
            matrix = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){
                 for (let col = 0; col < table.length; col++ ){

                    matrix.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }


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

        let matrix: IMatrix;

    	given(/^the following 2x2 matrix M:$/, (table) => {

            matrix = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){
                 for (let col = 0; col < table.length; col++ ){

                    matrix.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }


    	});

    	then("M[0,0] = -3", () => {
            expect(matrix.matrix[0][0]).toEqual(-3);
    	});

    	and("M[0,1] = 5", () => {
            expect(matrix.matrix[0][1]).toEqual(5);
    	});

    	and("M[1,0] = 1", () => {
            expect(matrix.matrix[1][0]).toEqual(1);
    	});

    	and("M[1,1] = -2", () => {
            expect(matrix.matrix[1][1]).toEqual(-2);
    	});
    });

    test('A 3x3 matrix ought to be representable', ({ given, then, and }) => {

        let matrix: IMatrix;

    	given(/^the following 3x3 matrix M:$/, (table) => {

            matrix = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){
                 for (let col = 0; col < table.length; col++ ){

                    matrix.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }

    	});

    	then("M[0,0] = -3", () => {
            expect(matrix.matrix[0][0]).toEqual(-3);
    	});

    	and("M[1,1] = -2", () => {
            expect(matrix.matrix[1][1]).toEqual(-2);
    	});

    	and("M[2,2] = 1", () => {
            expect(matrix.matrix[2][2]).toEqual(1);
    	});
    });

    test('Matrix equality with identical matrices', ({ given, and, then }) => {

        let matrixA: IMatrix;
        let matrixB: IMatrix;

    	given('the following matrix A:', (table) => {
            matrixA = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){

                 for (let col = 0; col < table.length; col++ ){
                    matrixA.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }

    	});

    	and('the following matrix B:', (table) => {
            matrixB = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){

                 for (let col = 0; col < table.length; col++ ){
                    matrixB.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }

    	});

    	then('A = B', () => {

            expect(equalMatrices(matrixA,matrixB)).toBe(true);
    	});
    });

    test('Matrix equality with different matrices', ({ given, and, then }) => {

        let matrixA: IMatrix;
        let matrixB: IMatrix;

    	given('the following matrix A:', (table) => {

            matrixA = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){
                 for (let col = 0; col < table.length; col++ ){

                    matrixA.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }


        });

    	and('the following matrix B:', (table) => {

            matrixB = new Matrix(table.length,table.length,0);

            for (let row = 0; row < table.length; row++ ){

                 for (let col = 0; col < table.length; col++ ){
                    matrixB.matrix[row][col] = parseFloat(table[row.toString()][col]);

                }
            }


        });

    	then('A != B', () => {

            expect(equalMatrices(matrixA,matrixB)).toBe(false);

        });

        test('Multiplying two matrices', ({ given, and, then }) => {

            let matrixA: IMatrix;
            let matrixB: IMatrix;
            let matrixC: IMatrix;

            given('the following matrix A:', (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        matrixA.matrix[row][col] = parseInt(table[row.toString()][col]);

                    }
                }



            });

            and("the following matrix B:", (table) => {

                matrixB = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        matrixB.matrix[row][col] = parseInt(table[row.toString()][col]);

                    }
                }


            });

            then("A * B is the following 4x4 matrix:", (table) => {

                const mockMatrix = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        mockMatrix.matrix[row][col] = parseInt(table[row.toString()][col]);

                    }
                }

                matrixC = multiply(matrixA,matrixB);

                expect(equalMatrices(matrixC,mockMatrix)).toBe(true);
            });
        });

        test('A matrix multiplied by a tuple', ({ given, and, then }) => {

            let matrixA: Matrix;
            let tupleB: Tuple;
            let tupleC: Tuple;

            given('the following matrix A:', (table) => {
                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        matrixA.matrix[row][col] = parseInt(table[row.toString()][col]);

                    }
                }

            });

            and(/^b = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

                tupleB = new Tuple(parseInt(arg0),parseInt(arg1),parseInt(arg2),parseInt(arg3));

            });

            then("a * b = tuple(18, 24, 33, 1)", () => {

                let mockTuple: ITuple = new Tuple(18,24,33,1);

                tupleC = multiply(matrixA,tupleB.asMatrix()).asTuple();

               expect(equalTuples(mockTuple,tupleC)).toBe(true);

            });
        });

        test('Multiplying a matrix by the identity matrix', ({ given, then }) => {

            let matrixA: Matrix;

            given('the following matrix A:', (table) => {

                matrixA = new Matrix(table.length,4,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < 4; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col.toString()]);

                   }
               }


            });

            then('A * identity_matrix = A', () => {

                let identityMatrix = new IdentityMatrix();
                let identityOfA: Matrix = multiply(matrixA,identityMatrix);

                expect(equalMatrices(matrixA,identityOfA)).toBe(true);

            });
        });

        test('Multiplying the identity matrix by a tuple', ({ given, then }) => {

            let tupleA: Tuple

            given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

                tupleA = new Tuple(parseInt(arg0), parseInt(arg1), parseInt(arg2), parseInt(arg3));


            });

            then('identity_matrix * a = a', () => {

                const identityMatrix = new IdentityMatrix();

                const identityOfA = multiply(tupleA.asMatrix(),identityMatrix).asTuple();

                expect(equalTuples(tupleA, identityOfA)).toBe(true);

            });
        });

        test('Transposing a matrix', ({ given, then }) => {

            let matrixA: IMatrix;
            let mockTranspose: IMatrix;

            given('the following matrix A:', (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        matrixA.matrix[row][col] = parseInt(table[row][col]);

                    }
                }
            });

            then('transpose(A) is the following matrix:', (table) => {
                mockTranspose = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                     for (let col = 0; col < table.length; col++ ){
                        mockTranspose.matrix[row][col] = parseInt(table[row][col]);

                    }
                }

                let tranposeOfA: IMatrix = transpose(matrixA);

                expect(equalMatrices(tranposeOfA,mockTranspose)).toBe(true);

            });
        });

        test('Transposing the identity matrix', ({ given, then }) => {

            let idMat: IMatrix = new IdentityMatrix();
            let matrixA: IMatrix;

            given('A = transpose(identity_matrix)', () => {
                matrixA = transpose(idMat);
            });

            then('A = identity_matrix', () => {

                expect(equalMatrices(idMat,matrixA)).toBe(true);

            });

        });


        test('Calculating the determinant of a 2x2 matrix', ({ given, then }) => {

            let matrixA: IMatrix;

            given("the following 2x2 matrix A:", (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col]);

                   }
               }


            });

            then(/^determinant\(A\) = (.*)$/, (arg0) => {

                let mockDeterminant = parseInt(arg0);

                let determinantOfA: number = determinant(matrixA);

                expect(determinantOfA).toEqual(mockDeterminant);

            });
        });

        test('A submatrix of a 3x3 matrix is a 2x2 matrix', ({ given, then }) => {

            let matrixA: IMatrix;
            let mockMatrix: IMatrix;

            given("the following 3x3 matrix A:", (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col]);

                   }
               }


            });

            then("submatrix\(A, 0, 2\) is the following 2x2 matrix:", (table) => {


                mockMatrix = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                        mockMatrix.matrix[row][col] = parseInt(table[row][col]);

                    }
                }


                let subMofA: IMatrix = submatrix(matrixA,0,2);

                expect(equalMatrices(mockMatrix,subMofA)).toBe(true);

            });
        });

        test('A submatrix of a 4x4 matrix is a 3x3 matrix', ({ given, then }) => {

            let matrixA: IMatrix;
            let mockMatrix: IMatrix;

            given("the following 4x4 matrix A:", (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col]);

                   }
               }

            });

            then("submatrix(A, 2, 1) is the following 3x3 matrix:", (table) => {

                mockMatrix = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                        mockMatrix.matrix[row][col] = parseInt(table[row][col]);

                    }
                }


                let subMofA: IMatrix = submatrix(matrixA, 2,1);

                expect(equalMatrices(mockMatrix,subMofA)).toBe(true);

            });
        });

        test('Calculating a minor of a 3x3 matrix', ({ given, and, then }) => {

            let matrixA: IMatrix;
            let matrixB: IMatrix;
            let determinantOfB: number;

            given("the following 3x3 matrix A:", (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col]);

                   }
               }


            });

            and(/^B = submatrix\(A, (.*), (.*)\)$/, (arg0, arg1) => {

                matrixB = submatrix(matrixA, parseInt(arg0), parseInt(arg1));

            });

            then(/^determinant\(B\) = (.*)$/, (arg0) => {

                determinantOfB = determinant(matrixB);

                expect(determinantOfB).toEqual(parseInt(arg0));

            });

            and(/^minor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {

                let minorOfA = minor(matrixA, parseInt(arg0), parseInt(arg1));

                expect(minorOfA).toEqual(parseInt(arg2));


            });
        });

        test('Calculating a cofactor of a 3x3 matrix', ({ given, then, and }) => {

            let matrixA: IMatrix;

            given("the following 3x3 matrix A:", (table) => {

                matrixA = new Matrix(table.length,table.length,0);

                for (let row = 0; row < table.length; row++ ){

                    for (let col = 0; col < table.length; col++ ){
                       matrixA.matrix[row][col] = parseInt(table[row][col]);

                   }
               }

            });

            then(/^minor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {

                let minorOfA = minor(matrixA, parseInt(arg0), parseInt(arg1));

                expect(minorOfA).toEqual(parseInt(arg2));

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {

                let cofactorOfA = cofactor(matrixA, parseInt(arg0), parseInt(arg1));

                expect(cofactorOfA).toEqual(parseInt(arg2));

            });

            and(/^minor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {

                let minorOfA = minor(matrixA, parseInt(arg0), parseInt(arg1));

                expect(minorOfA).toEqual(parseInt(arg2));

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {

                let cofactorOfA = cofactor(matrixA, parseInt(arg0), parseInt(arg1));

                expect(cofactorOfA).toEqual(parseInt(arg2));
            });
        });

        test('Calculating the determinant of a 3x3 matrix', ({ given, then, and }) => {
            given("the following 3x3 matrix A:", (arg0, arg1, table) => {
                pending();

            });

            then(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)(.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^determinant\(A\) = (.*)$/, (arg0) => {
                pending();

            });
        });

        test('Calculating the determinant of a 4x4 matrix', ({ given, then, and }) => {
            given(/^the following (.*)x(.*) matrix A:$/, (arg0, arg1, table) => {
                pending();

            });

            then(/^cofactor\(A, (.*), (.*)\) = (.*)(.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)(.*)(.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^cofactor\(A, (.*), (.*)\) = (.*)$/, (arg0, arg1, arg2) => {
                pending();

            });

            and(/^determinant\(A\) = (.*)$/, (arg0) => {
                pending();
            });
        });


    });
});
