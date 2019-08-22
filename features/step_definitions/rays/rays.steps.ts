import { loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('../../rays/rays.feature', {loadRelativePath: true});

defineFeature(feature, (test) => {


    test('Creating and querying a ray', ({ given, and, when, then }) => {
    	given(/^origin = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	and(/^direction = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	when('r = ray(origin, direction)', () => {

    	});

    	then('r.origin = origin', () => {

    	});

    	and('r.direction = direction', () => {

    	});
    });

    test('Computing a point from a distance', ({ given, then, and }) => {
    	given(/^r = ray\(point\((.*), (.*), (.*)\), vector\((.*), (.*), (.*)\)\)$/, (arg0, arg1, arg2, arg3, arg4, arg5) => {

    	});

    	then(/^position\(r, (.*)\) = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

    	});

    	and(/^position\(r, (.*)\) = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

    	});

    	and(/^position\(r, (.*)\) = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

    	});

    	and(/^position\(r, (.*)\) = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2, arg3) => {

    	});
    });

});
