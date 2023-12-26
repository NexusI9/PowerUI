
export interface ButtonPad {
    icon: string;
    text: string;
    onClick:any;
}


export interface Input {
    type?: 'default' | 'discrete';
    value?: string;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    onEnter?: any;
}

type DropdownCommand = {text:string; onClick:any;};
export interface Dropdown extends Input{
    list:Array<DropdownCommand> | Array<Array<DropdownCommand>>;
}

export interface AmountInput extends Input{
    range:Array<number>
}

export interface Slider{
    onChange?:any;
    background:string;
    range:Array<number>;
}