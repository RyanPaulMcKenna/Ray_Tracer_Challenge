import { Canvas, ICanvas } from "../utils/canvas/canvas";
import { Point, Vector, IColour, Colour } from "../utils/functions/utils";
import { IMatrix, multiply } from "../utils/matrices/matrices";
import { Rotation_X, Scaling, Translation, Rotation_Y, Rotation_Z } from "../utils/transformations/transformations";



export function circle(canvas: Canvas, ){

    let radius =  canvas.height/4;

    let point = new Point(0, radius, 0 );

    let quarter_turn = Math.PI/346;

    canvas.writePixel(Math.round(point.x + canvas.width/2), Math.round(canvas.height/2 - point.y), new Colour(1,0,0));

    for (let i = 1; i < 692; i++)
    {

        let transform = new Rotation_Z(quarter_turn*i);

        point = multiply(transform, point.asMatrix()).asTuple();
        console.log(point);

        canvas.writePixel(Math.round(point.x + canvas.width/2), Math.round(canvas.height/2 - point.y), new Colour(1,0,0));

    }

    return canvas;

}
