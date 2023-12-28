import { Dropdown } from "@components/dropdown";
import { Sidepanel as SidepanelInterface, SidepanelList, SidepanelOptions } from "@lib/types/workbench";
import { Fragment, useEffect, useState } from "react";
import { set_multi_array_active_item, traverseCallback } from "@lib/utils/utils";
import { Input } from "@components/input";

export const Sidepanel = ({ options }: SidepanelInterface) => {

    const [activeIndex, setActiveIndex] = useState<number | Array<number>>();

    const generateInput = (input: SidepanelList): React.JSX.Element => {

        let dynamicComp;

        switch (input.type) {
            case 'INPUT':
                dynamicComp = <Input {...input.attributes} />;
                break;

            case 'DROPDOWN':
                dynamicComp = <Dropdown {...input.attributes} />;
                break;

            case 'COLOR':
                dynamicComp = <Input {...input.attributes} />;
                break;

            case 'AMOUNT':
                dynamicComp = <Input {...input.attributes} />;
                break;

            case 'SLIDER':
                dynamicComp = <Input {...input.attributes} />;
                break;

            default:
                dynamicComp = <></>;
        }

        return <Fragment key={JSON.stringify(input)}>{dynamicComp}</Fragment>

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
                <Dropdown list={options} onChange={setActiveIndex} style={{label:true}} placeholder="Swatch type" />
                <hr />
            </>
        }
        {
            activeIndex && set_multi_array_active_item(activeIndex, options).content.map(generateOption)
        }
    </div>);
}