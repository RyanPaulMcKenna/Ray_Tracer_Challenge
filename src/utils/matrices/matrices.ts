import { number } from "prop-types";

export interface IMatrix{
    matrix: number[][];
}


export class Matrix implements IMatrix{
    matrix: number[][];

    constructor(row: number, column: number, fill: number){

        let mat = new Array(row);

        for (let rowIndex = 0; rowIndex < row; rowIndex++){

            mat[rowIndex] = [];

            for( let colIndex = 0; colIndex < column; colIndex++){

                mat[rowIndex].push(fill);

            }

        }

        this.matrix = mat;

    }

}

export function equalMatrices(a: IMatrix, b: IMatrix): Boolean{

    // Check if size is equal first to avoid computation if possible

    const rowA = a.matrix.length;
    const rowB = b.matrix.length;
    const colA = a.matrix[0].length;
    const colB = b.matrix[0].length;

    if(rowA !== rowB){
        return false;
    }
    if(colA !== colB){
        return false;
    }

    for (let row = 0; row < rowA; row++){
        for (let col = 0; col < colA; col++){
            if(a.matrix[row][col] !== b.matrix[row][col] ){
                return false;
            }
        }
    }

    return true;
}


export function multiply(a: IMatrix, b:IMatrix): IMatrix{


    let c: IMatrix = new Matrix(a.matrix.length, b.matrix[0].length, 0);

    let rowSize = a.matrix.length;
    let colSize = a.matrix[0].length;

    let colIndex = 0;
    let rowOffset = 0;


    let done = false;

    while(!done){

        for (let row = 0; row < rowSize; row++ ){

            let temp = 0;

            for (let col = 0; col < colSize; col++ ){


                temp += a.matrix[row][col] * b.matrix[col][row+rowOffset+colIndex];

            }

            c.matrix[row][colIndex] = temp;

            --rowOffset;

        }

        ++colIndex;
        rowOffset = 0;

        if(colIndex === rowSize)
            done = true;

    }

    return c;


}
