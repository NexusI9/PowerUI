import { Dropdown, Input, InputArray, Slider, Checkbox, TextArea, Button } from "src/types/input";
import { ColorAdjustConfig, ColorConfig, TextConfig } from "./workbench";
import { ExportPaintConfig, ExportTextConfig } from "./export";
export type TemplateConfig = ColorConfig
    & TextConfig
    & ColorAdjustConfig
    & ExportPaintConfig
    & ExportTextConfig

export type TemplateInput =
    { type: 'INPUT'; attributes: Input; configKey: keyof TemplateConfig | undefined; }
    | { type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof TemplateConfig | undefined; }
    | { type: 'CHECKBOX'; attributes: Checkbox; configKey: keyof TemplateConfig | undefined; }
    | { type: 'INPUT_ARRAY'; attributes: InputArray; configKey: keyof TemplateConfig | undefined; }
    | { type: 'SLIDER'; attributes: Slider; configKey: keyof TemplateConfig | undefined; }
    | { type: 'TEXT_AREA'; attributes: TextArea; configKey: keyof TemplateConfig | undefined; }
    | { type: 'BUTTON'; attributes: Button; configKey: keyof TemplateConfig | undefined; }

export type TemplateText =
    { type: 'HEADER'; attributes: { value: string; } }