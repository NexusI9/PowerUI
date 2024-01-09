import { MousePosition, MultiArray } from "@ctypes/global";


export interface ContextMenuCommand {
    icon?: string;
    text: string;
    action?: string;
    payload?: any;
    receiver: 'API' | 'STORE';
    fetch?: { action: string; payload?: any; };
}


export interface ContextMenu {
    commands: MultiArray<ContextMenuCommand>;
    position: MousePosition;
    id: number | string;
    activeCommand: ContextMenuCommand | undefined;
}