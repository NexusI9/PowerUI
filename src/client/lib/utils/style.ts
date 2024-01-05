import { ColorRGB } from "@ctypes/color";
import { StyleColor, StyleFolder, StyleText, Styles } from "@ctypes/style";
import { hexToRgb } from "./color";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import { clone, isNumber, lastIndexOfArray } from '@lib/utils/utils';

export function classifyStyle(style: Array<Styles>): Array<Styles | StyleFolder> {

    //initial folder
    let level = -1; // -1 cause Root (declared below) acts as a fake (hidden directory)
    let organisedFolder: StyleFolder = {
        type: 'FOLDER',
        title: '',
        fullpath: '',
        level: level,
        styles: [],
        folders: []
    };


    const createFolder: any = (structure: StyleFolder, path: string, style: Styles) => {
        const [folder, ...rest] = path.split('/');

        if (!rest.length) { //endpoint
            level = -1;
            return structure.styles.push(style);
        }

        //update tree level
        level++;

        let foundFolder = structure.folders.find(item => item.title === folder);
        if (!foundFolder) { //first iteration

            foundFolder = {
                type: 'FOLDER',
                title: folder,
                fullpath: structure.fullpath.length && [structure.fullpath, folder].join('/') || folder,
                level: level,
                styles: [],
                folders: []
            };

            structure.folders.push(foundFolder);

        }

        if (!!rest.length) {
            createFolder(foundFolder, rest.join('/'), style);
        } else {
            foundFolder.styles.push(style);
            level = -1;
        }

    };

    style.forEach((item) => {
        item.title = item.name.split('/').slice(-1)[0] || item.name;
        createFolder(organisedFolder, item.name, item); //append to root
    });

    return [organisedFolder];
}


export function updateFolderName({ folder, level, name }: { folder: StyleFolder, level: number, name: string }): void {

    const update = (style: Styles) => {
        try {
            //split and replace folder name in styles
            const split: Array<string> = style.name.split('/');
            split.splice(level, 1, name);
            style.name = split.join('/');

            //update figma style name
            const figmaStyle = figma.getStyleById(style.id);
            if (figmaStyle) {
                figmaStyle.name = style.name;
            }
        } catch (_) {
            console.warn(`Could not update style ${style.name}`)
        }
    }

    folder.styles.forEach((style: Styles) => update(style));
    folder.folders.forEach((child: StyleFolder) => updateFolderName({ folder: child, level, name }));

}

export function updateColor({ style, color }: { style: StyleColor, color: ColorRGB | string }): void {

    const figmaStyle = figma.getStyleById(style.id) as PaintStyle;
    const newPaint = clone(figmaStyle.paints);

    try {
        //check color type (can take Hex or {r,g,b})
        switch (typeof color) {

            case 'string':
                color = hexToRgb(color, true);
                break;
        }

        newPaint.map((paint: any) => { paint.color = color; });
        figmaStyle.paints = newPaint;
    } catch (_) {
        console.warn(_);
    }

    return;

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
    const parts = name.split('/');
    const folderPath = parts.slice(0, -1).join('/');
    const lastSegment = parts[parts.length - 1];
    return {
        folder: folderPath,
        name: lastSegment
    };
}

export function addStyle({ folder, name, style, type }: { folder?: string, name: string, style: any, type: 'COLOR' | 'TEXT' }) {
    switch (type) {

        case 'COLOR':
            const newStyleColor = figma.createPaintStyle();
            newStyleColor.name = concatFolderName([folder, name]);
            newStyleColor.paints = style || DEFAULT_STYLE_COLOR;
            break;

        case 'TEXT':
            const newStyleText = figma.createTextStyle();
            newStyleText.name = concatFolderName([folder, name]);
            newStyleText.textCase = style || DEFAULT_STYLE_COLOR;
            break;
    }

}

export function get_styles_of_folder(folder: StyleFolder, array: Array<Styles> = []): Array<Styles> {
    array.push(...folder.styles);
    folder.folders.forEach(subfolder => get_styles_of_folder(subfolder, array));
    return array;
}

export function sort_by_name(styles: Array<Styles>) {
    styles.sort((a, b) => a.name > b.name ? 1 : -1);
    replaceStyle(styles);
}

export function replaceStyle(list: Array<Styles>) {

    list.forEach((item) => {
        figma.getStyleById(item.id)?.remove();
        addStyle({
            name: item.name,
            style: (item.type === 'COLOR' && item.paints) || (item.type === 'TEXT' && item.texts),
            type: item.type
        });
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
        case 'COLOR':
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
            style: (item.type === 'COLOR' && item.paints) || (item.type === 'TEXT' && item.texts),
            type: item.type
        });
    });

}