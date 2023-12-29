import { Dropdown, Input, Slider, InputAmount } from "@ctypes/input";
import { Shade } from "./shade";

export type SetMethod = 'SHADE' | 'TINT' | 'INTERPOLATION' | 'MATERIAL' | 'FONT' | 'TONE';

export type SidepanelList = 
{ type: 'INPUT'; attributes: Input; configKey: keyof ColorConfig | keyof FontConfig;} |
{ type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof ColorConfig | keyof FontConfig; } |
{ type: 'COLOR'; attributes: Input; configKey: keyof ColorConfig | keyof FontConfig; } |
{ type: 'AMOUNT'; attributes: InputAmount; configKey: keyof ColorConfig |keyof FontConfig; } |
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

interface BaseConfig{
    action:SetMethod;
}

export interface ColorConfig extends BaseConfig {
    name?: string;
    colorStart?: string;
    colorEnd?: string;
    mode?: 'RGB' | 'HSL' | 'LAB' | 'LCH';
    steps?: number;
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
    parent: string;
    title: string;
    sidepanel: Sidepanel;
    footer?: Footer;
    config?: ColorConfig | FontConfig;
    set?: Set;
}

