import { PaintSet } from "./shade";
import { TextSet } from "./text";
import { BaseTemplate, BaseConfig } from "@ctypes/template";

export type ColorAction =
    'SHADE'
    | 'TINT'
    | 'INTERPOLATION'
    | 'MATERIAL'
    | 'TONE'
    | 'ANT'
    | 'ORBIT'
    | 'ATLASSIAN'
    | 'MANTINE'
    | 'COLORADJUST'
    | 'TAILWIND';

export type TextAction =
    'SCALE'
    | 'MATERIAL'
    | 'FLUTTER'
    | 'APPLE'
    | 'CARBON'
    | 'TEXTADJUST';


export interface CreateColorConfig extends BaseConfig {
    name?: string;
    colorStart?: string | RGB;
    colorEnd?: string | RGB;
    mode?: 'rgb' | 'hsl' | 'lab' | 'lch';
    steps?: number;
    palette?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutralVariant';
    theme?: 'default' | 'dark';
    keys?: Array<number>;
    preserve?: boolean;
}

export interface AdjustColorConfig extends BaseConfig {
    hue?: number;
    saturation?: number;
    contrast?: number;
    brightness?: number;
    temperature?: number;
    tint?: number;
    folder?: string;
    styles: Array<PaintStyle>;
    key?: string;
    value?: string | number | boolean;
}

export interface AdjustTextConfig extends BaseConfig {
    fontScale?: number;
    typeface?: string | undefined;
    styles: Array<TextStyle>;
    roundValue?: boolean;
    key?: string;
    value?: string | number | boolean;
}

export interface CreateTextConfig extends BaseConfig {
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

export interface Workbench extends BaseTemplate {
    set?: Set;
}

export type Set = Array<TextSet | PaintSet>;

