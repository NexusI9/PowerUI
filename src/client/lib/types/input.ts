export interface Input {
    type?: 'default' | 'discrete';
    value?: string | number;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    onEnter?: any;
}

type DropdownCommand = {text:string; action:string;};
export interface Dropdown extends Input{
    list:Array<DropdownCommand> | Array<Array<DropdownCommand>>;
}

export interface InputAmount extends Input{
    range:Array<number>;
}

export interface Slider{
    onChange?:any;
    background:string;
    range:Array<number>;
}

export interface InputColor extends Input{
    
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