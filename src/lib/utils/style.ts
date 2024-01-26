import { StyleFolder, Styles, } from "@ctypes/style";
import { hexToRgb, rgb, rgbToHex, rgbToHsl } from "./color";
import { DEFAULT_STYLE_PAINT } from "@lib/constants";
import { clone, delay, lastIndexOfArray, mapKeys, shallowClone } from '@lib/utils/utils';
import { WritablePart } from "@ctypes/global";
import { Workbench } from "@ctypes/workbench.template";
import { PaintSet } from '@ctypes/shade';
import { TextSet } from "@ctypes/text";
import { ContextMenuCommand } from '@ctypes/contextmenu';
import { TemplateConfig } from "@ctypes/template";
import { Dev } from "@ctypes/dev.template";
import { cssTextStyle } from "./font";
import * as changeCase from 'change-case';
import { validUnit } from "./font.back";

export function classifyStyle(style: Array<Styles>): Array<StyleFolder> {

    //Set initial folder
    let rootFolder: StyleFolder = {
        type: 'FOLDER',
        name: '',
        fullpath: '',
        level: -1,// -1 cause Root (declared below) acts as a fake (hidden directory)
        styles: [],
        folders: []
    };


    const createFolder: any = (structure: StyleFolder, path: string, style: Styles) => {

        //separate base folder from rest of path
        const [folder, ...rest] = path.split('/');
        const splitPath = style.name.split('/');
        const isStyle = !!!rest.length;

        if (isStyle) {
            //push style to current structure
            structure.styles.push(shallowClone(style, ['documentationLinks', 'consumers']) as PaintStyle | TextStyle);
        } else {
            //check if a subfolder already exists
            let foundFolder = structure.folders.find(item => item.name === folder || item.name + ' ' === folder || item.name === folder + ' ');

            //if subfolder doesn't already exists 
            if (!foundFolder) {
                //create subfolder
                foundFolder = {
                    type: 'FOLDER',
                    name: folder,
                    fullpath: structure.fullpath.length && [structure.fullpath, folder].join('/') || folder,
                    level: splitPath.indexOf(folder),
                    styles: [],
                    folders: []
                };

                //push subfolder to current structure (parent folder)
                structure.folders.push(foundFolder);
            }

            //dig within style
            createFolder(foundFolder, rest.join('/'), style);
        }



    };

    style.forEach(item => createFolder(rootFolder, item.name, item));
    return [rootFolder];
}


export function updateFolderName({ folder, level, name }: { folder: StyleFolder, level: number, name: string }): void {

    const update = (style: Styles) => {
        try {
            //split and replace folder name in styles
            const split = style.name.split('/');
            split.splice(level, 1, name);
            style.name = concatFolderName(split);

            //update figma style name
            const figmaStyle = figma.getStyleById(style.id);
            if (figmaStyle) { figmaStyle.name = style.name; }
        } catch (_) {
            console.warn(`Could not update style ${style.name}`)
        }
    }

    folder.styles.forEach((style: Styles) => update(style));
    folder.folders.forEach((child: StyleFolder) => updateFolderName({ folder: child, level, name }));

}

export function updateColor({ style, color }: { style: PaintStyle, color: RGB | string }): void {

    const figmaStyle = figma.getStyleById(style.id) as PaintStyle;
    const newPaint = clone(figmaStyle.paints);
    //check color type (can take Hex or {r,g,b})
    color = (typeof color === 'string') ? hexToRgb(color, true) : color;

    try {
        newPaint.map((paint: any) => { paint.color = color; });
        figmaStyle.paints = newPaint;
    } catch (e) {
        console.warn(e);
    }

    return;

}

