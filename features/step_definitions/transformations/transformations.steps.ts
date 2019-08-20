import { loadFeature, defineFeature} from 'jest-cucumber';


const feature = loadFeature('../../transformations/transformations.feature', {loadRelativePath: true});



defineFeature(feature, (test) => {

    test('Multiplying by a translation matrix', ({ given, and, then }) => {
    	given(/^transform = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	then(/^transform * p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});
    });

    test('Multiplying by the inverse of a translation matrix', ({ given, and, then }) => {
    	given(/^transform = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	and('inv = inverse(transform)', () => {

    	});

    	and(/^p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	then(/^inv * p = point\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});
    });

    test('Translation does not affect vectors', ({ given, and, then }) => {
    	given(/^transform = translation\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	and(/^v = vector\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

    	});

    	then('transform * v = v', () => {

    	});
    });

});
