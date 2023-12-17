import { StyleFolder, StyleItem } from "@lib/interfaces";

export function classifyStyle(style: Array<StyleItem>): Array<StyleItem | StyleFolder> {

    /*
[
    {
        type:"folder",
        name:"folder-name",
        styles:[{CleanStyle}, {CleanStyle}, {Cleanstyle}]
    }
    {CleanStyle},
]
*/

    let organisedFolder: Array<StyleFolder> = [];

    const createFolder: any = (structure: Array<any>, path: string, style: StyleItem) => {
        const [folder, ...rest] = path.split('/');

        //console.log({ structure, path, folder });

        if(!rest.length){ //endpoint
            return structure.push(style);
        }

        console.log(structure);

        let foundFolder = structure.find(item => item.title === folder);
        if (!foundFolder) { //first iteration

            foundFolder = {
                type: 'folder',
                title: folder,
                children: []
            };
            structure.push(foundFolder);
            
        }

        if (!!rest.length) {
            createFolder(foundFolder.children, rest.join('/'), style);
        } else {
            foundFolder.children.push(style);
        }



    };

    style.forEach((item: StyleItem) => {
        item.title = item.name.split('/').slice(-1)[0] || item.name;
        createFolder(organisedFolder, item.name, item);
    });

    console.log(organisedFolder);
    return style;
}