export async function updateText({ style, newStyle }: { style: TextStyle, newStyle: Partial<WritablePart<TextStyle>> }): Promise<void> {

    const figmaStyle = figma.getStyleById(style.id) as any;
    if (!figmaStyle) { return; }

    await figma.loadFontAsync(style.fontName);
    if (newStyle.fontName) await figma.loadFontAsync(newStyle.fontName);

    let key: keyof typeof newStyle;
    for (key in newStyle) {
        try {
            //concat base folder with new name
            if (key === 'name') {
                const { folder } = folderNameFromPath(figmaStyle[key]);
                newStyle[key] = concatFolderName([folder, newStyle[key]]);
            }

            //validate lineHeight value
            if (key === 'lineHeight') {
                const lineHeight = newStyle[key];
                if (!validUnit(String(lineHeight?.unit)) || !(lineHeight as any)?.value) {
                    newStyle[key] = {
                        ...lineHeight,
                        unit: 'AUTO'
                    };
                }
            }

            if (key === 'letterSpacing') {
                const letterSpacing = newStyle[key];
                if (!validUnit(String(letterSpacing?.unit)) || !(letterSpacing as any)?.value) {
                    newStyle[key] = {
                        value: letterSpacing?.value || 0,
                        unit: 'PIXELS'
                    };
                }
            }

            //apply relative key
            figmaStyle[key] = newStyle[key];
        } catch (e) {
            throw e;
        }

    }

    //Manualy reload_page cause async process doesn't trigger document change listener
    figma.ui.postMessage({ action: 'RELOAD_PAGE' });
}

export function folderAtLevel(folder: string, level: number): string {
    return folder.split('/')[Math.max(0, level)] || '';
}

export function concatFolderName(path: Array<string | undefined>): string {
    //remove underfined and empty string values
    let chain: string = path.filter(e => e !== undefined && e.length).join('/');
    if (chain[0] === '/') { chain = chain.slice(1); }
    return chain;
}

export function updateStyleName({ style, name }: { style: PaintStyle, name: string }) {

    try {
        const newStyleName = figma.getStyleById(style.id);
        //get style folder name and add msg.name 

        const folder = folderNameFromPath(style.name).folder;
        if (newStyleName) newStyleName.name = concatFolderName([folder, name]);

    } catch (_) {
        console.warn('Could not update style name');
    }
}


export function folderNameFromPath(path: string) {
    const name = path;
    if (!name) { return { folder: '', name: String(name) } }
    const parts = name.split('/');
    const folderPath = parts.slice(0, -1).join('/');
    const lastSegment = parts[parts.length - 1];
    return {
        folder: folderPath,
        name: lastSegment
    };
}

export async function addStyle({ name, style, type }: { name: string, style?: Styles | PaintSet | TextSet, type?: 'PAINT' | 'TEXT' }) {

    switch (type || style?.type) {

        case 'PAINT':
            const paintStyle = figma.createPaintStyle();
            paintStyle.name = name;
            paintStyle.paints = (style?.type === 'PAINT' && style.paints) && [...style.paints] || [DEFAULT_STYLE_PAINT];
            break;

        case 'TEXT':
            const textStyle = figma.createTextStyle();

            //Load font for Figma Canvas
            await figma.loadFontAsync(textStyle.fontName);
            const { fontName } = style as TextSet;

            //Load new font and Map relative value to styles;
            fontName && figma.loadFontAsync(fontName as FontName)
                .then(() => {
                    mapKeys(style, textStyle);
                    textStyle.name = name;
                })
                .catch(() => {
                    //Try to load Regular Style
                    const regStyle = { ...style, fontName: { ...fontName, style: 'Regular' } } as TextSet;
                    regStyle.fontName && figma.loadFontAsync(regStyle.fontName).then(() => {
                        mapKeys(regStyle, textStyle);
                        textStyle.name = name;
                    })
                });

            //Override name with copy number name

            break;
    }

}

export function get_styles_of_folder(folder: StyleFolder, array: Array<Styles> = []): Array<Styles> {
    array.push(...folder.styles);
    folder.folders.forEach(subfolder => get_styles_of_folder(subfolder, array));
    return array;
}

export function sort_by_name(styles: Array<Styles>) {
    const newStyle = styles.sort((a, b) => a.name > b.name ? 1 : -1);
    replaceStyle(newStyle);
}

export function replaceStyle(list: Array<Styles>) {

    list.forEach((item) => {
        const style = figma.getStyleById(item.id);
        if (style) {
            style.remove();
            addStyle({
                name: item.name,
                style: item
            });
        }
    });

}

