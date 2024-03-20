import { ContextMenuCommand } from "src/types/contextmenu";
import { MultiArray } from "src/types/global";
import { traverseCallback } from "@lib/utils/utils";
import { get } from "@lib/ipc";

export function setYPos(
    active: ContextMenuCommand | undefined,
    step: number = 20,
    list: MultiArray<ContextMenuCommand>
): number {
    //traverseCallback(list, (e:ContextMenuCommand, index:number) => console.log(index));
    return 0;
}


export async function loadFetch(list: MultiArray<ContextMenuCommand>) {
    //check if commands have fetch propreties to replace content with fetch results
    const fetchPromises: Array<any> = [];

    const processCommand = async (cm: ContextMenuCommand) => {
        if (cm.value && typeof cm.value === 'object') {
            let result = await get(cm.value).then(({ payload }) => {
                //assign fetched value to value key 
                return payload.map((item: any) => ({ ...cm, value: item }));
            });
            return result;
        }
        else {
            return cm;
        }
    }

    const asyncList = list.map(cmd => Array.isArray(cmd) ? cmd.map(cmd => processCommand(cmd)) : processCommand(cmd));

    return await Promise.all(asyncList.map(cmd => Array.isArray(cmd) ? Promise.all(cmd) : cmd));

}