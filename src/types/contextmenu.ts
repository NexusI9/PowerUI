import { MousePosition, MultiArray } from "src/types/global";
import { FetchAction } from "./global";


export interface ContextMenuCommand {
    icon?: string;
    text: string | undefined;
    action?: string;
    payload?: any;
    receiver: 'API' | 'STORE';
    fetch?: FetchAction;
}


export interface ContextMenu {
    commands: MultiArray<ContextMenuCommand>;
    position: MousePosition;
    id: number | string;
    activeCommand: ContextMenuCommand | undefined;
}