export function setCopyNumber(currentName: string, list: Array<string>): string {


    //define Regex
    const SUFFIX_REGEX = /(\scopy)$|(\scopy\s\d+)$/gm;
    const INDEX_REGEX = /(\d+)$/gm;

    const baseOf = (name: string) => name?.replace(SUFFIX_REGEX, '') || '';
    const instances: Array<string> = [];
    const baseName = baseOf(currentName);


    //1. Gather name with same base and add it
    list.forEach(name => {
        //get right level of folder and base name (without copy + number suffix);
        const currBaseName = baseOf(name);
        //if share same base name (w/out copy + number)
        if (currBaseName === baseName && !instances.includes(name)) { instances.push(name); }
    });

    //2. calculate instance index depending on exisint indexes
    const index: number = instances.length && Number(instances.reduce((curr, prev) => {
        const prevIndex = Number(prev.match(INDEX_REGEX));
        const currentIndex = Number(curr.match(INDEX_REGEX));
        return String(Math.max(currentIndex, prevIndex) + 1);
    })) || 1;


    switch (instances.length) {
        case 0:
            return currentName;

        case 1:
            return `${baseName} copy`;

        default:
            return `${baseName} copy ${index}`;
    }


}

export function duplicateFolder({ folder }: { folder: StyleFolder }): void {

    //get current level name to change
    const { level } = folder;
    const parentFolders = folder.fullpath.split('/');
    //pop last element from fullpath
    const styleFolder = parentFolders.pop() || 'New style';

    //get Styles depending on type
    const styles: Array<PaintStyle | TextStyle> = [];
    switch (folder.styles[0].type) {
        case 'PAINT':
            styles.push(...figma.getLocalPaintStyles());
            break;
        case 'TEXT':
            styles.push(...figma.getLocalTextStyles());
            break;
    }

    //retrieve folder path from style name
    let list = styles.map((style: PaintStyle | TextStyle) => folderNameFromPath(style.name).folder.split('/')[level]);

    //defign new folder name based on current name as base and list to compare and define index or copies
    const newFolderName = setCopyNumber(styleFolder, list);

    //replace styles name with new forlder name
    get_styles_of_folder(folder).forEach(item => {
        //retrieve, name and folder form style
        const { name, folder } = folderNameFromPath(item.name);
        //replace old folder name (at level n) with new folder name
        const convertedName = folder.split('/');
        convertedName.splice(level, 1, newFolderName);

        addStyle({
            name: concatFolderName([...convertedName, name]),
            style: item
        });
    });

}



/*
** CREATE FIGMA PALELTTE FROM SET 
*/
export function createSet({ folder, set, config }: Workbench) {

    if (!folder) { return; }
    const baseName = config && config.name || 'New style set';
    const { level } = folder;
    const stylesOfFolders = (get_styles_of_folder(folder) ?? []).map(style => folderAtLevel(style.name, level));
    //Create new style for each style in the Set
    set?.forEach(async (style) => {
        const copyName = setCopyNumber(baseName, stylesOfFolders) || baseName;
        const styleName = concatFolderName([folder.fullpath, copyName, style.name]);
        addStyle({ style, name: styleName });
    });
}



export const styleContextMenu = ({ style, editCommand }: { style: TextSet | PaintSet, editCommand: string }): Array<ContextMenuCommand> => {
    return [
        { value: 'Edit', action: editCommand, payload: { style: style }, receiver: 'API' },
        { value: 'Duplicate', action: 'ADD_STYLE', payload: { style: style, name: style.name }, receiver: 'API' },
        { value: 'Delete', action: 'DELETE_STYLE', payload: { style: style }, receiver: 'API' },
    ];
}

/**
 * Group styles in an object where each key corresponds to the styles folder ([algae]: [Array<Styles>])
 */
