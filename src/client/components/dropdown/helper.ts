import { ContextMenuCommand } from "@ctypes/contextmenu";
import { MultiArray } from "@ctypes/global";
import { traverseCallback } from "@lib/utils/utils";

export function setYPos(
    active: ContextMenuCommand,
    step: number = 20,
    list: MultiArray<ContextMenuCommand>
): number {
    //traverseCallback(list, (e:ContextMenuCommand, index:number) => console.log(index));
    return 0;
}