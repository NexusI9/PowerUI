import { Dropdown, Input, InputArray, Slider, Checkbox, TextArea, Button } from "src/types/input";
import { ColorAdjustConfig, ColorConfig, TextConfig } from "./workbench";
export type TemplateConfig = ColorConfig & TextConfig & ColorAdjustConfig;

export type TemplateInput =
    { type: 'INPUT'; attributes: Input; configKey: keyof TemplateConfig; }
    | { type: 'DROPDOWN'; attributes: Dropdown; configKey: keyof TemplateConfig; }
    | { type: 'CHECKBOX'; attributes: Checkbox; configKey: keyof TemplateConfig; }
    | { type: 'INPUT_ARRAY'; attributes: InputArray; configKey: keyof TemplateConfig; }
    | { type: 'SLIDER'; attributes: Slider; configKey: keyof TemplateConfig; }
    | { type: 'TEXT_AREA'; attributes: TextArea; configKey: keyof TemplateConfig; }
    | { type: 'BUTTON'; attributes: Button; configKey: keyof TemplateConfig; }