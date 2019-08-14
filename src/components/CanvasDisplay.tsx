import React from 'react'
import { IColour } from '../utils/functions/utils';
// @ts-ignore
import { Row } from '../components/Row.tsx';
import  { ICanvas } from '../utils/canvas/canvas';


export class CanvasDisplay extends React.Component<ICanvas>{

    public render(){

        return <div id="canvas">
            {this.props.canvas.map((row: IColour[],index: number) => <Row key={index} row={row} /> )}

        </div>
    }

}
