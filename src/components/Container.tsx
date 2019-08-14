import React from 'react'
// @ts-ignore
import { CanvasDisplay } from './CanvasDisplay.tsx';
import  { ICanvas, Canvas } from '../utils/canvas/canvas';

let canvas: ICanvas = new Canvas(100,100)

export class Container extends React.Component{

    public render(){
        return(
        <div id="container">

           <CanvasDisplay canvas={canvas.canvas}/>

        </div>
        );

    }
}
