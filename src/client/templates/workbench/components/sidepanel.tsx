import { Dropdown } from "@components/dropdown";
import { Sidepanel as ISidepanel, SidepanelList, SidepanelOption, Workbench } from "@lib/types/workbench";
import { BaseSyntheticEvent, Fragment, useEffect, useState } from "react";
import { itemFromIndex, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch, useSelector } from "react-redux";
import { updateConfig } from "@lib/slices/workbench";
import { DropdownCommand } from "@ctypes/input";
import { Slider } from "@components/slider";

export const Sidepanel = () => {

    const [activeOption, setActiveOption] = useState<SidepanelOption>();
    const { sidepanel: { options } } = useSelector((state: any) => state.workbench);

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
                dynamicComp = <Input {...input.attributes} onChange={(e: BaseSyntheticEvent) => dispatch(updateConfig({ key: input.configKey, value: e.target.value }))} />;
                break;

            case 'SLIDER':
                dynamicComp = <Slider {...input.attributes} />
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...input.attributes} onChange={({ item }: { item: DropdownCommand }) => dispatch(updateConfig({ key: input.configKey, value: item.text }))} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(input)}>{dynamicComp}</Fragment>;

    }


    useEffect(() => {
        //init
        if (options) {
            updateIndex(Array.isArray(options[0]) ? [0, 0] : 0);
        }

    }, [options]);

    return (<div className="workbench-sidepanel flex f-col">
        {
            (options?.length > 1) &&
            <>
                <Dropdown list={options} onChange={({ id }: { id: number | Array<number> }) => updateIndex(id)} style={{ label: true }} placeholder="Swatch type" />
                <hr />
            </>
        }
        {activeOption?.content.map(input => traverseCallback(input, generateInput))}
    </div>);
}