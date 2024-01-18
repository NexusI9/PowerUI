import { ExportPaintConfig } from "@ctypes/export.template"
import './index.scss';
import { Contrast } from "./contrast";
import { colorSynthax } from "./swatch.helper";

export const Swatch = (props: ExportPaintConfig & any) => {

    const formatMap = [
        { key: 'hex', label: 'HEX', value: '#0c8ce9' },
        { key: 'rgb', label: 'RGB', value: colorSynthax(['12', '140', '233'], props.colorSynthax, 'rgb') },
        { key: 'hsl', label: 'HSL', value: colorSynthax(['205', '90%', '48%'], props.colorSynthax, 'hsl') },
        { key: 'cmyk', label: 'CMYK', value: colorSynthax(['87%', '36%', '0%', '9%'], props.colorSynthax, undefined) },
        { key: 'pantone', label: 'Pantone', value: '2925 C' },
    ];

    return (
        <div className="export-paint-swatch" style={{ fontFamily: props.typeface || 'Inter' }}>
            <div className="export-paint-color" style={{ borderRadius: `${(props.swatchBorderRadius || 0)}px` }}>
                {
                    props.contrastRatio &&
                    <div className="flex f-col gap-s">
                        <Contrast color={'#000000'} ratio={4.58} AAA={true} AA={true} />
                        <Contrast color={'#FFFFFF'} ratio={2.23} AAA={true} AA={false} />
                    </div>
                }
            </div>
            <div>
                <h6 className="heading-8">{String(props.name)}</h6>
                <ul>
                    {
                        formatMap.map(({ key, label, value }, i) => props[key] &&
                            <li key={key + label + i} className="flex f-row f-between full-width gap-xl">
                                <p>{label}</p>
                                <p>{value}</p>
                            </li>)
                    }
                </ul>
            </div>
        </div>)
        ;
}