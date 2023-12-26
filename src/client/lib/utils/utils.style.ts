import { ColorRGB, Folder, StyleColor, StyleFolder, Styles } from "@lib/interfaces";
import { hexToRgb } from "./utils.color";
import { DEFAULT_STYLE_COLOR } from "@lib/constants";
import { clone } from '@lib/utils/utils';

export function classifyStyle(style: Array<Styles>): Array<Styles | StyleFolder> {

    //initial folder
    let level = -1; // -1 cause Root (declared below) acts as a fake (hidden directory)
    let organisedFolder: StyleFolder = {
        type: 'FOLDER',
        title: 'root',
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

export function concatFolderName(folder: string, name: string): string {

    return folder.length ? [folder, name].join('/') : name;
}

export function updateStyleName({ style, name }: { style: PaintStyle, name: string }) {

    try {
        const newStyleName = figma.getStyleById(style.id);
        //get style folder name and add msg.name 

        const folder = folderNameFromPath(style.name).folder;
        if (newStyleName) newStyleName.name = concatFolderName(folder, name);

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
            newStyleColor.name = folder ? concatFolderName(folder, name) : name;
            newStyleColor.paints = style || DEFAULT_STYLE_COLOR;
            break;

        case 'TEXT':
            const newStyleText = figma.createTextStyle();
            newStyleText.name = folder ? concatFolderName(folder, name) : name;
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

    //2. remove items
    list.forEach(item => figma.getStyleById(item.id)?.remove());

    //3.instantiate new items
    list.forEach((item) => {

        addStyle({
            name: item.name,
            style: (item.type === 'COLOR' && item.paints) || (item.type === 'TEXT' && item.texts),
            type: item.type
        });
    });
}

export function setCopyNumber(folder: StyleFolder): string {



    return '';
}