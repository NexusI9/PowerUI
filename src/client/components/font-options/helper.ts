import { TextSet } from "@ctypes/text";
import { send } from "@lib/ipc";

export function updateAttribute(style: TextSet, attr: string, value: any) {
    console.log({ style, attr, value });
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

