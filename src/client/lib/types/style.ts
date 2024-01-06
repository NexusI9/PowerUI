export type Styles = PaintStyle | TextStyle;

export interface StyleFolder{
    name:string;
    type:"FOLDER";
    fullpath:string;
    styles:Array<Styles>;
    level:number;
    folders:Array<StyleFolder>;
}


export type DisplayMode = "grid"|"list";