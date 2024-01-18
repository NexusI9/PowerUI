import { BaseTemplate, Sidepanel } from "./template";

export type DevAction = 'CSS' | 'TAILWIND';

export interface DevPaintConfig {
    colorFormat: 'RGB' | 'HEX' | 'HSL';
    prefix: string;
}

export interface Dev extends BaseTemplate {
    sidepanel: Sidepanel;
    code?: string;
}