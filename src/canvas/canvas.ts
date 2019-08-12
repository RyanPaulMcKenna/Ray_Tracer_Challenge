import { IColour, Colour } from "../functions/utils";

export interface ICanvas{
    getCanvas(): IColour[][][];
    width: number;
    height: number;
    canvas: IColour[][][];
}


export class Canvas implements ICanvas{
    canvas: IColour[][][];
    getCanvas(): IColour[][][]{
        let black: IColour = new Colour(0,0,0);
        // let mockCanvas = [
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]],
        //     [[black],[black],[black],[black],[black],[black]]
        // ];

        let canvas = new Array(this.width);
        for(let row = 0; row < this.width; row++){

            canvas[row] = new Array(this.height);

            for(let height = 0; height < this.height; height++){
                canvas[row][height] = black;
            }
        }



        return canvas;
    }
    width: number;    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

    }
}
