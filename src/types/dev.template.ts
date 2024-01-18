import { BaseTemplate, Sidepanel } from "./template";

export type DevAction = 'CSS' | 'TAILWIND' | 'LESS' | 'SASS' | 'SCSS' | 'STYLUS';

export interface DevPaintConfig {
    colorformat: 'RGB' | 'HEX' | 'HSL';
    prefix: string;
}

export interface DevTextConfig {
    basesize: string;
    unit:'px'|'em';
}

export interface Dev extends BaseTemplate {
    sidepanel: Sidepanel;
    code?: string;
}