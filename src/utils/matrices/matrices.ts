import { AssertionError } from "assert";

export interface IMatrix{
    matrix: number[][];
}

export class Matrix implements IMatrix{
    matrix: number[][];
    constructor(matrix: number[][]){
        this.matrix = matrix;
    }

}
