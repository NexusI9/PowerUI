import { Workbench } from "@ctypes/workbench";
import { ShadeSet } from "@components/shade-set";
import { useSelector } from "react-redux";
import { Shade } from "@ctypes/shade";


export const Content = () => {

    const { type, set } = useSelector((state:any) => state.workbench);

    const setComponent = type === 'COLOR' ? <ShadeSet shades={set as Array<Shade>} /> : <></>;

    return (<div className="workbench-content">
        {setComponent}
    </div>);
}