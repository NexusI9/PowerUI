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
    const checkNestedFolder:any = (dir:Array<StyleFolder>) => {
        dir.forEach( (item,index) => {
            if(item.type === 'folder' && item.children.length){

            }
        });
    };

    const createFolder:any = (dir: Array<string>, newArray:StyleFolder) => {

        if(!newArray){
            newArray = {
                title:"root",
                type:"folder",
                children:[]
            };
        }

        for (var p of dir) {

            //convert item to folder
            let folder = {
                title: p,
                type: 'folder',
                children: []
            } as StyleFolder;

            //check if folder doesn't already exists
            if(!newArray.children.length){
                newArray.children.push(folder);
            }else{
                newArray.children.forEach( child => {
                    if(child.type === 'folder' && child.title === ){}
                });
            }

            dir.shift();
            return createFolder(dir, newArray);
        }

        return newArray;
    };

    return style.reduce((acc, item: StyleItem) => {

        const parts = item.name.split("/");
        parts.pop(); //remove last index (style itself) to only keep folders

        if (!!parts.length) {
            //go through array
            item.title = parts.slice(-1)[0] || item.name;
            console.log( createFolder(parts) );
        }

        return acc;
    }, style);

}