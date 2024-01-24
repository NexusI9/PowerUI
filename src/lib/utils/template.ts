import { Sidepanel, SidepanelOption, TemplateConfig, TemplateInput } from "@ctypes/template";
import { traverseCallback } from "./utils";
import { display as displayLoad, destroy as destroyLoad } from "@lib/slices/load";
import { loadFont } from "./font.action";

export function initConfig(sidepanel: Sidepanel): TemplateConfig {
    const newConfig: any = {};

    traverseCallback(sidepanel, ({ options }: { options: SidepanelOption }) =>
        traverseCallback(options, ({ content }: { content: TemplateInput }) =>
            traverseCallback(content, (input: TemplateInput) => {
                if (input.configKey) {
                    try {
                        newConfig[input.configKey as string] = input.attributes.value;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
            )));

    return newConfig;
}


export async function loadFontDispatch({ key, value, dispatcher, oldConfig }: { key: string; value: any; dispatcher: any; oldConfig: TemplateConfig }) {
    if (key === 'typeface' && typeof value === 'string' && oldConfig.typeface !== value) {
        dispatcher(displayLoad({ message: `Loading font ${value}` }));
        await loadFont({ family: value, style: 'Regular' });
        dispatcher(destroyLoad());
        setTimeout(() => dispatcher(destroyLoad()), 9000);
    }
    return;
}