import { Shade as IShade} from "@ctypes/shade";
import { ColorRGB } from "@lib/types/color";
import { rgbToHsl, hexToRgb } from "@lib/utils/color";
import './index.scss';

export const Shade = (props:IShade) => {

    const { color, name } = props;

    const colorValue = {
        hex:color,
        rgb:hexToRgb(color, false, 'STRING'),
        hsl:rgbToHsl(hexToRgb(color, false,'OBJECT') as ColorRGB)
    };

    return(
        <div className="shade flex f-row f-center-v f-between">
            <span className="shade-color" style={{backgroundColor:color}}></span>
            <p><small>{name}</small></p>
            <ul>
                {Object.keys(colorValue).map( (key,i) => <li key={key+i}>{String(colorValue[key as keyof typeof colorValue])}</li> )}
            </ul>
        </div>
    );

}