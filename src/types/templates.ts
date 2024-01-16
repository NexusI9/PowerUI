import { Dropdown, Input, InputArray, Slider, Checkbox, TextArea, Button } from "src/types/input";
import { ColorAdjustConfig, ColorConfig, TextConfig } from "./workbench";
import { ExportPaintConfig, ExportTextConfig } from "./export";
import { ContextMenuCommand } from "./contextmenu";
import { MultiArray } from "./global";

export type TemplateConfig = ColorConfig
    & TextConfig
    & ColorAdjustConfig
    & ExportPaintConfig
    & ExportTextConfig;

export type TemplateInput =
    { type: 'INPUT'; attributes: Input; configKey?: keyof TemplateConfig; }
    | { type: 'DROPDOWN'; attributes: Dropdown; configKey?: keyof TemplateConfig; }
    | { type: 'CHECKBOX'; attributes: Checkbox; configKey?: keyof TemplateConfig; }
    | { type: 'INPUT_ARRAY'; attributes: InputArray; configKey?: keyof TemplateConfig; }
    | { type: 'SLIDER'; attributes: Slider; configKey?: keyof TemplateConfig; }
    | { type: 'TEXT_AREA'; attributes: TextArea; configKey?: keyof TemplateConfig; }
    | { type: 'BUTTON'; attributes: Button; configKey?: keyof TemplateConfig; }

export type TemplateText =
    { type: 'HEADER'; attributes: { value: string; } };


export interface SidepanelOption extends ContextMenuCommand {
    content: MultiArray<TemplateInput | TemplateText>;
};

export interface Sidepanel {
    active?: string;
    options: MultiArray<SidepanelOption>;
}

export interface BaseTemplate {
    sidepanel: Sidepanel;
    type: 'PAINT' | 'TEXT' | 'DEV';
    config?: Partial<TemplateConfig>;
}