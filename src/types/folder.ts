import { StyleFolder } from "src/types/style";
import { ContextMenuCommand } from "src/types/contextmenu";


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
    options?: FolderOptions;
    allowEdit?: boolean;
    attributes: StyleFolder;
    level?: number;
    root?: boolean;
}

export interface FolderOptions {
    header?:{
            add: { icon?: string; onClick: any; }
    };
    folder?:{
            add: { icon?: string; onClick: any; };
            edit: { icon?: string; onClick: any; };
            kebab?: Array<ContextMenuCommand>;
    }
}