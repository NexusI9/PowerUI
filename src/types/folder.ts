import { StyleFolder } from "src/types/style";
import { ContextMenuCommand } from "src/types/contextmenu";
import { MultiArray } from "./global";
import { Button } from "./input";


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
            button:Button;
            export: { icon?: string; onClick: any; }
            dev: { icon?: string; onClick: any; }
    };
    folder?:{
            add: { icon?: string; onClick: any; };
            edit: { icon?: string; onClick: any; };
            kebab?: Array<Array<ContextMenuCommand>>;
    }
}