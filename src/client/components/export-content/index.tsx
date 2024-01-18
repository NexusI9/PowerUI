import './index.scss';
import { ExportPaint } from "@components/export-paint";
import { ExportText } from "@components/export-text";
import { createElement } from "react";
import { BaseTemplate } from "@ctypes/template";

const TAB_MAP: Record<string, any> = {
    'PAINT': ExportPaint,
    'TEXT': ExportText
};

export const ExportContent = (props: BaseTemplate) => {

    return (<div className="export-content paper flex f-center-w">
        {createElement(TAB_MAP[props.type] || 'span', props.config)}
    </div>)
}