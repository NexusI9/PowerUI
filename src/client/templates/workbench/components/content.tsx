import { useSelector } from "react-redux";
import { ShadeSet } from "@components/shade-set";
import { Shade as IShade } from "@ctypes/shade";
import { Workbench } from "@ctypes/workbench";

export const Content = () => {

    const { type, set } = useSelector((state: any) => state.workbench);

    const mapComponent: { [key in Workbench['type']as string]: () => React.JSX.Element } = {
        'COLOR': () => set.map((shade: IShade, i: number) => <ShadeSet key={JSON.stringify(shade) + i} {...shade} />),
        'TEXT': () => <></>
    };

    return (<div className="workbench-content flex f-col ">
        {set && mapComponent[type]()}
    </div>);
}