import { ContextMenuCommand, StyleFolder } from "@lib/interfaces";

export function assignPayload(items:Array<ContextMenuCommand> | Array<Array<ContextMenuCommand>>, folder:StyleFolder){

    items.forEach((item) => {  //replace all payload attributes by folder attributes
        item = {...item};
        if(Array.isArray(item)){
            return assignPayload(item, folder);
        }else{
            item.payload = {folder: folder};
            console.log(item);
        }
    });


}