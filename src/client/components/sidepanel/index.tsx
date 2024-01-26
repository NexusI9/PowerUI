//Styles
import './index.scss';

//Imports
import { Dropdown } from "@components/dropdown";
import { BaseTemplate, SidepanelOption, TemplateText } from "@ctypes/template";
import { BaseSyntheticEvent, Fragment, createElement, useEffect, useState } from "react";
import { clone, firstItemOfArray, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { ContextMenuCommand } from "src/types/contextmenu";
import { Slider } from "@components/slider";
import { InputArray } from "@components/input-array";
import { Checkbox } from "@components/checkbox";
import { TemplateInput } from '@ctypes/template';
import { SidepanelHeading } from '@components/sidepanel-heading';
import { Button } from '@components/button';
import { TextArea } from '@components/text-area';
import { useAppDispatch } from '@lib/hook';

//Reducer thunk actions (hard imported)
import { updateSet } from '@lib/slices/workbench.actions';
import { updateLayout } from '@lib/slices/export.actions';
import { updateCode } from '@lib/slices/dev.actions';
import { Toggle } from '@components/toggle';
import { updateName } from '@lib/slices/rename';

export const Sidepanel = (template: BaseTemplate) => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const { sidepanel: { options }, config } = template;
    const dispatch = useAppDispatch();

    const updateOption = (option: SidepanelOption) => {
        setActiveOption(option);
        dispatch({ type: `${template.reducer}/updateAction`, payload: { key: 'action', value: option.action } }); //store initial config
    }

    const dispatchUpdateSet = (payload: any) => {
        /*TO DO find better dynamic way to route like: 
       *dispatch({ type: `${template.reducer}/updateSet`, payload });
       */
        const updateMethod = {
            'workbench': updateSet,
            'export': updateLayout,
            'dev': updateCode,
            'rename': updateName
        }[template.reducer];

        if (updateMethod) dispatch(updateMethod(payload));

    };

    const inheritConfig = (input: TemplateInput): TemplateInput => {
        /**
        ** Map exising config attributes to relative input keys to inherit previous config value 
        ** (preventing user to have to look for font or to retype all values again if change action)
        **/

        const inputClone = clone(input);
        if (!config) { return inputClone; }

        let key: keyof typeof config;
        for (key in config) {
            if (config[key] && key === inputClone.configKey) {
                inputClone.attributes.value = config[key];
            }
        }
        return inputClone;
    }

    const generateInput = (input: TemplateInput): React.JSX.Element => {

        //Update values from store config
        const inheritInput = inheritConfig(input);

        //Map inputs
        const mapInput: { [key in TemplateInput['type'] & TemplateText['type']]: React.JSX.Element } = {
            'INPUT': Input,
            'INPUT_ARRAY': InputArray,
            'SLIDER': Slider,
            'CHECKBOX': Checkbox,
            'DROPDOWN': Dropdown,
            'HEADING': SidepanelHeading,
            'BUTTON': Button,
            'TEXT_AREA': TextArea,
            'TOGGLE': Toggle
        }[input.type as string] || 'span';

        //Map callback to update config on input value changed
        const defaultCallback = { onChange: (e: BaseSyntheticEvent) => dispatchUpdateSet({ key: input.configKey, value: e.target.value }) };
        const customCallback = {
            'TOGGLE': { onChange: (e: BaseSyntheticEvent) => dispatchUpdateSet({ key: input.configKey, value: e.target.checked }) },
            'CHECKBOX': { onChange: (e: BaseSyntheticEvent) => dispatchUpdateSet({ key: input.configKey, value: e.target.checked }) },
            'DROPDOWN': { onChange: (e: ContextMenuCommand) => dispatchUpdateSet({ key: input.configKey, value: e.value }) },
            'BUTTON': {
                onClick: () => {
                    dispatchUpdateSet({ key: input.configKey, value: true }); //enable click
                    dispatchUpdateSet({ key: input.configKey, value: false }); //disable click right after (lazy)
                }
            }
        }[input.type as string];

        return (
            <Fragment key={JSON.stringify(activeOption) + JSON.stringify(input)}>
                {createElement(mapInput as any, { ...inheritInput.attributes, ...(customCallback || defaultCallback) })}
            </Fragment>
        );

    }

    useEffect(() => {
        //init first config update
        if (activeOption && activeOption.content) {
            traverseCallback(activeOption.content, (input: TemplateInput | TemplateText) => {
                const { attributes: { value }, configKey } = input as TemplateInput;
                if (configKey) { dispatchUpdateSet({ key: configKey, value }); }
            });
        }
    }, [activeOption]);


    useEffect(() => {
        //init
        if (options) {
            updateOption(firstItemOfArray(options));
        }

    }, [options]);


    return (<div className="template-sidepanel flex f-col gap-l">
        {
            (options && options?.length > 1 && activeOption) &&
            <div className='flex f-col gap-s'>
                {activeOption?.heading && <SidepanelHeading value={activeOption.heading} />}
                <Dropdown list={options} onChange={updateOption} placeholder="Swatch type" value={String(activeOption?.value)} />
            </div>
        }
        {activeOption?.content.map((input, i) => <div key={JSON.stringify(input) + i} className='flex f-col gap-s'>{traverseCallback(input, generateInput)}</div>)}
    </div>);
}