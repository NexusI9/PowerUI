
export interface Option{
    icon: string;
    onClick?: any;
    toolTip?: string;
    disabled?:boolean;
}



export interface ButtonPad {
    icon: string;
    text: string;
    onClick:any;
}


export interface Folder{
    title:string;
    children:React.JSX.Element; 
    hideHeader?:boolean;
    custom?:FolderCustom;
    allowEdit?:boolean;
    attributes:StyleFolder;
    level?:number;
    root?:boolean;
}

export interface FolderCustom{
    options?:{
        add?:{icon:string};
        kebab?:Array<ContextMenuCommand>;
    }
}


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


export type DisplayMode = "grid"|"list";

export interface MousePosition{
    x:number;
    y:number;
}

export interface ContextMenuCommand{
    text:string; 
    action:string;
    payload:any;
}

export interface ContextMenu{
    commands: Array<ContextMenuCommand> | Array<Array<ContextMenuCommand>>;
    position: MousePosition;
    id:number | string;
}


export type ToolTipItem  = {type:'INPUT'; value:string; action:string; payload:any, custom:string} | {type:'TEXT'; value:string;}
export type ToolTip = Array<ToolTipItem>; 
