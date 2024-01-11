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


type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
    [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;