import { Dropdown, Input, InputArray, Slider, Checkbox, TextArea, Button } from "src/types/input";
import { AdjustColorConfig, CreateColorConfig, ColorAction, CreateTextConfig, TextAction, AdjustTextConfig } from "./workbench.template";
import { ExportPaintConfig, ExportTextConfig } from "./export.template";
import { ContextMenuCommand } from "./contextmenu";
import { MultiArray } from "./global";
import { StyleFolder } from "./style";
import { DevAction, DevPaintConfig, DevTextConfig } from "./dev.template";
import { RenameConfig } from "./rename";

export type TemplateConfig = BaseConfig
    //Create
    & CreateColorConfig
    & CreateTextConfig
    //Adjust
    & AdjustColorConfig
    & AdjustTextConfig
    //Export
    & ExportPaintConfig
    & ExportTextConfig
    //Dev
    & DevPaintConfig
    & DevTextConfig
    //Rename
    & RenameConfig;


export interface BaseConfig {
    action?: ColorAction | TextAction | DevAction;
}

export type TemplateInput =
    { type: 'INPUT'; attributes: Input; configKey?: keyof TemplateConfig; }
    | { type: 'DROPDOWN'; attributes: Dropdown; configKey?: keyof TemplateConfig; }
    | { type: 'CHECKBOX'; attributes: Checkbox; configKey?: keyof TemplateConfig; }
    | { type: 'INPUT_ARRAY'; attributes: InputArray; configKey?: keyof TemplateConfig; }
    | { type: 'SLIDER'; attributes: Slider; configKey?: keyof TemplateConfig; }
    | { type: 'TEXT_AREA'; attributes: TextArea; configKey?: keyof TemplateConfig; }
    | { type: 'BUTTON'; attributes: Button; configKey?: keyof TemplateConfig; }
    | { type: 'TOGGLE'; attributes: Checkbox; configKey?: keyof TemplateConfig; }

export type TemplateText =
    { type: 'HEADING'; attributes: { value: string; } };


export interface SidepanelOption extends ContextMenuCommand {
    heading?: string;
    content: MultiArray<TemplateInput | TemplateText>;
};

export interface Sidepanel {
    active?: string;
    options: MultiArray<SidepanelOption>;
}

interface Footer {
    primaryAction: { value?: string; action?: string; role?: Button['role'], destroy?: boolean; };
}

export interface BaseTemplate {
    active?: boolean;
    title: string;
    folder?: StyleFolder;
    footer?: Footer;
    sidepanel: Sidepanel;
    type: 'PAINT' | 'TEXT';
    config?: Partial<TemplateConfig>;
    reducer: string;
}

export interface TemplateSlice {
    dispatch: {
        onUpdate(): any;
        onUpdateAction?(): any;
    }
}