export interface TextArrayItem {
    family: string;
    loaded: boolean;
    style: Array<String>;
}

export interface TextSet extends Partial<TextStyle> {
    index?: number | string;
}

export type TextDico = { [key: string]: TextArrayItem };