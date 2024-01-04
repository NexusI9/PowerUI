export const DEFAULT_STYLE_COLOR:Array<Paint> = [
    {
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
    }
];

export const DEFAULT_TOOLTIP = {
    content:[],
    boundingBox:{x:0, y:0, width:0, height:0}
}

export const DEFAULT_CONTEXT_MENU = {
    id:0,
    commands:[],
    position:{x:0, y:0}
};


export const MATERIAL_DEFAULT_KEYS = [0, 100, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 950, 980, 990, 1000];

export const GET_PAINT_STYLES_COMMAND:string = "GET_PAINT_STYLES";
export const GET_TEXT_STYLES_COMMAND:string = "GET_TEXT_STYLES";

