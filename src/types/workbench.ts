import { StyleFolder } from "@ctypes/style";
import { PaintSet } from "./shade";
import { TextSet } from "./text";
import { BaseTemplate, Sidepanel } from "@ctypes/templates";

export type ColorSetMethod =
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

export type TextSetMethod =
    'SCALE' 
    | 'MATERIAL'
    |'FLUTTER'
    | 'APPLE'
    | 'CARBON';




interface Footer {
    primaryAction: { value: string; action: string };
}

interface BaseConfig {
    action?: ColorSetMethod | TextSetMethod;
}

export interface ColorConfig extends BaseConfig {
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

export interface Workbench extends BaseTemplate{
    active?: boolean;
    folder: StyleFolder | null;
    title: string;
    footer?: Footer;
    set?: Set;
}

export type Set = Array<TextSet | PaintSet>;

