import { loadFeature, defineFeature} from 'jest-cucumber';
import { ITuple, Tuple, equalTuples, Point, Vector } from '../../src/functions/utils';

const feature = loadFeature('../tuples/tuples.feature', {loadRelativePath: true});

defineFeature(feature, (test) => {

    test('A tuple with w = 1.0 is a point', ({ given, when, then, and }) => {

		let tupleA: ITuple;
		let tupleAx: number;
		let tupleAy: number;
		let tupleAz: number;
		let tupleAw: number;


		let regex = '[-0-9., ]+';

    	given(/^A tuple a = (.*)$/, (arg0, table) => {

			let temp = table[0].Value.match(regex)[0];
			let stringArr = temp.split(',');
			let numArr = [0,0,0,0];

			for (let index = 0; index < stringArr.length; index++ ){
				numArr[index] = parseFloat(stringArr[index]);
			}

			tupleA = new Tuple(numArr[0],numArr[1],numArr[2],numArr[3]);
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

		let regex_int = '[-0-9]+';
		let mockVec: ITuple;
    	given(/^v = vector\((.*), (-.*), (.*)\)$/, (arg0, arg1, arg2) => {
			let vecX = parseInt(arg0.match(regex_int)[0]);
			let vecY = parseInt(arg1.match(regex_int)[0]);
			let vecZ = parseInt(arg2.match(regex_int)[0]);

			mockVec = new Vector(vecX, vecY, vecZ);
		});

    	then(/^v is equal to tuple\((.*), (-.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let tupX = parseInt(arg0.match(regex_int)[0]);
			let tupY = parseInt(arg1.match(regex_int)[0]);
			let tupZ = parseInt(arg2.match(regex_int)[0]);
			let tupW = parseInt(arg3.match(regex_int)[0]);

			let mockTuple: ITuple = new Tuple(tupX, tupY,tupZ,tupW);

			expect(mockTuple.w).toEqual(0);
			expect(equalTuples(mockVec,mockTuple)).toBe(true);
    	});
	});

	test('point() creates tuples with w=1', ({ given, then }) => {

		let regex_int = '[-0-9]+';
		let mockPoint: ITuple;

		given(/^p = point\((.*), -(.*), (.*)\)$/, (arg0, arg1, arg2) => {
			let pointX = parseInt(arg0.match(regex_int)[0]);
			let pointY = parseInt(arg1.match(regex_int)[0]);
			let pointZ = parseInt(arg2.match(regex_int)[0]);

			mockPoint = new Point(pointX, pointY, pointZ);
		});

    	then(/^p is equal to tuple\((.*), -(.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
			let tupX = parseInt(arg0.match(regex_int)[0]);
			let tupY = parseInt(arg1.match(regex_int)[0]);
			let tupZ = parseInt(arg2.match(regex_int)[0]);
			let tupW = parseInt(arg3.match(regex_int)[0]);

			let mockTuple: ITuple = new Tuple(tupX, tupY,tupZ,tupW);

			expect(mockPoint.w).toEqual(1);
			expect(equalTuples(mockPoint,mockTuple)).toBe(true);
    	});
    });
});
