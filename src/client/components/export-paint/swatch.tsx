import { ExportPaintConfig } from "@ctypes/export"
import './index.scss';
import { Contrast } from "./contrast";

export const Swatch = (props: ExportPaintConfig & any) => {

    const formatMap = [
        { key: 'hex', label: 'HEX', value: '#0c8ce9' },
        { key: 'rgb', label: 'RGB', value: ['12', '140', '233'].join(' • ') },
        { key: 'hsl', label: 'HSL', value: ['205', '90%', '48%'].join(' • ') },
        { key: 'cmyk', label: 'CMYK', value: ['87%', '36%', '0%', '9%'].join(' • ') },
        { key: 'pantone', label: 'Pantone', value: '2925 C' },
    ];

    return (
        <div className="export-paint-swatch">
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
                            <li key={key + label + i} className="flex f-row f-between full-width">
                                <p>{label}</p>
                                <p>{value}</p>
                            </li>)
                    }
                </ul>
            </div>
        </div>)
        ;
}