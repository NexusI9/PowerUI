import { SetMethod, Workbench } from "@ctypes/workbench";
import { ShadeSet } from "@components/shade-set";
import { useSelector } from "react-redux";
import { Shade } from "@ctypes/shade";
import { useEffect } from "react";



export const Content = () => {

    const { type, set } = useSelector((state:any) => state.workbench);
    const setComponent = type === 'COLOR' ? <ShadeSet shades={set ? set as Array<Shade> : []} /> : <></>;
    
    return (<div className="workbench-content flex f-col gap-s">
        {setComponent}
    </div>);
}