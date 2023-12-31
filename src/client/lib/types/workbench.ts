import { Dropdown, Input, Slider } from "@ctypes/input";
import { Shade } from "./shade";
import { ColorRGB } from "./color";

export type SetMethod = 'SHADE' | 'TINT' | 'INTERPOLATION' | 'MATERIAL' | 'FONT' | 'TONE' | 'ANT' | 'ORBIT' | 'ATLASSIAN' | 'MANTINE' | 'CHAKRA';

export type SidepanelList =
    { type: 'INPUT'; attributes: Input; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof ColorConfig | keyof FontConfig; } |
    { type: 'SLIDER'; attributes: Slider; configKey: keyof ColorConfig | keyof FontConfig; }

export interface SidepanelOption {
    text: string;
    action: SetMethod;
    content: Array<SidepanelList> | Array<Array<SidepanelList>>;
};

export interface Sidepanel {
    active?: string;
    options: Array<SidepanelOption> | Array<Array<SidepanelOption>>;
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
}

export interface FontConfig extends BaseConfig {
    name?: string;
    baseSize?: number;
    scale?: string;
    roundvalue?: boolean;
}

export interface Workbench {
    active?: boolean;
    type: 'COLOR' | 'FONT';
    folder: string;
    title: string;
    sidepanel: Sidepanel;
    footer?: Footer;
    config: ColorConfig | FontConfig;
    set?: Set;
}

