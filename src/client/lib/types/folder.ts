import { StyleFolder } from "@ctypes/style";
import { ContextMenuCommand } from "@ctypes/contextmenu";


export interface Option {
    icon: string;
    onClick?: any;
    toolTip?: string;
    disabled?: boolean;
}

export interface Folder {
    title: string;
    children: React.JSX.Element;
    hideHeader?: boolean;
    custom?: FolderCustom;
    allowEdit?: boolean;
    attributes: StyleFolder;
    level?: number;
    root?: boolean;
}

export interface FolderCustom {
    header?:{
        options?: {
            add?: { icon?: string; onClick?: any; }
         }
    };
    folder?:{
        options?: {
            add?: { icon?: string; onClick?: any; };
            kebab?: Array<ContextMenuCommand>;
            edit?: { icon?: string; onClick?: any; };
        }
    }
}