import { Dropdown } from "@components/dropdown";
import { SidepanelInput, SidepanelOption } from "@lib/types/workbench";
import { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import { itemFromIndex, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch, useSelector } from "react-redux";
import { updateConfig } from "@lib/slices/workbench";
import { ContextMenuCommand } from "@ctypes/contextmenu";
import { Slider } from "@components/slider";
import { InputArray } from "@components/input-array";
import { Checkbox } from "@components/checkbox";

export const Sidepanel = () => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const { sidepanel: { options } } = useSelector((state: any) => state.workbench);

    const dispatch = useDispatch();

    const updateOption = (option: SidepanelOption) => {
        setActiveOption(option);
        dispatch(updateConfig({ key: 'action', value: option.action })); //store initial config
    }

    const generateInput = (input: SidepanelInput): React.JSX.Element => {

        let dynamicComp;
        switch (input.type) {
            case 'INPUT':
                dynamicComp = <Input {...input.attributes} onChange={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'INPUT_ARRAY':
                dynamicComp = <InputArray {...input.attributes} onChange={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'SLIDER':
                dynamicComp = <Slider {...input.attributes} onChange={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.value }))} />
                break;

            case 'CHECKBOX':
                dynamicComp = <Checkbox {...input.attributes} onChange={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.checked }))} />;
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...input.attributes} onChange={(e: ContextMenuCommand) => dispatch(updateConfig({ key: input.configKey, value: e.text }))} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(input)}>{dynamicComp}</Fragment>;

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