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
}


export type DropdownCommand = { text: string; action?: string; onClick?: any; };
export interface Dropdown extends Input {
    list: Array<DropdownCommand> | Array<Array<DropdownCommand>>;
}


export interface Slider {
    value?: number;
    onChange?: any;
    background: string;
    placeholder: string;
    range?:Array<number>;
    step?:number;
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