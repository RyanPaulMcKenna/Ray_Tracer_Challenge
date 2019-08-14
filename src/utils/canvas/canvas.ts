import { IColour, Colour } from "../functions/utils";


export interface ICanvas{
    pixelAt(row: number, col: number): IColour;
    writePixel(row: number, col: number, colour: IColour): Canvas;
    width: number;
    height: number;
    canvas: IColour[][];
}

export class Canvas implements ICanvas{

    pixelAt(row: number, col: number): IColour {
        return this.canvas[row][col];
    }

    canvas: IColour[][];

    width: number;    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        let canvas = new Array(this.height);
        let black: IColour = new Colour(0,0,0);


        for(let col = 0; col < this.height; col++){

            canvas[col] = [];

            for(let row = 0; row < this.width; row++){
                canvas[col].push(black);

            }
        }

        this.canvas = canvas;
    }

    writePixel(col: number, row:number, colour: IColour): ICanvas {

        this.canvas[col][row] = colour;
        return this
    }
}
