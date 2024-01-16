import { MousePosition, MultiArray } from "src/types/global";
import { FetchAction } from "./global";


export interface ContextMenuCommand {
    icon?: string;
    value: string | FetchAction | undefined;
    action?: string;
    payload?: any;
    receiver: 'API' | 'STORE';
}


export interface ContextMenu {
    commands: MultiArray<ContextMenuCommand>;
    position: MousePosition;
    id: number | string;
    activeCommand: ContextMenuCommand | undefined;
}