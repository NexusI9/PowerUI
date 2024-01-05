export interface MousePosition{
    x:number;
    y:number;
}

export interface Command{
    text:string;
    onClick:any;
}

export interface Label{children?:React.ReactNode; iconLeft?:string; iconRight?:string; size?:'SMALL'|'MID'|'BIG'; }

export type MultiArray<T> = Array<T>|Array<Array<T>>;