export interface TextArrayItem {
    family: string;
    loaded: boolean;
    style: Array<string>;
}

interface FontOptions {
    fontFamily?: boolean;
    fontSize?: boolean;
    letterSpacing?: boolean;
    lineHeight?: boolean;
    style?: boolean;
}

export interface TextSet extends Partial<TextStyle> {
    index?: number | string;
    options?:FontOptions;
}

export type TextDico = { [key: string]: TextArrayItem };

export interface ExportGroupText {
    detail: {
        topRow: string | JSX.Element;
        bottomRow: string | JSX.Element;
        style?:any;
    }
    body: {
        content: string | JSX.Element;
        style: any;
    }
}