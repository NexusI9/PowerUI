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

export interface ShadeSet extends Partial<PaintStyle>{
    contrast:Contrast;
    primary?:boolean;
}