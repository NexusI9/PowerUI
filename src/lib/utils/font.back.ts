import { TextArrayItem, TextDico } from "src/types/text";

export function loadLocalFont(msg: any, systemFonts: TextDico) {

    const { payload } = msg;

    const dicoFont = systemFonts[payload.family];
    if (payload.family && dicoFont?.loaded === false) {

        //load all styles by mapping each style in promise
        Promise.all(
            dicoFont.style.map(style => new Promise((resolve, reject) => {
                //Local Font Loading
                figma.loadFontAsync({ ...payload, style: style })
                    .then(() => resolve(style))
                    .catch(() => {
                        systemFonts[payload.family].loaded = false;
                        reject(`Could not load ${payload.family}, ${style}`);
                    })
            }))
        )
            .then((e) => figma.ui.postMessage(msg) )
            .catch((e) => console.warn(e));

        //set font as loaded
        systemFonts[payload.family].loaded = true;
    } else {
        figma.ui.postMessage(msg);
    }
}


export function groupFont(fonts: Array<Font>): { [key: string]: TextArrayItem } {

    //transform font to ContextMenuCommand structure
    const fontDico: { [key: string]: TextArrayItem } = {};

    //1. Gather all fonts in dictionary along with their font (bold/reg/light...)
    fonts.forEach(font => {
        const { fontName: { family, style } } = font;

        if (!fontDico[family]) {
            fontDico[family] = {
                family,
                loaded: false,
                style: [style]
            };
        } else {
            fontDico[family].style.push(style);
        }
    });


    return fontDico;
}