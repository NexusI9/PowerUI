import { BaseTemplate, Sidepanel } from "./template";


export interface DevPaintConfig {
    language: 'CSS' | 'Tailwind';
    colorFormat: 'RGB' | 'HEX' | 'HSL';
}

export interface Dev extends BaseTemplate {
    sidepanel: Sidepanel;
    type: 'PAINT' | 'TEXT';
    config?: DevPaintConfig;
    code?:string;
}