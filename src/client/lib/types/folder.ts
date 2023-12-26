import { StyleFolder } from "@ctypes/style";
import { ContextMenuCommand } from "@ctypes/contextmenu";

export interface Folder{
    title:string;
    children:React.JSX.Element; 
    hideHeader?:boolean;
    custom?:FolderCustom;
    allowEdit?:boolean;
    attributes:StyleFolder;
    level?:number;
    root?:boolean;
}

export interface FolderCustom{
    options?:{
        add?:{icon:string};
        kebab?:Array<ContextMenuCommand>;
    }
}