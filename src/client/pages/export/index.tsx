import { TabBar } from "@components/tab-bar";
import { Tab as ITab } from "@ctypes/input";
import Paint from '@icons/paint.svg';
import Font from '@icons/font.svg';
import Dev from '@icons/dev.svg';
import { Export } from "@templates/export";
import { useState } from "react";

const tabMap: Array<ITab> = [
    { value: 'Colors', iconLeft: Paint },
    { value: 'Fonts', iconLeft: Font },
    { value: 'Code', iconLeft: Dev }
];


export default () => {

    const [activeTab, setActiveTab] = useState<ITab>(tabMap[0]);

    return (<>
        <TabBar list={tabMap} onClick={setActiveTab} />
        <Export />
    </>);
}