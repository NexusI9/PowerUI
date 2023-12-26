export interface StyleColor{
    id:string; 
    figmaKey:string; 
    name:string;
    title?:string;
    paints: Array<Paint>;
    type:"COLOR";
}

export interface StyleText{
    id:string; 
    figmaKey:string; 
    name:string;
    title?:string;
    texts: Array<Text>;
    type:"TEXT";
}

export type Styles = StyleColor | StyleText;

export interface StyleFolder{
    title:string;
    type:"FOLDER";
    fullpath:string;
    styles:Array<Styles>;
    level:number;
    folders:Array<StyleFolder>;
}


export type DisplayMode = "grid"|"list";