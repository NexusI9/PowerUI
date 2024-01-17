import { TabBar } from "@components/tab-bar";
import { Tab as ITab } from "@ctypes/input";
import Paint from '@icons/paint.svg';
import Font from '@icons/font.svg';
import Dev from '@icons/dev.svg';
import { Export } from "@templates/export";
import { useState } from "react";
import { COLOR_EXPORT_TEMPLATE } from "./color.config";
import { Export as IExport } from '@ctypes/export';
import { DEV_EXPORT_TEMPLATE } from "./dev.config";
import { FONT_EXPORT_TEMPLATE } from "./font.config";
import './index.scss';
import { ExportPaint } from "@components/export-paint";
import { ExportText } from "@components/export-text";
import { TextArea } from "@components/text-area";

const TAB_MAP: Record<string, Record<'tab', ITab> & Record<'template', IExport> & Record<'component', any>> = {
    Colors: {
        tab: { value: 'Colors', iconLeft: Paint },
        template: COLOR_EXPORT_TEMPLATE,
        component: ExportPaint
    },
    Fonts: {
        tab: { value: 'Fonts', iconLeft: Font },
        template: FONT_EXPORT_TEMPLATE,
        component: ExportText
    },
    Code: {
        tab: { value: 'Code', iconLeft: Dev },
        template: DEV_EXPORT_TEMPLATE,
        component: TextArea
    }
};


export default () => {

    const [activeTab, setActiveTab] = useState<ITab>(TAB_MAP.Colors.tab);

    return (<section className="page export">
        <TabBar list={Object.keys(TAB_MAP).map(key => TAB_MAP[key].tab)} onClick={setActiveTab} />
        <Export {...TAB_MAP[activeTab.value]} />
    </section>);
}