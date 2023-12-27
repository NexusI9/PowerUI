import { DropdownCommand } from "@ctypes/input";

export function setYPos(
    active: number | Array<number>,
    step: number = 20,
    list: Array<DropdownCommand> | Array<Array<DropdownCommand>>
): number {

    if (Array.isArray(active)) {
        const prevGroupLength = (list as Array<Array<DropdownCommand>>)[Math.max(active[0] - 1, 0)].length;
        return -1 * (((active[0] * prevGroupLength) + active[1]) * step);
    }
    else {
        return -1 * active * step;
    }

}