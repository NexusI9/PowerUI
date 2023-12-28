export interface Input {
    type?: 'DEFAULT' | 'COLOR' | 'AMOUNT' |'DISCRETE';
    value?: string | number;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    onEnter?: any;
    style?:{stroke?:boolean; label?:boolean}
}

export interface InputAmount extends Input{
    range:Array<number>;
}




export type DropdownCommand = {text:string; action?:string; onClick?:any; };
export interface Dropdown extends Input{
    list:Array<DropdownCommand> | Array<Array<DropdownCommand>>;
}


export interface Slider{
    onChange?:any;
    background:string;
    range:Array<number>;
}


export interface Button{
    text:string;
    onClick:any;
    role:'PRIMARY' | 'SECONDARY' | 'TERTIARY';
}

export interface ButtonPad {
    icon: string;
    text: string;
    onClick:any;
}