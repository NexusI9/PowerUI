
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
    item:React.JSX.Element; 
}


export interface CleanStyle{
    id:string; 
    key:string; 
    name:string;
    paints: Array<Paint|Text>;
}

export interface Style{
    [key: string]: Style | CleanStyle; 
}