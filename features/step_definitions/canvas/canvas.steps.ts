import { loadFeature, defineFeature} from 'jest-cucumber';
import { ICanvas, Canvas} from '../../../src/utils/canvas/canvas';
import { IColour, Colour} from '../../../src/utils/functions/utils';


const feature = loadFeature('../../canvas/canvas.feature', {loadRelativePath: true});

defineFeature(feature, (test) => {

    test('Creating a canvas', ({ given, then, and }) => {
        let canvas: ICanvas;

    	given(/^c = canvas\((.*), (.*)\)$/, (arg0, arg1) => {
            canvas = new Canvas(parseInt(arg0),parseInt(arg1));

    	});

    	then(/^c.width = (.*)$/, (arg0) => {
            let width = parseInt(arg0);
            expect(canvas.width).toEqual(width);

    	});

    	and(/^c.height = (.*)$/, (arg0) => {
            let height = parseInt(arg0);
            expect(canvas.height).toEqual(height);

    	});

    	and(/^every pixel of c is color\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {

            let black: IColour = new Colour(0,0,0);
            let mockCanvas = [
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black],
                [black,black,black,black,black]
        ];
            expect(typeof canvas.canvas).toBe(typeof mockCanvas);
            expect(black).toEqual(new Colour(parseInt(arg0),parseInt(arg1),parseInt(arg2)))
            expect(canvas.canvas).toEqual(mockCanvas);
            });

            test('Writing pixels to a canvas', ({ given, and, when, then }) => {

                    let canvas: ICanvas;
                    let red: IColour;
                    given(/^c = canvas\((.*), (.*)\)$/, (arg0, arg1) => {
                        canvas = new Canvas(parseInt(arg0),parseInt(arg1));

                    });

                    and(/^red = color\((.*), (.*), (.*)\)$/, (arg0, arg1, arg2) => {
                        red = new Colour(parseInt(arg0),parseInt(arg1),parseInt(arg2));

                    });

                    when(/^writePixel\(c, (.*), (.*), red\)$/, (arg0, arg1) => {
                        canvas.writePixel( parseInt(arg0), parseInt(arg1), red);

                    });

                    then(/^pixelAt\(c, (.*), (.*)\) = red$/, (arg0, arg1) => {
                        let mockPixel: IColour = canvas.pixelAt(parseInt(arg0), parseInt(arg1));

                        expect(mockPixel).toEqual(red);
                    });
            });

    });
});
