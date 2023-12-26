import { MousePosition } from "@ctypes/global";

export interface ContextMenuCommand{
    text:string; 
    action:string;
    payload:any;
}

export interface ContextMenu{
    commands: Array<ContextMenuCommand> | Array<Array<ContextMenuCommand>>;
    position: MousePosition;
    id:number | string;
}