import { Sidepanel, SidepanelOption, TemplateConfig, TemplateInput } from "@ctypes/template";
import { traverseCallback } from "./utils";

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