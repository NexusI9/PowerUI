import { Dropdown } from "@components/dropdown";
import { Sidepanel as SidepanelInterface, SidepanelList } from "@lib/types/workbench";

export const Sidepanel = ({ options }: SidepanelInterface) => {

    const generateOptions = () => {

    }

    console.log(options);
    return (<div className="workbench-sidepanel flex f-col gap-m">
        {
            options.length &&
             <>
                <Dropdown list={options}/>
                <hr />
            </> || <></>
        }
    </div>);
}