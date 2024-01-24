import { ExportPaintConfig } from "@ctypes/export.template"
import './index.scss';
import { Swatch } from "./swatch";

export const ExportPaint = (props: ExportPaintConfig) => {
    return (
        <div className="export-paint flex f-col gap-m full-height full-width" data-direction={props.layout}>
            <p className="text-color-discrete"><small>Template preview</small></p>
            <div className="export-paint-container flex f-col gap-m">
                <h3 className="heading-4" style={{ fontFamily: props.typeface || 'Inter' }}>Primary</h3>
                <div>
                    {Array.apply(null, Array(4)).map((_, i) => <Swatch key={`swatch${i}`} {...{ ...props, name: `primary-${(i + 1) * 100}` }} />)}
                </div>
            </div>

        </div>
    );
}