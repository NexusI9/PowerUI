import { Dropdown, Input, InputArray, Slider, Checkbox } from "@ctypes/input";
import { StyleFolder } from "@ctypes/style";
import { Shade } from "./shade";
import { ColorRGB } from "./color";
import { ContextMenuCommand } from "./contextmenu";
import { MultiArray } from "./global";

export type SetMethod = 'SHADE' |
    'TINT' |
    'INTERPOLATION' |
    'MATERIAL' |
    'FONT' |
    'TONE' |
    'ANT' |
    'ORBIT' |
    'ATLASSIAN' |
    'MANTINE' |
    'COLORADJUST' |
    'TAILWIND';

export type SidepanelInput =
    { type: 'INPUT'; attributes: Input; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'CHECKBOX'; attributes: Checkbox; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'INPUT_ARRAY'; attributes: InputArray; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'SLIDER'; attributes: Slider; configKey: keyof ColorAdjustConfig; }

export interface SidepanelOption extends ContextMenuCommand {
    content: MultiArray<SidepanelInput>;
};

export interface Sidepanel {
    active?: string;
    options: MultiArray<SidepanelOption>;
}

export type Set = Array<Shade>;

interface Footer {
    primaryAction: { text: string; action: string };
}

interface BaseConfig {
    action?: SetMethod;
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

export interface FontConfig extends BaseConfig {
    name?: string;
    baseSize?: number;
    ascendantScale?: string;
    ascendantSteps?: number;
    descendantScale?: string;
    descendantSteps?: number;
    roundValue?: boolean;
    device?: 'mobile' | 'desktop';
    typeface?: string;
}

export interface Workbench {
    active?: boolean;
    type: 'COLOR' | 'TEXT';
    folder: StyleFolder | null;
    title: string;
    sidepanel: Sidepanel;
    footer?: Footer;
    config: ColorConfig | FontConfig | ColorAdjustConfig;
    set?: Set;
}

