import React from 'react'
import { Colour } from '../utils/functions/utils';
// @ts-ignore
import { Pixel } from './Pixel.tsx';
import './Canvas.css';

interface IColumnProps{
    pixel: Colour;
}


export class Column extends React.Component<IColumnProps>{

    public render(){
        return(
        <div className="column">
            <Pixel pixel={this.props.pixel}></Pixel>
        </div>
        );

    }
}
