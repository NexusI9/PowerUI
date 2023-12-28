import { Dropdown } from "@components/dropdown";
import { Sidepanel as ISidepanel, SidepanelList, SidepanelOptions } from "@lib/types/workbench";
import { Fragment, useEffect, useState } from "react";
import { set_multi_array_active_item, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";
import { useDispatch } from "react-redux";
import { updateSet } from "@lib/slices/workbench";

export const Sidepanel = ({ options }: ISidepanel) => {

    const [activeIndex, setActiveIndex] = useState<number | Array<number>>();
    const dispatch = useDispatch();

    const generateInput = (input: SidepanelList): React.JSX.Element => {

        let dynamicComp;
        switch (input.type) {
            case 'INPUT':
            case 'COLOR':
            case 'AMOUNT':
            case 'SLIDER':
                dynamicComp = <Input {...input.attributes} onBlur={ dispatch(updateSet([])) }/>;
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...input.attributes} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(input)}>{dynamicComp}</Fragment>;

    }

    const generateOption = (content: SidepanelOptions | Array<SidepanelOptions>): any => {
        return traverseCallback(content, generateInput);
    }

    useEffect(() => {
        //init
        setActiveIndex(Array.isArray(options[0]) ? [0, 0] : 0);
    }, []);


    return (<div className="workbench-sidepanel flex f-col gap-l">
        {
            options.length &&
            <>
                <Dropdown list={options} onChange={setActiveIndex} style={{ label: true }} placeholder="Swatch type" />
                <hr />
            </>
        }
        {
            activeIndex && set_multi_array_active_item(activeIndex, options).content.map(generateOption)
        }
    </div>);
}