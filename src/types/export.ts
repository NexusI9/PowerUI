import { MultiArray } from "./global";
import { TemplateInput } from "./templates";

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
    contrastRation: boolean;
}


export interface ExportTextConfig extends BaseConfig {
    fontFamily: boolean;
    fontWeight: boolean;
    fontSize: boolean;
}


export interface Export {
    active: string;
    sidepanel: MultiArray<TemplateInput>
    preview?: any;
    config?: ExportPaintConfig | ExportTextConfig;

}