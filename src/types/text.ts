export interface TextArrayItem {
    family: string;
    loaded: boolean;
    style: Array<string>;
}

export interface TextSet extends Partial<TextStyle> {
    index?: number | string;
}

export type TextDico = { [key: string]: TextArrayItem };

/*
detail: {
    topRow: 'Font Family Primary',
    bottomRow: 'Inter'
},
body: { content: 'Inter', style: { fontSize: '32px' } }
*/

export interface ExportGroupText {
    detail: {
        topRow: string | JSX.Element;
        bottomRow: string | JSX.Element;
    }
    body: {
        content: string | JSX.Element;
        style: any;
    }
}