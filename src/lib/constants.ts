import { TextSet } from "@ctypes/text";
import { ContextMenu } from "src/types/contextmenu";

export const DEFAULT_STYLE_COLOR: SolidPaint = {
    "type": "SOLID",
    "visible": true,
    "opacity": 1,
    "blendMode": "NORMAL",
    "color": {
        "r": 0.8509804010391235,
        "g": 0.8509804010391235,
        "b": 0.8509804010391235
    },
    "boundVariables": {}
};

export const DEFAULT_STYLE_TEXT: TextSet = {
    "type":"TEXT",
    "name": "Style name",
    "fontSize": 16,
    "textDecoration": "NONE",
    "fontName": {
        "family": "Inter",
        "style": "Regular"
    },
    "letterSpacing": {
        "unit": "PERCENT",
        "value": 0
    },
    "lineHeight": {
        "unit": "AUTO"
    },
    "paragraphIndent": 0,
    "paragraphSpacing": 0,
    "listSpacing": 0,
    "textCase": "ORIGINAL",
    "hangingPunctuation": false,
    "hangingList": false,
    "leadingTrim": "NONE"
};

export const DEFAULT_TYPEFACE = 'Inter';

export const DEFAULT_TOOLTIP = {
    content: [],
    boundingBox: { x: 0, y: 0, width: 0, height: 0 }
}

export const DEFAULT_CONTEXT_MENU: ContextMenu = {
    id: 0,
    commands: [],
    position: { x: 0, y: 0 },
    activeCommand: undefined
};


export const MATERIAL_DEFAULT_KEYS = [0, 100, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 950, 980, 990, 1000];

export const GET_PAINT_STYLES_COMMAND: string = "GET_PAINT_STYLES";
export const GET_TEXT_STYLES_COMMAND: string = "GET_TEXT_STYLES";

export const DEFAULT_WINDOW_WIDTH: number = 750;
export const DEFAULT_WINDOW_HEIGHT: number = 655;
