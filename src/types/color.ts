export interface ColorRGB{
    r:number;
    g:number;
    b:number;
}

export interface ColorHSL{
    h:number;
    s:number;
    l:number;
}


export type ColorOutput = 'STRING' | 'OBJECT';


export interface CreateColor{
    folder:string;
    name:string;
    style?: PaintStyle;
}