import { BaseTemplate, Sidepanel } from "./template";

export interface BaseConfig {
    typeface: string;
}

export interface ExportPaintConfig extends BaseConfig {
    swatchBorderRadius: string;
    layout: 'Column' | 'Row';
    rgb: boolean;
    hex: boolean;
    cmyk: boolean;
    pantone: boolean;
    hsl: boolean;
    contrastRatio: boolean;
    colorSeparator: string;
}


export interface ExportTextConfig extends BaseConfig {
    fontFamily: boolean;
    fontWeight: boolean;
    basesize: number;
}


export interface Export extends BaseTemplate {
    sidepanel: Sidepanel;
    type: 'TEXT' | 'PAINT';
    config?: ExportPaintConfig | ExportTextConfig;

}