export function groupStyles(folder: StyleFolder): { [key: string]: Array<PaintStyle | TextStyle> } {

    const groupedStyles: { [key: string]: Array<PaintStyle | TextStyle> } = {};

    const group = (folder: StyleFolder) => {
        //get folder name
        const baseName = lastIndexOfArray(folder.name.split('/'), '');

        //groupe them in groupedStyles object
        if (groupedStyles[baseName]) {
            groupedStyles[baseName].push(...folder.styles);
        } else {
            groupedStyles[baseName] = folder.styles;
        }
        folder.folders.forEach(fd => group(fd));
    }

    group(folder);

    //remove empty folders:
    for (let key in groupedStyles) {
        if (!groupedStyles[key].length) {
            delete groupedStyles[key];
        }
    }

    return groupedStyles;
}


function convertCaseName(name: string, method: string): string {
    //Map dropdown label to case-name library methods
    const mapCase = {
        'kebab-case': changeCase.kebabCase,
        'Train-Case': changeCase.trainCase,
        'camelCase': changeCase.camelCase,
        'PascalCase': changeCase.pascalCase,
        'snake_case': changeCase.snakeCase,
        'Pascal_Snake_Case': changeCase.pascalSnakeCase,
    };

    return mapCase[method as keyof typeof mapCase] && mapCase[method as keyof typeof mapCase](name) || name;
}


/**
 * Convert Paint styles of specific folder to CSS/SASS... string characters and output the whole code result
 */
function paintToCSS(style: PaintStyle, config: TemplateConfig): { name: string; value: string; } {

    const { name, paints } = style;
    //setprefix
    //Stylus: color-gray-1-black = rgba(30,30,30,1)
    //SCSS: $color-gray-1-black: rgba(30,30,30);
    //SASS: $color-gray-1-black: rgba(30,30,30)
    //LESS: @color-gray-1-black: rgba(30,30,30);
    const prefix = {
        'CSS': '--',
        'STYLUS': '',
        'SASS': '$',
        'SCSS': '$',
        'LESS': '@'
    }[config.action as string] || '';

    const styleName = folderNameFromPath(name).name;
    //define variable names
    const newName = prefix + (config.prefix || '') + convertCaseName(styleName, config.nameformat);

    //convert color format
    const { color, opacity } = paints[0] as SolidPaint;
    let convertedColor: string = '';
    if (color) {
        let rgba = { ...color, a: opacity };
        convertedColor = {
            'Hex': rgbToHex(rgba),
            'Rgb': rgb(rgba, 'STRING'),
            'Hsl': rgbToHsl(rgba, 'STRING', true),
            'Css': `rgb(var(${newName}) / <alpha-value>)`
        }[config.colorformat as string] as string;
    }

    return { name: newName, value: convertedColor };
}

/**
 * Convert Text Styles to CSS/SASS... string character and output the whole code result
 */
export function paintStylesToCSS({ payload }: { payload: Dev }): string {

    const { config, folder } = payload;
    if (!folder || !config) { return ''; }

    const groupedStyles: { [key: string]: any } = groupStyles(folder);

    //convert styles to css (--var-1: #000000)
    Object.keys(groupedStyles).forEach((key) => {
        //as keyof typeof groupedStyles
        groupedStyles[key] = (groupedStyles[key] as Array<PaintStyle>).map((style) => paintToCSS(style, config as any));
    });

    //concat parts
    let stringVariables = '';
    const colon = (config.action === 'STYLUS') ? ' = ' : ': ';
    const semicolon = (config.action === 'STYLUS' || config.action === 'SASS') ? '' : ';';
    const tab = (config.action === 'CSS') ? '\t' : '';

    Object.keys(groupedStyles).forEach((key) => {
        //set group as comments
        if (key.length) { stringVariables += `${tab}/* ${key} */\n` }
        //add converted styles to css
        stringVariables += `${groupedStyles[key].map(({ name, value }: { name: string; value: string; }) => `${tab}${name}${colon}${value}${semicolon}`).join('\n')}`;
        stringVariables += '\n\n';
    });


    switch (config.action) {
        /*TAILWIND Variables */
        case 'TAILWIND':
            stringVariables = '';
            Object.keys(groupedStyles).forEach((key) => {
                const styles = groupedStyles[key];
                const concatStyles = styles.map(({ name, value }: { name: string; value: string }) => `\t\t\t${lastIndexOfArray(name.split('-'), '')}: "${value}"`).join(',\n');
                stringVariables += `\t\t${config.prefix || ''}${key.length && key.toLowerCase().replace(' ', '') || 'base'}: {
${concatStyles}
\t\t}\n`;
            });
            return `module.exports = {
    theme: {
        extend: {
            colors: {
${stringVariables}
            }
        }
    }
}`;
        /*CSS VARIABLES*/
        case 'CSS':
            return `:root{
${stringVariables}
}`;
        /*DEFAULT VARIABLES */
        default:
            return stringVariables;

    }
}



