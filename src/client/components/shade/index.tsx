import { Shade as IShade } from "@ctypes/shade";
import { rgbToHsl, rgb, rgbToHex } from "@lib/utils/color";
import './index.scss';

export const Shade = (props: IShade) => {

    const { color, name } = props;

    const colorValue = {
        hex: rgbToHex(color),
        rgb: rgb(color, 'STRING'),
        hsl: rgbToHsl(color, 'STRING')
    };

    return (
        <div className="shade">
            <span className="shade-color" style={{ backgroundColor: colorValue.rgb as string }}></span>
            <p>{name}</p>
            <p>{colorValue.hex}</p>
            <ul>
                {Object.keys(colorValue).map((key, i) => <li key={key + i}>{String(colorValue[key as keyof typeof colorValue])}</li>)}
            </ul>
        </div>
    );

}