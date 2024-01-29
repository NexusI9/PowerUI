export interface TextArrayItem {
    family: string;
    loaded: boolean;
    style: Array<string>;
}

interface TextOptions {
    fontFamily?: boolean;
    fontSize?: boolean;
    letterSpacing?: boolean;
    lineHeight?: boolean;
    style?: boolean;
    displayMode?: 'list' | 'grid';
    lineHeightBorder?: boolean;
}

export interface TextSet extends Partial<TextStyle> {
    index?: number | string;
    options?: TextOptions;
}

export type TextDico = { [key: string]: TextArrayItem };

export interface ExportGroupText {
    detail: {
        topRow: string | JSX.Element;
        bottomRow: string | JSX.Element;
        style?: any;
    }
    body: {
        content: string | JSX.Element;
        style: any;
    }
}