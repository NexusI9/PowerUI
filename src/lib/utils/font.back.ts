import { TextArrayItem, TextDico } from "@ctypes/text";
import { replaceStyle } from "./style";


export function loadLocalFont(msg: any, systemFonts: TextDico) {


    return new Promise((resolve, reject) => {

        const { payload } = msg;
        const dicoFont = systemFonts[payload.family];
        if (payload.family) {
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
                .then(() => resolve(msg))
                .catch((e) => reject(e));

            //set font as loaded
            systemFonts[payload.family].loaded = true;
        } else {
            resolve(msg);
        }

    });
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
            if (!fontDico[family].style.includes(style)) {
                fontDico[family].style.push(style);
            }
        }
    });


    return fontDico;
}


export function storeFonts({ action }: any, systemFonts: TextDico): Promise<any> {

    return new Promise((resolve, reject) => {
        if (!systemFonts) {
            figma.listAvailableFontsAsync()
                .then(fonts => {
                    systemFonts = groupFont(fonts);
                    resolve({ fonts: systemFonts, action });
                })
                .catch(_ => reject({}));
        } else {
            resolve({ fonts: systemFonts, action });
        }

    });


}


export function sortByScale(styles: Array<TextStyle>) {
    styles.sort((a: TextStyle, b: TextStyle) => a.fontSize > b.fontSize ? -1 : 1);
    replaceStyle(styles);
}

export function sortByFont(styles: Array<TextStyle>) {
    const fontOrder = ['Thin', 'Extra Light', 'Light', 'Regular', 'Semi Bold', 'Bold', 'Extra Bold', 'Black'];
    styles.sort((a: TextStyle, b: TextStyle) => fontOrder.indexOf(a.fontName.style) > fontOrder.indexOf(b.fontName.style) ? -1 : 1);
    replaceStyle(styles);
}

export function validUnit(unit:string){
    return !!String(unit).toUpperCase().match(/AUTO|PIXELS|PERCENT/);
}

