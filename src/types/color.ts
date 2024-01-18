export interface ColorHSL{
    h:number;
    s:number;
    l:number;
    a?:number;
}


export type ColorOutput = 'STRING' | 'OBJECT';


export interface CreateColor{
    folder:string;
    name:string;
    style?: PaintStyle;
}