import { Dropdown } from "@components/dropdown";
import { Sidepanel as ISidepanel, SidepanelList, SidepanelOption } from "@lib/types/workbench";
import { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import { itemFromIndex, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch } from "react-redux";
import { updateConfig } from "@lib/slices/workbench";

export const Sidepanel = ({ options }: ISidepanel) => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const dispatch = useDispatch();

    const updateIndex = (index: number | Array<number>) => {
        const activeOption = itemFromIndex(index, options);
        setActiveOption(activeOption);
        dispatch(updateConfig({ key: 'action', value: activeOption.action }));
    }

    const generateInput = (input: SidepanelList): React.JSX.Element => {

        let dynamicComp;
        switch (input.type) {
            case 'INPUT':
            case 'COLOR':
            case 'AMOUNT':
            case 'SLIDER':
                dynamicComp = <Input {...input.attributes} onBlur={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...input.attributes} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(input)}>{dynamicComp}</Fragment>;

    }


    useEffect(() => {
        //init
        updateIndex(Array.isArray(options[0]) ? [0, 0] : 0);
    }, []);

    return (<div className="workbench-sidepanel flex f-col gap-l">
        {
            options.length &&
            <>
                <Dropdown list={options} onChange={updateIndex} style={{ label: true }} placeholder="Swatch type" />
                <hr />
            </>
        }
        {activeOption?.content.map(input => traverseCallback(input, generateInput))}
    </div>);
}