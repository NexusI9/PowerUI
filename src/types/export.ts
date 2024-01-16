import { MultiArray } from "./global";
import { TemplateInput, TemplateText } from "./templates";

export interface BaseConfig {
    typeface: string;
    frameBorderRadius: string;
}

export interface ExportPaintConfig extends BaseConfig {
    swatchBorderRadius: string;
    layout: 'COLUMN' | 'ROW';
    rgb: boolean;
    hex: boolean;
    cmyk: boolean;
    pantone: boolean;
    hsl: boolean;
    contrast: boolean;
}


export interface ExportTextConfig extends BaseConfig {
    fontFamily: boolean;
    fontWeight: boolean;
    fontSize: boolean;
}


export interface Export {
    active: boolean;
    sidepanel: MultiArray<TemplateInput | TemplateText>
    type: 'TEXT' | 'PAINT' | 'DEV';
    config?: ExportPaintConfig | ExportTextConfig;

}