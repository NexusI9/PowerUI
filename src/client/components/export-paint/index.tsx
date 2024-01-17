import { ExportPaintConfig } from "@ctypes/export"
import './index.scss';
import { Swatch } from "./swatch";

export const ExportPaint = (props: ExportPaintConfig) => {
    return (
        <div className="export-paint flex f-col gap-m" data-direction={props.layout}>
            <h3 className="heading-4" style={{ fontFamily: props.typeface || 'Inter' }}>Primary</h3>
            <div>
                {Array.apply(null, Array(4)).map((_, i) => <Swatch key={`swatch${i}`} {...{ ...props, name: `primary-${(i + 1) * 100}` }} />)}
            </div>
        </div>
    );
}