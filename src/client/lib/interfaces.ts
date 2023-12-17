
export interface Option{
    icon: string;
    onClick?: any;
    toolTip?: string;
}


export interface ButtonPad {
    icon: string;
    text: string;
    onClick:any;
}


export interface Folder{
    title:string;
    children:React.JSX.Element; 
    display:"grid" | "list";
}


export interface StyleItem{
    id:string; 
    key:string; 
    name:string;
    title?:string;
    paints: Array<Paint|Text>;
    type:"style";
}

export interface StyleFolder{
    title:string;
    type:"folder";
    children:Array<StyleItem | StyleFolder>;
}