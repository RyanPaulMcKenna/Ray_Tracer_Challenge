import { loadFeature, defineFeature} from 'jest-cucumber';
//mport assert = require('assert');

const feature = loadFeature('../some_features/tuples.feature', {loadRelativePath: true});

defineFeature(feature, (test) => {

    test('A tuple with w=1.0 is a point', ({ given, when, then, and }) => {

    	given(/^A tuple a (.*)$/, (arg0, table) => {
            pending();
    	});

    	when('When I access the properties of a', () => {
            pending();
    	});

    	then(/^a.x = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.y = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.z = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.w = (.*)$/, (arg0) => {
            pending();
    	});

    	and('a is a point', () => {
            pending();
    	});

    	and('a is not a vector', () => {
            pending();
    	});
    });

    test('A tuple with w=0 is a vector', ({ given, when, then, and }) => {

    	given(/^A tuple a (.*)$/, (arg0, table) => {
            pending();
    	});

    	when('When I access the properties of a', () => {
            pending();
    	});

    	then(/^a.x = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.y = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.z = (.*)$/, (arg0) => {
            pending();
    	});

    	and(/^a.w = (.*)$/, (arg0) => {
            pending();
    	});

    	and('a is not a point', () => {
            pending();
    	});

    	and('a is a vector', () => {
            pending();
    	});
    });

   test('point() creates tuples with w=1', ({ given, then }) => {

    	given(/^p ← point\((.*), -(.*), (.*)\)$/, (arg0, arg1, arg2) => {
            pending();
    	});

    	then(/^p is equal to tuple\((.*), -(.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
            pending();
    	});
    });


    test('vector() creates tuples with w=0', ({ given, then }) => {

    	given(/^v ← vector\((.*), -(.*), (.*)\)$/, (arg0, arg1, arg2) => {
            pending();
    	});

    	then(/^v is equal to tuple\((.*), -(.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {
            pending();
    	});
    });
});
