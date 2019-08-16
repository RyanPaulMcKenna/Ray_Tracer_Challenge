import { Tuple } from "../functions/utils";

export interface IMatrix{
    asTuple(): Tuple;
    matrix: number[][];
}


export class IdentityMatrix implements IMatrix {

    asTuple(): Tuple {
        throw new Error("Method not implemented.");
    }

    constructor(){
        this.matrix = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    }

    matrix: number[][];


}

export class Matrix implements IMatrix{

    asTuple(): Tuple{


        if(this.matrix.length !== 4 && this.matrix[0].length !== 1)
        {
            throw new Error('Illegal operation: only column vectors of size 4 can be converted into type Tuple');
        }



        return new Tuple(this.matrix[0][0],this.matrix[1][0], this.matrix[2][0], this.matrix[3][0]);

    }
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

export function equalMatrices(a: IMatrix | Tuple, b: IMatrix | Tuple): Boolean{

    let matrixA: IMatrix;
    let matrixB: IMatrix;

    if(a instanceof Tuple){

        matrixA = a.asMatrix();

    }else{
        matrixA = a;
    }

    if(b instanceof Tuple){

        matrixB = b.asMatrix();

    }else{
        matrixB = b;
    }

    // Check if size is equal first to avoid computation if possible

    const rowA = matrixA.matrix.length;
    const rowB = matrixB.matrix.length;
    const colA = matrixA.matrix[0].length;
    const colB = matrixB.matrix[0].length;

    if(rowA !== rowB){
        return false;
    }
    if(colA !== colB){
        return false;
    }

    for (let row = 0; row < rowA; row++){
        for (let col = 0; col < colA; col++){
            if(matrixA.matrix[row][col] !== matrixB.matrix[row][col] ){
                return false;
            }
        }
    }

    return true;
}

export function determinant(mat: Matrix): number{

    if(mat.matrix.length !== 2 || mat.matrix[0].length !== 2)
        throw new Error('Illegal Operaton: This function can only be used on 2x2 matrices.');


    let a = mat.matrix[0][0];
    let b = mat.matrix[0][1];
    let c = mat.matrix[1][0];
    let d = mat.matrix[1][1];


    return (a*d-b*c);

}

export function transpose(a: IMatrix): IMatrix{

    let transposeA: IMatrix = new Matrix(a.matrix.length,a.matrix[0].length,0);

    for(let row = 0; row < a.matrix.length; row++){
        for(let col = 0; col < a.matrix[0].length; col++){
            transposeA.matrix[col][row] = a.matrix[row][col];
        }
    }

    return transposeA;
}


export function multiply(a: IMatrix, b: IMatrix): IMatrix{

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

        if(colIndex === colSize)
            done = true;

    }

    return c;

}
