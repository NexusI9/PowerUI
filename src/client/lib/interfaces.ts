
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
    options:Array<Option>;
    children:React.JSX.Element; 
}