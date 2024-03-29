import { ExportPaintConfig } from "@ctypes/export.template"
import './ExportPaint.scss';
import { Swatch } from "./Swatch";

export default (props: ExportPaintConfig) => {
    return (
        <div className="export-paint flex f-col gap-m full-height full-width f-center-h" data-direction={props.layout}>
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