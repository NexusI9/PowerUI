import { Color, Folder, StyleFolder, StyleItem } from "@lib/interfaces";
import { hexToRgb } from "./utils.color";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";

export function clone(val: any) {
    return JSON.parse(JSON.stringify(val))
}



export function clamp(min: number, value: number, max: number): number {
    if (value <= min) { return min; }
    if (value >= max) { return max; }
    return value;
}


