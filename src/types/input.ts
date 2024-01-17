import { ContextMenuCommand } from 'src/types/contextmenu';
import { FetchAction, Label, MultiArray } from './global';

export interface Input {
    type?: 'DEFAULT' | 'COLOR' | 'AMOUNT' | 'DRAG';
    value?: string | number;
    dynamicValue?: string | number;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    onEnter?: any;
    appearance?: {
        stroke?: boolean;
        label?: boolean,
        minified?: boolean;
        arrow?: boolean;
    };
    style?: any;
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


export interface Dropdown extends Input {
    list: MultiArray<ContextMenuCommand>;
}

export interface Checkbox {
    label?: string;
    value?: boolean;
    onChange?: any;
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
    value: string;
    onClick: any;
    role: 'PRIMARY' | 'SECONDARY' | 'TERTIARY';
}

export interface ButtonPad {
    icon: string;
    value: string;
    onClick: any;
}

export interface ButtonIcon {
    icon: string;
    onClick?: any;
    onMouseDown?: any;
    onMouseUp?: any;
    disabled?: boolean;
    appearance?: { hover?: boolean };
    className?: string;
}

export interface InputArray {
    value: Array<number | string>;
    min?: number;
    max?: number;
    type: 'NUMBER' | 'STRING';
    placeholder: string;
    float?: boolean;
    onChange?: any;
    appearance?: { label?: boolean };
}

export interface Tab extends Label {
    value: string;
    active?: boolean;
    onClick?(props: Tab): any;
}

export interface TextArea {
    value?: string | FetchAction;
    readonly?: boolean;
    resize?: boolean;
}

