import { StyleFolder, StyleItem } from "@lib/interfaces";

export function classifyStyle(style: Array<StyleItem>): Array<StyleItem | StyleFolder> {


    let organisedFolder: StyleFolder = {
        type: 'folder',
        title: 'root',
        styles: [],
        folders: []
    };

    const createFolder: any = (structure: StyleFolder, path: string, style: StyleItem) => {
        const [folder, ...rest] = path.split('/');

        if (!rest.length) { //endpoint
            return structure.styles.push(style);
        }

        let foundFolder = structure.folders.find(item => item.title === folder);
        if (!foundFolder) { //first iteration

            foundFolder = {
                type: 'folder',
                title: folder,
                styles: [],
                folders: []
            };
            structure.folders.push(foundFolder);

        }

        if (!!rest.length) {
            createFolder(foundFolder, rest.join('/'), style);
        } else {
            foundFolder.styles.push(style);
        }



    };

    style.forEach((item: StyleItem) => {
        item.title = item.name.split('/').slice(-1)[0] || item.name;
        createFolder(organisedFolder, item.name, item); //append to root
    });

    return [organisedFolder];
}


export function updateFolderName({ folder, level, name }: { folder: StyleFolder, level: number, name: string }) {

    const update = (style:StyleItem) => {
        try {
            //split and replace folder name
            //-1 because of root as fake first directory
            const split: Array<string> = style.name.split('/');
            split.splice(level - 1, 1, name);
            style.name = split.join('/');
            const figmaStyle = figma.getStyleById(style.id);
            if (figmaStyle) {
                //update figma style name
                figmaStyle.name = style.name;
            }
        } catch (_) {
            console.warn(`Could not update style ${style.name}`)
        }
    }

    folder.styles.forEach((style: StyleItem) => update(style) );
    folder.folders.forEach((child:StyleFolder) => updateFolderName({folder: child, level, name}));


}