import { Canvas, ICanvas } from "../utils/canvas/canvas";
import { Point, Vector, IColour } from "../utils/functions/utils";

export interface IProjectile{
    position: Point;    velocity: Vector;
}

export class Projectile implements IProjectile{
    position: Point;    velocity: Vector;
    constructor(p: Point, v: Vector){
        this.position = p;
        this.velocity = v;
    }
}

export interface IEnvironment{
    gravity: Vector;
    wind: Vector;
}

export class Environment implements IEnvironment{
    gravity: Vector;    wind: Vector;
    constructor(g: Vector, w: Vector){
        this.gravity = g;
        this.wind = w;
    }

}

export function tick(env: Environment, proj: Projectile): Projectile{
    let position = proj.position.plus(proj.velocity);
    let velocity = proj.velocity.plus(env.gravity).plus(env.wind);

    return new Projectile(position, velocity);

}

export interface IPath{

    canvas: ICanvas;
    projectile: Projectile;
    environment: Environment;
    colour: IColour;

}

export function outOfBounds(canvas: ICanvas, position: Point): Boolean{

    if(position.x > canvas.width-1 || position.y > canvas.height-1){
        return true;
    }
    else{
        return false;
    }
}

export function trajectory(canvas: Canvas, environment: Environment, projectile: Projectile, colour: IColour): IPath {

    let p = tick(environment,projectile);
    let col: IColour = colour;
    let newCanvas: ICanvas = canvas;
    //If the new point is out of bounds then don't write the pixel
    if(!outOfBounds(canvas,p.position)){
        newCanvas = canvas.writePixel(Math.round(p.position.x), Math.round(p.position.y), col);

    }


    let result: IPath = {canvas: newCanvas, projectile: p, environment: environment, colour: colour}

    return result;
}
