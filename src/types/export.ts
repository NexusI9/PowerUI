import { MultiArray } from "./global";
import { BaseTemplate, Sidepanel, TemplateInput, TemplateText } from "./templates";

export interface BaseConfig {
    typeface: string;
}

export interface ExportPaintConfig extends BaseConfig {
    swatchBorderRadius: string;
    layout: 'COLUMN' | 'ROW';
    rgb: boolean;
    hex: boolean;
    cmyk: boolean;
    pantone: boolean;
    hsl: boolean;
    contrastRatio: boolean;
    colorSynthax:string;
}


export interface ExportTextConfig extends BaseConfig {
    fontFamily: boolean;
    fontWeight: boolean;
    fontSize: boolean;
}

export interface ExportDevConfig extends BaseConfig {
    language: string;
    format: 'RGB' | 'HEX' | 'HSL';
}


export interface Export extends BaseTemplate {
    sidepanel: Sidepanel;
    type: 'TEXT' | 'PAINT' | 'DEV';
    config?: ExportPaintConfig | ExportTextConfig;

}