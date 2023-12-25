import { ContextMenuCommand, StyleFolder } from "@lib/interfaces";

export function assignPayload(items:Array<ContextMenuCommand> | Array<Array<ContextMenuCommand>>, folder:StyleFolder){

    items.forEach((item) => {  //replace all payload attributes by folder attributes
        if(Array.isArray(item)){
            assignPayload(item, folder);
        }else{
            const newItem = {...item};
            newItem.payload = {folder: folder};
        }
    });

}