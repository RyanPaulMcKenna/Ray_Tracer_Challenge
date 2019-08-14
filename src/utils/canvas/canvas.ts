import { IColour, Colour } from "../functions/utils";


export interface ICanvas{
    pixelAt(canvas: ICanvas, row: number, col: number): IColour;
    writePixel(canvas: ICanvas, row: number, col: number, colour: IColour): void;
    getCanvas(): IColour[][];
    width: number;
    height: number;
    canvas: IColour[][];
}

export class Canvas implements ICanvas{
    pixelAt(canvas: ICanvas, row: number, col: number): IColour {
        return this.canvas[row][col];
    }

    canvas: IColour[][];

    width: number;    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        let canvas = new Array(this.height);
        let black: IColour = new Colour(0,0,0);
        let temp = new Array(this.width);


        for(let row = 0; row < this.height; row++){

            canvas[row] = temp;

            for(let col = 0; col < this.width; col++){
                canvas[row][col] = black;
            }
        }

        this.canvas = canvas;
    }

    getCanvas(): IColour[][]{
        return this.canvas;
    }

    writePixel(canvas: ICanvas, row: number, col: number, colour: IColour): void {

        this.canvas[row][col] = colour;
    }
}
