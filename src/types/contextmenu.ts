import { MousePosition, MultiArray } from "src/types/global";


export interface ContextMenuCommand {
    icon?: string;
    text: string | undefined;
    action?: string;
    payload?: any;
    receiver: 'API' | 'STORE';
    fetch?: { action: string; payload?: any; placeholder: string; };
}


export interface ContextMenu {
    commands: MultiArray<ContextMenuCommand>;
    position: MousePosition;
    id: number | string;
    activeCommand: ContextMenuCommand | undefined;
}