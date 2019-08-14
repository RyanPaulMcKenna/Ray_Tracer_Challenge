import { loadFeature, defineFeature} from 'jest-cucumber';
import { ITuple, Tuple, equalTuples,dot, cross, Point, Vector, IColour, Colour, equalColours } from '../../../src/utils/functions/utils';

const feature = loadFeature('../../tuples/tuples.feature', {loadRelativePath: true});

interface ITupleTableRow {
	TupleName: string;
	Value: string;
}

defineFeature(feature, (test) => {

    test('A tuple with w = 1.0 is a point', ({ given, when, then, and }) => {

		let tupleA: ITuple;
		let tupleAx: number;
		let tupleAy: number;
		let tupleAz: number;
		let tupleAw: number;

    	given('A tuple a = "<Value>"', (table: ITupleTableRow[]) => {

			let x = JSON.parse(table[0].Value)[0];
			let y = JSON.parse(table[0].Value)[1];
			let z = JSON.parse(table[0].Value)[2];
			let w = JSON.parse(table[0].Value)[3];

			tupleA = new Tuple(x,y,z,w);
    	});

    	when('When I access the properties of a', () => {
			tupleAx = tupleA.x;
			tupleAy = tupleA.y;
			tupleAz = tupleA.z;
			tupleAw = tupleA.w;
    	});

    	then(/^a.x = (.*)$/, (xprop) => {
            expect(tupleAx).toEqual(parseFloat(xprop));
    	});

    	and(/^a.y = (.*)$/, (yprop) => {
            expect(tupleAy).toEqual(parseFloat(yprop));
    	});

    	and(/^a.z = (.*)$/, (zprop) => {
            expect(tupleAz).toEqual(parseFloat(zprop));
    	});

    	and(/^a.w = (.*)$/, (wprop) => {
            expect(tupleAw).toEqual(parseFloat(wprop));
    	});

    	and('a is a point', () => {
			const pointA: ITuple = new Point(tupleAx,tupleAy,tupleAz);

			expect(equalTuples(tupleA,pointA)).toBe(true);
    	});

    	and('a is not a vector', () => {
			const vectorA: ITuple =  new Vector(tupleAx,tupleAy,tupleAz);

			expect(equalTuples(tupleA,vectorA)).toBe(false);
    	});
    });

    test('vector() creates tuples with w=0', ({ given, then }) => {


		let mockVec: ITuple;

    	given(/^v = vector\((.*), (-.*), (.*)\)$/, (arg0, arg1, arg2) => {
			let vecX: number = parseInt(arg0);
			let vecY: number = parseInt(arg1);
			let vecZ: number = parseInt(arg2);

			mockVec = new Vector(vecX, vecY, vecZ);
		});

    	then(/^v is equal to tuple\((.*), (-.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let tupX: number = parseInt(arg0);
			let tupY: number = parseInt(arg1);
			let tupZ: number = parseInt(arg2);
			let tupW: number = parseInt(arg3);

			let mockTuple: ITuple = new Tuple(tupX, tupY,tupZ,tupW);

			expect(mockTuple.w).toEqual(0);
			expect(equalTuples(mockVec,mockTuple)).toBe(true);
    	});
	});

	test('point() creates tuples with w=1', ({ given, then }) => {


		let mockPoint: ITuple;

		given(/^p = point\((.*), (-.*), (.*)\)$/, (arg0, arg1, arg2) => {
			let pointX: number = parseInt(arg0);
			let pointY: number = parseInt(arg1);
			let pointZ: number = parseInt(arg2);

			mockPoint = new Point(pointX, pointY, pointZ);
		});

    	then(/^p is equal to tuple\((.*), (-.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let tupX: number = parseInt(arg0);
			let tupY: number = parseInt(arg1);
			let tupZ: number = parseInt(arg2);
			let tupW: number = parseInt(arg3);

			let mockTuple: ITuple = new Tuple(tupX, tupY,tupZ,tupW);

			expect(mockPoint.w).toEqual(1);
			expect(equalTuples(mockPoint,mockTuple)).toBe(true);
    	});
	});

	test('Adding two tuples', ({ given, and, then }) => {

		let tupleA: ITuple;
		let tupleB: ITuple;
		let tupleC: ITuple;

    	given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let x: number = parseInt(arg0);
			let y: number = parseInt(arg1);
			let z: number = parseInt(arg2);
			let w: number = parseInt(arg3);

			tupleA = new Tuple(x,y,z,w);
    	});

    	and(/^b = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let x: number = parseInt(arg0);
			let y: number = parseInt(arg1);
			let z: number = parseInt(arg2);
			let w: number = parseInt(arg3);

			tupleB = new Tuple(x,y,z,w);
		});

		then(/^a plus b = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let x: number = parseInt(arg0);
			let y: number = parseInt(arg1);
			let z: number = parseInt(arg2);
			let w: number = parseInt(arg3);

			let mockResult: ITuple = new Tuple(x,y,z,w);
			tupleC = tupleA.plus(tupleB);

			expect(tupleC.w).toEqual(1);
			expect(tupleC).toEqual(mockResult);

		});

		test('Adding a Vector to a Vector', ({ given, and, then }) => {

			let vecA: ITuple;
			let vecB: ITuple;
			let vecC: ITuple;

			given(/^a = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vecA = new Vector(x,y,z);
			});

			and(/^b = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vecB = new Vector(x,y,z);
			});

			then(/^a plus b = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				let mockResult: ITuple = new Tuple(x,y,z,w);

				vecC = vecA.plus(vecB);

				expect(vecC.w).toEqual(0);
				expect(vecC).toEqual(mockResult);
			});
		});


		test('Subtracting two points', ({ given, and, then }) => {

			let pointP: ITuple;
			let PointB: ITuple;
			let vectorC: ITuple;

			given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				pointP = new Point(x,y,z);
			});

			and(/^b = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				PointB = new Point(x,y,z);
			});

			then(/^p - b = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				let mockResult = new Vector(x,y,z);

				vectorC = pointP.sub(PointB);

				expect(vectorC).toEqual(mockResult);
			});
		});

		test('Subtracting a vector from a point', ({ given, and, then }) => {

			let pointB: ITuple;
			let pointP: ITuple;
			let vectorV: ITuple;

			given(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				pointP = new Point(x,y,z);
			});

			and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vectorV = new Vector(x,y,z);
			});

			then(/^p - v = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				let mockResult = new Point(x,y,z);
				pointB = pointP.sub(vectorV);

				expect(pointB).toEqual(mockResult);
			});
		});

		test('Subtracting two vectors', ({ given, and, then }) => {

			let vectorV: ITuple;
			let vectorK: ITuple;
			let vectorE: ITuple;

			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vectorV = new Vector(x,y,z);
			});

			and(/^k = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vectorK = new Vector(x,y,z);
			});

			then(/^v - k = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				let mockResult = new Vector(x,y,z);
				vectorE = vectorV.sub(vectorK);

				expect(vectorE).toEqual(mockResult);

			});
		});

		test('Subtracting a vector from the zero vector', ({ given, and, then }) => {

			let zero: ITuple;
			let vectorV: ITuple;
			let vectorK: ITuple;

			given(/^zero = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				zero = new Vector(x,y,z);

			});

			and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				vectorV = new Vector(x,y,z);
			});

			then(/^zero - v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);

				let mockResult = new Vector(x,y,z);

				vectorK = zero.sub(vectorV);
				expect(vectorK).toEqual(mockResult);

			});
		});

		test('Negating a tuple', ({ given, then }) => {

			let tupleA: Tuple;
			let negateA: Tuple;

			given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				tupleA = new Tuple(x,y,z,w);
			});

			then(/^-a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				let mockResult = new Tuple(x,y,z,w);
				negateA = tupleA.negate();

				expect(negateA).toEqual(mockResult);

			});


		});

		test('Multiplying a tuple by a scalar', ({ given, then }) => {

			let tupleA: ITuple;
			let tupleB: ITuple;
			const scalar: number = 3.5;

			given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				tupleA = new Tuple(x,y,z,w);
			});

			then(/^a * (.*) = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4) => {


				let x: number = parseFloat(arg1);
				let y: number = parseFloat(arg2);
				let z: number = parseFloat(arg3);
				let w: number = parseFloat(arg4);

				let mockResult = new Tuple(x,y,z,w);
				tupleB = tupleA.scale(scalar);

				expect(tupleB).toEqual(mockResult);

			});
		});

		test('Multiplying a tuple by a fraction', ({ given, then }) => {

			let tupleA: ITuple;
			let tupleB: ITuple;
			const fraction: number = 0.5;

			given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				tupleA = new Tuple(x,y,z,w);
			});

			then(/^a * (.*) = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3, arg4) => {

				let x: number = parseFloat(arg1);
				let y: number = parseFloat(arg2);
				let z: number = parseFloat(arg3);
				let w: number = parseFloat(arg4);

				tupleB = new Tuple(x,y,z,w);

				expect(tupleA.scale(fraction)).toEqual(tupleB);
			});
		});

		test('Dividing a tuple by a scalar', ({ given, then }) => {

			let tupleA: ITuple;
			let tupleB: ITuple;
			let mockResult: ITuple;
			const divisor: number = 2;

			given(/^a = tuple\((.*), (.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				let x: number = parseInt(arg0);
				let y: number = parseInt(arg1);
				let z: number = parseInt(arg2);
				let w: number = parseInt(arg3);

				tupleA = new Tuple(x,y,z,w);
			});

			then(/^a divided by (.*) = tuple\((.*), (.*), (.*), (-.*)\)$/, (arg0, arg1, arg2, arg3, arg4) => {
				let x: number = parseFloat(arg1);
				let y: number = parseFloat(arg2);
				let z: number = parseFloat(arg3);
				let w: number = parseFloat(arg4);

				mockResult = new Tuple(x,y,z,w);

				tupleB = tupleA.divide(divisor);

				expect(tupleB).toEqual(mockResult);

			});
		});

		test('Computing the magnitude of vector(1, 0, 0)', ({ given, then }) => {

			let vectorA: Vector;
			const mag: number = 1;
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^magnitude\(v\) = (.*)$/, (arg0) => {
				const mockMag = parseInt(arg0);
				const resultMag = vectorA.magnitude();

				expect(resultMag).toEqual(mockMag);
				expect(resultMag).toEqual(mag);
			});
		});

		test('Computing the magnitude of vector(0, 1, 0)', ({ given, then }) => {
			let vectorA: Vector;
			const mag: number = 1;
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^magnitude\(v\) = (.*)$/, (arg0) => {
				const mockMag = parseInt(arg0);
				const resultMag = vectorA.magnitude();

				expect(resultMag).toEqual(mockMag);
				expect(resultMag).toEqual(mag);
			});
		});

		test('Computing the magnitude of vector(0, 0, 1)', ({ given, then }) => {
			let vectorA: Vector;
			const mag: number = 1;
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^magnitude\(v\) = (.*)$/, (arg0) => {
				const mockMag = parseInt(arg0);
				const resultMag = vectorA.magnitude();

				expect(resultMag).toEqual(mockMag);
				expect(resultMag).toEqual(mag);
			});
		});

		test('Computing the magnitude of vector(1, 2, 3)', ({ given, then }) => {
			let vectorA: Vector;
			const mag: number = Math.sqrt(14);
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^magnitude\(v\) = √(.*)$/, (arg0) => {
				const mockMag = Math.sqrt(parseInt(arg0));
				const resultMag = vectorA.magnitude();

				expect(resultMag).toEqual(mockMag);
				expect(resultMag).toEqual(mag);
			});
		});

		test('Computing the magnitude of vector(-1, -2, -3)', ({ given, then }) => {
			let vectorA: Vector;
			const mag: number = Math.sqrt(14);
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^magnitude\(v\) = √(.*)$/, (arg0) => {
				const mockMag = Math.sqrt(parseInt(arg0));
				const resultMag = vectorA.magnitude();

				expect(resultMag).toEqual(mockMag);
				expect(resultMag).toEqual(mag);
			});
		});

		test('Normalizing vector(4, 0, 0) gives (1, 0, 0)', ({ given, then }) => {

			let vectorA: Vector;
			let mockNorm: Vector;
			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^normalize\(v\) = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				mockNorm = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

				let normA = vectorA.normalize();

				expect(normA).toEqual(mockNorm);
			});
		});



		test('Normalizing vector(1, 2, 3)', ({ given, then }) => {
			let vectorA: Vector;
			let mockNorm: Vector;

			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			then(/^normalize\(v\) = approximately vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

				mockNorm = new Vector(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

				let normA = vectorA.normalize();

				expect(equalTuples(normA,mockNorm));
			});
		});



		test('The magnitude of a normalized vector', ({ given, when, then }) => {
			let vectorA: Vector;
			let mockNorm: Vector;

			given(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));

			});

			when('norm = normalize(v)', () => {
				mockNorm = vectorA.normalize();
			});

			then(/^magnitude\(norm\) = (.*)$/, (arg0) => {
				let magnitude = parseInt(arg0);
				let normMag = mockNorm.magnitude();

				expect(normMag).toEqual(magnitude);
				expect(normMag).toEqual(1);


			});
		});

		test('The dot product of two tuples', ({ given, and, then }) => {
			let vectorA: Vector;
			let vectorB: Vector;

			given(/^a = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorA = new Vector(parseInt(arg0),parseInt(arg1), parseInt(arg2));
			});

			and(/^b = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vectorB = new Vector(parseInt(arg0),parseInt(arg1), parseInt(arg2));
			});

			then(/^dot\(a, b\) = (.*)$/, (arg0) => {
				let mockDotProduct = parseInt(arg0);
				let dotProduct: number = dot(vectorA,vectorB);

				expect(dotProduct).toEqual(mockDotProduct);
			});
		});

	    test('The cross product of two vectors', ({ given, and, then }) => {
			let vecA: Vector;
			let vecB: Vector;
			let crossAb: Vector;
			let crossBa: Vector;
			given(/^a = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vecA = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));
			});

			and(/^b = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				vecB = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));
			});

			then(/^cross\(a, b\) = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let mockCrossAb = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));
				crossAb = cross(vecA,vecB);
				expect(crossAb).toEqual(mockCrossAb);
			});

			and(/^cross\(b, a\) = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let mockCrossBa = new Vector(parseInt(arg0),parseInt(arg1),parseInt(arg2));
				crossBa = cross(vecB,vecA);
				expect(crossBa).toEqual(mockCrossBa);
			});
		});

		test('Colours are (red, green, blue) tuples', ({ given, then, and }) => {

			let colourC: IColour;
			given(/^c = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourC = new Colour(parseInt(arg0),parseInt(arg1),parseInt(arg2));
			});

			then(/^c.red = (.*)$/, (arg0) => {
				expect(colourC.red).toEqual(parseInt(arg0));
			});

			and(/^c.green = (.*)$/, (arg0) => {
				expect(colourC.green).toEqual(parseInt(arg0));
			});

			and(/^c.blue = (.*)$/, (arg0) => {
				expect(colourC.blue).toEqual(parseInt(arg0));
			});
		});

		test('Adding colours', ({ given, and, then }) => {
			let colourA: IColour;
			let colourB: IColour;

			given(/^a = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourA =  new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

			});

			and(/^b = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourB = new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

			});

			then(/^a plus b = colour((.*), (.*), (.*))/, (arg0) => {

				let regex = '[-0-9., ]+';
				let array = arg0.match(regex)[0].split(',').map((x: string) => parseFloat(x));;

				let mockColour = new Colour(array[0],array[1],array[2]);
				let colourC = colourA.plus(colourB);

				expect(colourC).toEqual(mockColour);
			});
		});

		test('Subtracting colours', ({ given, and, then }) => {
			let colourA: IColour;
			let colourB: IColour;
			given(/^a = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourA =  new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));
			});

			and(/^b = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourB =  new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));
			});

			then(/^a - b = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				let mockColour = new Colour(parseFloat(arg0), parseFloat(arg1), parseFloat(arg2));
				let colourC = colourA.sub(colourB);

				expect(equalColours(colourC, mockColour)).toBe(true);

			});
		});

		test('Multiplying a colour by a scalar', ({ given, then }) => {

			let colourA: IColour;
			let colourC: IColour;

			given(/^c = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourA = new Colour(arg0,arg1,arg2);
			});

			then(/^c * (.*) = colour\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
				colourC = new Colour(parseFloat(arg1),parseFloat(arg2),parseFloat(arg3));
				let scalar = parseInt(arg0);

				let colourB = colourA.scale(scalar);

				expect(equalColours(colourC, colourB));
			});
		});

		test('Multiplying colors', ({ given, and, then }) => {

			let colourA: IColour;
			let colourB: IColour;
			let colourC: IColour;

			given(/^a = color\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourA = new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

			});

			and(/^b = color\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourB = new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

			});

			then(/^a times b = color\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
				colourC = new Colour(parseFloat(arg0),parseFloat(arg1),parseFloat(arg2));

				expect(equalColours(colourA.multiply(colourB),colourC)).toBe(true);
			});
		});

	});
});
