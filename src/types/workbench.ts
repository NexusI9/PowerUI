import { StyleFolder } from "src/types/style";
import { PaintSet } from "./shade";
import { ContextMenuCommand } from "./contextmenu";
import { MultiArray } from "./global";
import { TextSet } from "./text";
import { TemplateInput } from '@ctypes/templates';


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




export interface SidepanelOption extends ContextMenuCommand {
    content: MultiArray<TemplateInput>;
};

export interface Sidepanel {
    active?: string;
    options: MultiArray<SidepanelOption>;
}


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

export interface Workbench {
    active?: boolean;
    type: 'PAINT' | 'TEXT';
    folder: StyleFolder | null;
    title: string;
    sidepanel: Sidepanel;
    footer?: Footer;
    config: ColorConfig | TextConfig | ColorAdjustConfig;
    set?: Set;
}

export type Set = Array<TextSet | PaintSet>;

