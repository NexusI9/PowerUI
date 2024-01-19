import { BaseTemplate, Sidepanel } from "./template";

export type DevAction = 'CSS' | 'TAILWIND' | 'LESS' | 'SASS' | 'SCSS' | 'STYLUS';

interface DevBaseConfig{
    nameformat:string;
}

export interface DevPaintConfig extends DevBaseConfig {
    colorformat: 'RGB' | 'HEX' | 'HSL';
    prefix: string;
}

export interface DevTextConfig extends DevBaseConfig {
    basesize: number;
    unit:'px'|'em';
}

export interface Dev extends BaseTemplate {
    sidepanel: Sidepanel;
    code?: string;
}