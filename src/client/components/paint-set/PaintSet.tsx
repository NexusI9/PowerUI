import { PaintSet as IPaintSet } from "src/types/shade";
import { rgbToHsl, rgb, rgbToHex } from "@lib/utils/color";
import './PaintSet.scss';
import { ContrastLabel } from "./Contrast";
import Lock from '@icons/lock-locked.svg';
import { Icon } from "@components/icon";
import { folderNameFromPath } from "@lib/utils/style";


export default (style: IPaintSet) => {

    const { paints, name, contrast, primary } = style;
    const { color } = paints && (paints[0] as SolidPaint) || { color: { r: 0, g: 0, b: 0 } };

    const colorValue = {
        hex: rgbToHex(color),
        rgb: rgb(color, 'STRING'),
        hsl: rgbToHsl(color, 'STRING', true)
    };

    return (
        <div className="shade">
            <span className="shade-color flex f-row f-center f-between" style={{ backgroundColor: colorValue.rgb as string }}>
                {contrast &&
                    <div className="shade-contrast flex f-col">
                        <ContrastLabel {...contrast.white} />
                        <ContrastLabel {...contrast.black} />
                    </div>
                }
                {primary && <Icon icon={Lock} />}
            </span>
            <div className='flex f-col'>
                <p>{folderNameFromPath(String(name)).name}</p>
                <ul className="flex f-row gap-m">
                    {Object.keys(colorValue).map((key, i) => key === 'hsl' && <li key={key + i}><small>{String(colorValue[key as keyof typeof colorValue])}</small></li>)}
                </ul>
            </div>

        </div>
    );

}