function textToCSS(style: TextStyle, config: TemplateConfig): string {
    const { action, prefix } = config;

    //define colon
    const colon = (action === 'SASS' || action === 'STYLUS') ? '' : ';';
    //convert text style to css string
    const cssTextString = cssTextStyle(style, 'STRING', config).join(`${colon}\n\t`);
    //add prefix
    let newName = (prefix || '') + style.name;
    //remove existing Spaces
    newName = newName.replace(/\s/gm, '');
    //replace "/" by " " in name
    newName = newName.replace('/', ' ');
    newName = convertCaseName(newName, config.nameformat);

    //define prefix suffix and end depending on config action
    const presuffix = {
        'CSS': { prefix: '.', suffix: '{', end: '}' },
        'LESS': { prefix: '.', suffix: '() {', end: '}' },
        'STYLUS': { prefix: '', suffix: '()', end: '' },
        'SCSS': { prefix: '@mixin ', suffix: '() {', end: '}' },
        'SASS': { prefix: '@mixin ', suffix: '()', end: '' },
    }[action as string] || { prefix: '', suffix: '', end: '' }

    return `${presuffix.prefix}${newName}${presuffix.suffix}
\t${cssTextString}
${presuffix.end}`;
}

export function textStylesToCss({ payload }: { payload: Dev }): string {

    const { config, folder } = payload;
    if (!folder || !config) { return ''; }

    const groupedStyles: { [key: string]: any } = groupStyles(folder);
    let stringVariables = '';
    Object.keys(groupedStyles).forEach(key => {
        //set initial tab

        //display group as comment
        if (key.length) { stringVariables += `/* ${key} */\n` }

        const stylesString = groupedStyles[key].map((style: TextStyle) => textToCSS(style, config as any)).join('\n\n');
        stringVariables += stylesString;
        stringVariables += '\n\n';
    });

    /*
    SCSS:
    @mixin text-style-body-regular() {
        font-size: 16px;
        font-family: "SF Pro Text";
        font-weight: 400;
        font-style: normal;
        line-height: 150%;
        text-decoration: none;
        text-transform: none;
    }

    LESS:
    .text-style-body-regular() {
        font-size: 16px;
        font-family: "SF Pro Text";
        font-weight: 400;
        font-style: normal;
        line-height: 150%;
        text-decoration: none;
        text-transform: none;
    }

    CSS:
    .text-style-body-regular {
        font-size: 16px;
        font-family: "SF Pro Text";
        font-weight: 400;
        font-style: normal;
        line-height: 150%;
        text-decoration: none;
        text-transform: none;
    }

    SASS:
    @mixin text-style-body-regular() 
        font-size: 16px
        font-family: "SF Pro Text"
        font-weight: 400
        font-style: normal
        line-height: 150%
        text-decoration: none
        text-transform: none

    Stylus:
    text-style-heading-heading-4() 
        font-size: 24px
        font-family: "SF Pro Display"
        font-weight: 700
        font-style: normal
        line-height: 135%
        text-decoration: none
        text-transform: none
     */

    return stringVariables;

}


export function updateStyle(style: PaintStyle | TextStyle) {
    //get original figma style from id
    const figmaStyle = figma.getStyleById(style.id);
    //override all original attirbutes with new style by mappgin keys (brute method/ do not pick specific attribute to replace)
    if (figmaStyle) mapKeys(style, figmaStyle);
} 