import { Shade as IShade } from "@ctypes/shade";
import { rgbToHsl, rgb, rgbToHex } from "@lib/utils/color";
import './index.scss';
import { ContrastLabel } from "./contrast";
import Lock from '@icons/lock-locked.svg';
import { Icon } from "@components/icon";

export const Shade = (props: IShade) => {

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
            <p>{name}</p>
            <p>{colorValue.hex}</p>
            <ul>
                {Object.keys(colorValue).map((key, i) => <li key={key + i}>{String(colorValue[key as keyof typeof colorValue])}</li>)}
            </ul>
        </div>
    );

}