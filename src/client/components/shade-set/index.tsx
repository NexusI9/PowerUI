import { Shade as IShade } from "@ctypes/shade";
import { rgbToHsl, rgb, rgbToHex } from "@lib/utils/color";
import './index.scss';
import { ContrastLabel } from "./contrast";
import Lock from '@icons/lock-locked.svg';
import { Icon } from "@components/icon";

export const ShadeSet = (props: IShade) => {

    const { color, name, contrast } = props;

    const colorValue = {
        hex: rgbToHex(color),
        rgb: rgb(color, 'STRING'),
        hsl: rgbToHsl(color, 'STRING', true)
    };

    return (
        <div className="shade">
            <span className="shade-color flex f-row f-center f-between" style={{ backgroundColor: colorValue.rgb as string }}>
                <div className="shade-contrast flex f-col">
                    <ContrastLabel {...contrast.white} />
                    <ContrastLabel {...contrast.black} />
                </div>
                {props.primary && <Icon icon={Lock} />}
            </span>
            <div className='flex f-col'>
                <p>{name}</p>
                <ul className="flex f-row gap-m">
                    {Object.keys(colorValue).map((key, i) => key === 'hsl' && <li key={key + i}><small>{String(colorValue[key as keyof typeof colorValue])}</small></li>)}
                </ul>
            </div>

        </div>
    );

}