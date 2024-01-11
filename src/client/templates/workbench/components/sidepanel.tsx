import { Dropdown } from "@components/dropdown";
import { SidepanelInput, SidepanelOption, Workbench } from "src/types/workbench";
import { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import { clone, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch, useSelector } from "react-redux";
import { updateAction, updateSet } from "@lib/slices/workbench";
import { ContextMenuCommand } from "src/types/contextmenu";
import { Slider } from "@components/slider";
import { InputArray } from "@components/input-array";
import { Checkbox } from "@components/checkbox";
import { Input as IInput, InputArray as IInputArray, Dropdown as IDropdown, Slider as ISlider, Checkbox as ICheckbox } from "@ctypes/input";

export const Sidepanel = () => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const { sidepanel: { options }, config }: Workbench = useSelector((state: any) => state.workbench);

    const dispatch = useDispatch<any>();

    const updateOption = (option: SidepanelOption) => {
        setActiveOption(option);
        dispatch(updateAction({ key: 'action', value: option.action })); //store initial config
    }

    const inheritConfig = (input: SidepanelInput): SidepanelInput => {
        const inputClone = clone(input);

        //Map exising config attributes to relative input keys to inherit previous config value (preventing user to have to look for font or to retype all values again if change action)
        let key: keyof typeof config;
        for (key in config) {
            if (config[key] && key === inputClone.configKey) {
                inputClone.attributes.value = config[key];
            }
        }
        return inputClone;
    }

    const generateInput = (input: SidepanelInput): React.JSX.Element => {

        let dynamicComp;
        const inheritInput = inheritConfig(input);

        //Init update config        
        switch (input.type) {
            case 'INPUT':
                dynamicComp = <Input {...(inheritInput.attributes as IInput)} onChange={(e: BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'INPUT_ARRAY':
                dynamicComp = <InputArray {...(inheritInput.attributes as IInputArray)} onChange={(e: BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'SLIDER':
                dynamicComp = <Slider {...(inheritInput.attributes as ISlider)} onChange={(e: BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.value }))} />
                break;

            case 'CHECKBOX':
                dynamicComp = <Checkbox {...(inheritInput.attributes as ICheckbox)} onChange={(e: BaseSyntheticEvent) => dispatch(updateSet({ key: input.configKey, value: e.target.checked }))} />;
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...(inheritInput.attributes as IDropdown)} onChange={(e: ContextMenuCommand) => dispatch(updateSet({ key: input.configKey, value: e.text }))} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(activeOption) + JSON.stringify(input)}>{dynamicComp}</Fragment>;

    }


    useEffect(() => {
        //init
        if (options) {
            updateOption(Array.isArray(options[0]) ? options[0][0] : options[0]);
        }

    }, [options]);

    return (<div className="workbench-sidepanel flex f-col">
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