import { loadFeature, defineFeature} from 'jest-cucumber';
import { Point, equalTuples, ITuple, Vector } from '../../../src/utils/functions/utils';
import { IMatrix, multiply, equalMatrices, inverse } from '../../../src/utils/matrices/matrices';
import { Translation, Scaling, Rotation_X, Rotation_Y, Rotation_Z, Shearing } from '../../../src/utils/transformations/transformations';

const feature = loadFeature('../../transformations/transformations.feature', {loadRelativePath: true});



defineFeature(feature, (test) => {

    test('Multiplying by a translation matrix', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;

        given("transform = translation(5, -3, 2)", () => {

            transform = new Translation(5,-3,2);

    	});

    	and("p = point\(-3, 4, 5\)", () => {

            pointP = new Point(2, 1, 7);

    	});

    	then("transform * p = point(2, 1, 7)", () => {

            //The order of multiplication is important.
            let answer: IMatrix = multiply(pointP.asMatrix(), transform);

            expect(equalTuples(answer.asTuple(), pointP)).toBe(true);
        });

    });

    test('Multiplying by the inverse of a translation matrix', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;
        let inv: IMatrix;

    	given(/^transform = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Translation(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	and('inv = inverse(transform)', () => {

            inv = inverse(transform);

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	then("inv * p = point(-8, 7, 3)", () => {

            let answer = multiply(inv, pointP.asMatrix()).asTuple();

            let mockAnswer: ITuple = new Point(-8,7,3);

            expect(equalTuples(mockAnswer, answer)).toBe(true);

    	});
    });

    test('Translation does not affect vectors', ({ given, and, then }) => {

        let transform: IMatrix;
        let vectorV: Vector;

        given(/^transform = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Translation(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            vectorV = new Vector(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	then('transform * v = v', () => {

            let answer = multiply(vectorV.asMatrix(), transform).asTuple();

            expect(equalTuples(vectorV, answer)).toBe(true);

    	});
    });

    test('A scaling matrix applied to a point', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;


    	given(/^transform = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Scaling( parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point( parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	then("transform * p = point(-8, 18, 32)", () => {

            let transformation = multiply(transform, pointP.asMatrix()).asTuple();

            let mockTransformation = new Point(-8, 18, 32);

            expect(equalTuples(transformation, mockTransformation)).toBe(true);

    	});
    });

    test('A scaling matrix applied to a vector', ({ given, and, then }) => {

        let transform: IMatrix;
        let vectorV: Vector;

    	given(/^transform = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Scaling( parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            vectorV = new Vector( parseInt(arg0), parseInt(arg1), parseInt(arg2));
    	});

    	then("transform * v = vector(-8, 18, 32)", () => {

            let transformation = multiply(transform, vectorV.asMatrix()).asTuple();

            let mockTransformation = new Vector(-8,18,32);

            expect( equalTuples( transformation,mockTransformation)).toBe(true);

    	});
    });

    test('Multiplying by the inverse of a scaling matrix', ({ given, and, then }) => {

        let transform: IMatrix;
        let inv: IMatrix;
        let vectorV: Vector;

    	given(/^transform = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Scaling( parseInt(arg0), parseInt(arg1), parseInt(arg2) );


    	});

    	and('inv = inverse(transform)', () => {

            inv = inverse(transform);

    	});

    	and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            vectorV = new Vector(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	then("inv * v = vector(-2, 2, 2)", () => {

            let transformation = multiply(inv ,vectorV.asMatrix() ).asTuple();

            let mockTransformation = new Vector(-2,2,2);

            expect(equalTuples(transformation,mockTransformation)).toBe(true);

        });

    });

    test('Reflection is scaling by a negative value', ({ given, and, then }) => {

        let transform: IMatrix;
        let  pointP: Point;


    	given(/^transform = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            transform = new Scaling( parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point( parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	then("transform * p = point(-2, 3, 4)", () => {

            let transformation = multiply(transform, pointP.asMatrix()).asTuple();

            let mockTransformation = new Point(-2, 3, 4);

            expect(equalTuples(transformation, mockTransformation)).toBe(true);

    	});
    });

    test('Rotating a point around the x axis', ({ given, and, then }) => {

        let pointP: Point;
        let half_quarter: IMatrix;
        let full_quarter: IMatrix;


    	given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^half_quarter = rotation_x\(π \/(.*)\)$/, (arg0) => {

            half_quarter = new Rotation_X(Math.PI/ parseInt(arg0));

    	});

    	and(/^full_quarter = rotation_x\(π \/ (.*)\)$/, (arg0) => {

            full_quarter = new Rotation_X(Math.PI / parseInt(arg0));

    	});

    	then("half_quarter * p = point(0, √2/2, √2/2)", () => {

            let mockRotation = new Point(0, Math.sqrt(2)/2, Math.sqrt(2)/2);

            let half_quarter_rotation = multiply(half_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(mockRotation, half_quarter_rotation));

    	});

    	and("full_quarter * p = point(0, 0, 1)", () => {

            let mockRotation = new Point(0, 0, 1);

            let full_quarter_rotation = multiply(full_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(mockRotation, full_quarter_rotation)).toBe(true);

    	});
    });


    test('The inverse of an x-rotation rotates in the opposite direction', ({ given, and, then }) => {

        let pointP: Point;
        let half_quarter: IMatrix;
        let inv: IMatrix;

    	given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^half_quarter = rotation_x\(π \/ (.*)\)$/, (arg0) => {

            half_quarter = new Rotation_X(Math.PI/ parseInt(arg0));

    	});

    	and('inv = inverse(half_quarter)', () => {

            inv = inverse(half_quarter);

    	});

    	then("inv * p = point(0, √2/2, -√2/2)", () => {

            let mockRotation = new Point(0 , Math.sqrt(2)/2, -Math.sqrt(2)/2 );

            let inverseRotation = multiply(inv, pointP.asMatrix()).asTuple();

            expect(equalTuples(inverseRotation, mockRotation)).toBe(true);

    	});
    });


    test('Rotating a point around the y axis', ({ given, and, then }) => {

        let pointP: Point;
        let half_quarter: IMatrix;
        let full_quarter: IMatrix;



    	given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2) );

    	});

    	and(/^half_quarter = rotation_y\(π \/ (.*)\)$/, (arg0) => {

            half_quarter = new Rotation_Y(Math.PI/ parseInt(arg0));

    	});

    	and(/^full_quarter = rotation_y\(π \/ (.*)\)$/, (arg0) => {

            full_quarter = new Rotation_Y(Math.PI/ parseInt(arg0));


    	});

    	then("half_quarter * p = point(√2/2, 0, √2/2)",() => {

            let mockRotation = new Point(Math.sqrt(2)/2, 0, Math.sqrt(2)/2);
            let rotation = multiply(half_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(rotation, mockRotation)).toBe(true);

    	});

    	and("full_quarter * p = point(1, 0, 0)", () => {

            let mockRotation = new Point(1, 0, 0);
            let rotation = multiply(full_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(rotation, mockRotation)).toBe(true);

    	});
    });



    test('Rotating a point around the z axis', ({ given, and, then }) => {

        let pointP: Point;
        let half_quarter: IMatrix;
        let full_quarter: IMatrix;

    	given("p = point(0, 1, 0)", () => {

            pointP = new Point( 0, 1, 0 );
    	});

    	and("half_quarter = rotation_z(π / 4)", () => {

            half_quarter = new Rotation_Z(Math.PI/ 4);
    	});

    	and("full_quarter = rotation_z(π / 2)", () => {

            full_quarter = new Rotation_Z(Math.PI/ 2);
    	});

    	then("half_quarter * p = point(-√2/2, √2/2, 0)", () => {

            let mockRotation = new Point(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
            let rotation = multiply(half_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(rotation, mockRotation)).toBe(true);


    	});

    	and("full_quarter * p = point(-1, 0, 0)", () => {

            let mockRotation = new Point(-1, 0, 0);
            let rotation = multiply(full_quarter, pointP.asMatrix()).asTuple();

            expect(equalTuples(rotation, mockRotation)).toBe(true);

    	});
    });


    test('A shearing transformation moves x in proportion to y', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));
    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	then("transform * p = point(5, 3, 4)", () => {

            let mockTransformation = new Point( 5,3,4);

            let transformation = multiply(transform, pointP.asMatrix()).asTuple();

            expect(equalTuples(mockTransformation, transformation)).toBe(true);


    	});
    });

    test('A shearing transformation moves x in proportion to z', ({ given, and, then }) => {


        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	then("transform * p = point(6, 3, 4)", () => {

            let mockTransformation = multiply(transform, pointP.asMatrix()).asTuple();
            let transformation = new Point(6,3,4);

            expect(equalTuples(mockTransformation, transformation)).toBe(true);

    	});
    });

    test('A shearing transformation moves y in proportion to x', ({ given, and, then }) => {


        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	then("transform * p = point(2, 5, 4)", () => {

            let mockTransformation = multiply(transform, pointP.asMatrix()).asTuple();
            let transformation = new Point(2,5,4);


            expect(equalTuples(mockTransformation, transformation)).toBe(true);

    	});
    });

    test('A shearing transformation moves y in proportion to z', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));


    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	then("transform * p = point(2, 7, 4)", () => {

            let mockTransformation = multiply(transform, pointP.asMatrix()).asTuple();
            let transformation = new Point(2,7,4);


            expect(equalTuples(mockTransformation, transformation)).toBe(true);
    	});
    });

    test('A shearing transformation moves z in proportion to x', ({ given, and, then }) => {


        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));


    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {


            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));


    	});

    	then("transform * p = point(2, 3, 6)", () => {

            let mockTransformation = multiply(transform, pointP.asMatrix()).asTuple();
            let transformation = new Point(2,3,6);


            expect(equalTuples(mockTransformation, transformation)).toBe(true);
    	});
    });

    test('A shearing transformation moves z in proportion to y', ({ given, and, then }) => {

        let transform: IMatrix;
        let pointP: Point;

    	given(/^transform = shearing\((.*), (.*), (.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

            transform = new Shearing( parseInt(arg0), parseInt(arg1),parseInt(arg2),parseInt(arg3),parseInt(arg4),parseInt(arg5));

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));


    	});

    	then("transform * p = point(2, 3, 7)", () => {

            let mockTransformation = multiply(transform, pointP.asMatrix()).asTuple();
            let transformation = new Point(2,3,7);


            expect(equalTuples(mockTransformation, transformation)).toBe(true);

        });
    });

    test('Individual transformations are applied in sequence', ({ given, and, when, then }) => {

        let pointP: Point;
        let pTwo: Point;
        let pThree: Point;
        let pFour: Point;
        let A: IMatrix;
        let B: IMatrix;
        let C: IMatrix;



    	given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	and(/^A = rotation_x\(π \/ (.*)\)$/, (arg0) => {

            A = new Rotation_X(Math.PI / parseInt(arg0));

    	});

    	and(/^B = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            B = new Scaling(parseInt(arg0),parseInt(arg1),parseInt(arg2))

    	});

    	and(/^C = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            C = new Translation(parseInt(arg0),parseInt(arg1),parseInt(arg2));

    	});

    	when("pTwo = A * p", () => {

            pTwo = multiply(A, pointP.asMatrix()).asTuple();

    	});

    	then(/^pTwo = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            let mockPtwo = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2));

            expect(equalTuples(mockPtwo, pTwo)).toBe(true);

    	});

    	when("pThree = B * pTwo", () => {

            pThree = multiply(B, pTwo.asMatrix()).asTuple();

    	});

    	then(/^pThree = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            let mockPthree = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

            expect(equalTuples(mockPthree, pThree)).toBe(true);

    	});

    	when("pFour = C * pThree", () => {

            pFour = multiply(C, pThree.asMatrix()).asTuple();

    	});

    	then(/^pFour = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            let mockPfour = new Point(parseInt(arg0),parseInt(arg1),parseInt(arg2));

            expect(equalTuples(mockPfour, pFour)).toBe(true);

    	});
    });

    test('Chained transformations must be applied in reverse order', ({ given, and, when, then }) => {

        let pointP: Point;
        let A: IMatrix;
        let B: IMatrix;
        let C: IMatrix;
        let T: IMatrix;

    	given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            pointP = new Point(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	and(/^A = rotation_x\(π \/ (.*)\)$/, (arg0) => {

            A = new Rotation_X(Math.PI / parseInt(arg0));

    	});

    	and(/^B = scaling\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            B = new Scaling(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	and(/^C = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            C = new Translation(parseInt(arg0), parseInt(arg1), parseInt(arg2));

    	});

    	when('T = C * B * A', () => {

            T = multiply( C, multiply(B,A) );

    	});

    	then("T * p = point(15, 0, 7)", () => {

            let mockTransformation = new Point(15, 0, 7);

            let transformation = multiply(T, pointP.asMatrix()).asTuple();

            expect(equalTuples(mockTransformation, transformation)).toBe(true);

        });

    });

});
