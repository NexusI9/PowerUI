import { Tab } from "@components/tab";
import { Tab as ITab } from "@ctypes/input";
import { useState } from "react";
import './TabBar.scss';

export default ({ list, onClick }: { list: Array<ITab>, onClick?: any }) => {

    const [active, setActive] = useState(0);

    return (<div className="tab-bar flex f-row">
        {
            list.map((tab, index) =>
                <Tab key={JSON.stringify(tab)+index} {...
                    {
                        ...tab,
                        active: !!(active === index),
                        onClick: (prop) => {
                            if (tab.onClick) tab.onClick(prop);
                            if (onClick) onClick(prop);
                            setActive(index);

                        }
                    }
                } />)
        }
    </div>);
}