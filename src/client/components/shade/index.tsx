import { Shade as IShade } from "@ctypes/shade";
import { rgbToHsl, rgb, rgbToHex } from "@lib/utils/color";
import './index.scss';
import { ContrastLabel } from "./contrast";

export const Shade = (props: IShade) => {

    const { color, name, contrast } = props;

    const colorValue = {
        hex: rgbToHex(color),
        rgb: rgb(color, 'STRING'),
        hsl: rgbToHsl(color, 'STRING')
    };

    return (
        <div className="shade">
            <span className="shade-color flex f-col f-center-w" style={{ backgroundColor: colorValue.rgb as string }}>
                <div className="shade-contrast flex f-col">
                    <ContrastLabel {...contrast.white}/>
                    <ContrastLabel {...contrast.black}/>
                </div>
            </span>
            <p>{name}</p>
            <p>{colorValue.hex}</p>
            <ul>
                {Object.keys(colorValue).map((key, i) => <li key={key + i}>{String(colorValue[key as keyof typeof colorValue])}</li>)}
            </ul>
        </div>
    );

}