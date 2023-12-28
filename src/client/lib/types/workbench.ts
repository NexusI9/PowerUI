import { Dropdown, Input, Slider, InputAmount } from "@ctypes/input";
import { Shade } from "./shade";

export type SidepanelList = { type: 'INPUT'; attributes: Input; configKey: keyof ColorConfig; } |
{ type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof ColorConfig; } |
{ type: 'COLOR'; attributes: Input; configKey: keyof ColorConfig; } |
{ type: 'AMOUNT'; attributes: InputAmount; configKey: keyof ColorConfig; } |
{ type: 'SLIDER'; attributes: Slider; configKey: keyof ColorConfig; }

export interface SidepanelOptions {
    text: string;
    content: Array<SidepanelList> | Array<Array<SidepanelList>>;
};

export interface Sidepanel {
    active?: string;
    options: Array<SidepanelOptions> | Array<Array<SidepanelOptions>>;
}

export type Set = Array<Shade>;

interface Footer {
    primaryAction: { text: string; action: string };
}

interface ColorConfig {
    name?: string;
    colorStart?: string;
    colorEnd?: string;
    mode?: 'RGB' | 'HSL' | 'LAB' | 'LCH';
    steps?: number;
}

interface FontConfig {
    name: string;
    baseSize: number;
    scale: string;
    roundvalue: boolean;
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

