import { ContextMenuCommand } from "src/types/contextmenu";
import { MultiArray } from "src/types/global";
import { traverseCallback } from "@lib/utils/utils";

export function setYPos(
    active: ContextMenuCommand | undefined,
    step: number = 20,
    list: MultiArray<ContextMenuCommand>
): number {
    //traverseCallback(list, (e:ContextMenuCommand, index:number) => console.log(index));
    return 0;
}