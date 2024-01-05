import { ContextMenuCommand } from "@ctypes/contextmenu";
import { MultiArray } from "@ctypes/global";

export function setYPos(
    active: number | Array<number>,
    step: number = 20,
    list: MultiArray<ContextMenuCommand>
): number {

    if (Array.isArray(active)) {
        const prevGroupLength = (list as Array<Array<ContextMenuCommand>>)[Math.max(active[0] - 1, 0)].length;
        return -1 * (((active[0] * prevGroupLength) + active[1]) * step);
    }
    else {
        return -1 * active * step;
    }

}