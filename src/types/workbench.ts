import { Dropdown, Input, InputArray, Slider, Checkbox } from "src/types/input";
import { StyleFolder } from "src/types/style";
import { ShadeSet } from "./shade";
import { ColorRGB } from "./color";
import { ContextMenuCommand } from "./contextmenu";
import { MultiArray } from "./global";

export type ColorSetMethod =
    'SHADE' |
    'TINT' |
    'INTERPOLATION' |
    'MATERIAL' |
    'TONE' |
    'ANT' |
    'ORBIT' |
    'ATLASSIAN' |
    'MANTINE' |
    'COLORADJUST' |
    'TAILWIND';

export type TextSetMethod =
    'SCALE' |
    'MATERIAL' |
    'FLUTTER' |
    'APPLE' |
    'CARBON';


export type SidepanelInput =
    { type: 'INPUT'; attributes: Input; configKey: keyof ColorConfig | keyof TextConfig; } |
    { type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof ColorConfig | keyof TextConfig; } |
    { type: 'CHECKBOX'; attributes: Checkbox; configKey: keyof ColorConfig | keyof TextConfig; } |
    { type: 'INPUT_ARRAY'; attributes: InputArray; configKey: keyof ColorConfig | keyof TextConfig; } |
    { type: 'SLIDER'; attributes: Slider; configKey: keyof ColorAdjustConfig; }

export interface SidepanelOption extends ContextMenuCommand {
    content: MultiArray<SidepanelInput>;
};

export interface Sidepanel {
    active?: string;
    options: MultiArray<SidepanelOption>;
}


interface Footer {
    primaryAction: { text: string; action: string };
}

interface BaseConfig {
    action?: ColorSetMethod | TextSetMethod;
}

export interface ColorConfig extends BaseConfig {
    name?: string;
    colorStart?: string | ColorRGB;
    colorEnd?: string | ColorRGB;
    mode?: 'rgb' | 'hsl' | 'lab' | 'lch';
    steps?: number;
    palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutralVariant';
    theme?: 'default' | 'dark';
    keys?: Array<number>;
    preserve?: boolean;
}

export interface ColorAdjustConfig extends BaseConfig {
    hue?: number;
    saturation?: number;
    contrast?: number;
    brightness?: number;
    temperature?: number;
    tint?: number;
    folder?: string;
    styles: Array<PaintStyle>;
}

export interface TextConfig extends BaseConfig {
    name?: string;
    baseSize?: number;
    ascendantScale?: string;
    ascendantSteps?: number;
    descendantScale?: string;
    descendantSteps?: number;
    roundValue?: boolean;
    device?: 'mobile' | 'desktop';
    typeface?: string | undefined;
}

export interface Workbench {
    active?: boolean;
    type: 'COLOR' | 'TEXT';
    folder: StyleFolder | null;
    title: string;
    sidepanel: Sidepanel;
    footer?: Footer;
    config: ColorConfig | TextConfig | ColorAdjustConfig;
    set?: Set<ShadeSet | TextStyle>;
}

export interface WorkbenchComponent<T> {
    style: T;
    index?: number;
}

export type Set<T> = Array<WorkbenchComponent<T>>;

