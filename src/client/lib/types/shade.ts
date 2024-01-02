import { ColorRGB } from "./color";

export interface ContrastPropreties{
    ratio:number;
    large:'AAA' | 'AA' | undefined;
    regular: 'AAA' | 'AA' | undefined;
}

export interface Contrast{
    black:ContrastPropreties;
    white:ContrastPropreties;
}

export interface Shade{
    color:ColorRGB;
    name:string;
    contrast:Contrast;
    primary?:boolean;
}