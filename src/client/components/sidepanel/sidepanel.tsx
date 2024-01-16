import { Dropdown } from "@components/dropdown";
import { BaseTemplate, SidepanelOption } from "@ctypes/templates";
import { BaseSyntheticEvent, Fragment, createElement, useEffect, useState } from "react";
import { clone, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch } from "react-redux";
import { updateAction, updateSet } from "@lib/slices/workbench";
import { ContextMenuCommand } from "src/types/contextmenu";
import { Slider } from "@components/slider";
import { InputArray } from "@components/input-array";
import { Checkbox } from "@components/checkbox";
import { TemplateInput } from '@ctypes/templates';
import { Input as IInput, InputArray as IInputArray, Dropdown as IDropdown, Slider as ISlider, Checkbox as ICheckbox } from "@ctypes/input";
import './index.scss';

export const Sidepanel = (template: BaseTemplate) => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const { sidepanel: { options }, config } = template;
    const dispatch = useDispatch<any>();

    const updateOption = (option: SidepanelOption) => {
        setActiveOption(option);
        dispatch(updateAction({ key: 'action', value: option.action })); //store initial config
    }

    const inheritConfig = (input: TemplateInput): TemplateInput => {
        const inputClone = clone(input);
        if (!config) { return inputClone; }

        //Map exising config attributes to relative input keys to inherit previous config value (preventing user to have to look for font or to retype all values again if change action)
        let key: keyof typeof config;
        for (key in config) {
            if (config[key] && key === inputClone.configKey) {
                inputClone.attributes.value = config[key];
            }
        }
        return inputClone;
    }

    const generateInput = (input: TemplateInput): React.JSX.Element => {

        let dynamicComp;
        const inheritInput = inheritConfig(input);

        const mapInput = {
            'INPUT': Input,
            'INPUT_ARRAY': InputArray,
            'SLIDER': Slider,
            'CHECKBOX': Checkbox,
            'DROPDOWN': Dropdown
        }[input.type as string] || <></>;

        const defaultCallback = (e:BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.value }));
        const customCallback = {
            'CHECKBOX': (e:BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.checked })),
            'DROPDOWN': (e: ContextMenuCommand) => dispatch(updateSet({ key: input.configKey, value: e.value })),
        }[input.type as string];

        return <Fragment key={JSON.stringify(activeOption) + JSON.stringify(input)}>
            {
                createElement(mapInput as any, { ...inheritInput.attributes, onChange: customCallback || defaultCallback })
            }
        </Fragment>;

    }


    useEffect(() => {
        //init
        if (options) {
            updateOption(Array.isArray(options[0]) ? options[0][0] : options[0]);
        }

    }, [options]);

    return (<div className="template-sidepanel flex f-col">
        {
            (options?.length > 1) &&
            <>
                <Dropdown list={options} onChange={updateOption} appearance={{ label: true }} placeholder="Swatch type" />
                <hr />
            </>
        }
        {activeOption?.content.map(input => traverseCallback(input, generateInput))}
    </div>);
}