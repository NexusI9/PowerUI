import { Color, StyleFolder, StyleItem } from "@lib/interfaces";

function clone(val:any) {
    return JSON.parse(JSON.stringify(val))
  }

export function classifyStyle(style: Array<StyleItem>): Array<StyleItem | StyleFolder> {

    //initial folder
    let organisedFolder: StyleFolder = {
        type: 'FOLDER',
        title: 'root',
        fullpath:'',
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
                type: 'FOLDER',
                title: folder,
                fullpath: structure.fullpath.length && [structure.fullpath, folder].join('/') || folder,
                styles: [],
                folders: []
            };
            structure.folders.push(foundFolder);

        }

        console.log(foundFolder.fullpath);

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


export function updateFolderName({ folder, level, name }: { folder: StyleFolder, level: number, name: string }): void {

    const update = (style: StyleItem) => {
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

    folder.styles.forEach((style: StyleItem) => update(style));
    folder.folders.forEach((child: StyleFolder) => updateFolderName({ folder: child, level, name }));

}

export function updateColor({ style, color }: { style: StyleItem, color: Color }): void {

    const figmaStyle = figma.getStyleById(style.id) as PaintStyle;
    const newPaint = clone(figmaStyle.paints);
    newPaint.map((paint: any) => { paint.color = color; });
    figmaStyle.paints = newPaint;
    return;

}


export function get_folder_name_from_style(item:StyleItem){
    const name = item.name;
    const parts = name.split('/');
    const folderPath = parts.slice(0, -1).join('/');
    const lastSegment = parts[parts.length - 1];

    return{
        folder:folderPath,
        name:lastSegment
    };   
}