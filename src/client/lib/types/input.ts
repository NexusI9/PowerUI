export interface Input {
    type?: 'DEFAULT' | 'COLOR' | 'AMOUNT';
    value?: string | number;
    dynamicValue?: string | number;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    onEnter?: any;
    style?: { stroke?: boolean; label?: boolean, minified?: boolean; }
    range?: Array<number>;
    step?: number;
    portal?: {
        key?: string;                    //id
        target?: string | undefined;     //targeted id
        value?: number | string;         //value to replace at target
        override?: boolean;              //over ride after first manual input
        colorformat?: 'HEX' | 'NAME'    //output either color by Name or Hex
    }
}


export type DropdownCommand = { icon?: string; text: string; action?: string; onClick?: any; };
export interface Dropdown extends Input {
    list: Array<DropdownCommand> | Array<Array<DropdownCommand>>;
}


export interface Slider {
    value?: number;
    onChange?: any;
    background: string;
    placeholder: string;
    range?: Array<number>;
    step?: number;
}


export interface Button {
    text: string;
    onClick: any;
    role: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
}

export interface ButtonPad {
    icon: string;
    text: string;
    onClick: any;
}

export interface InputArray {
    value: Array<number | string>;
    min?: number;
    max?: number;
    type: 'NUMBER' | 'STRING';
    placeholder: string;
    float?: boolean;
    onChange?: any;
    style?:{label?:boolean};
}