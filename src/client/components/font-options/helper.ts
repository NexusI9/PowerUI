import { TextSet } from "@ctypes/text";
import { send } from "@lib/ipc";

export function updateAttribute(style: TextSet, attr: string, value: any) {

    send({
        action: 'UPDATE_STYLE_TEXT',
        payload: {
            style: style,
            newStyle: {
                [attr]: value
            }
        }
    });
}

