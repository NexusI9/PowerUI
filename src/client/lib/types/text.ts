export interface TextArrayItem{
    family:string;
    loaded:boolean;
    style:Array<String>;
}

export type FontSet = Partial<TextStyle>;

export type TextDico = { [key: string]: TextArrayItem };