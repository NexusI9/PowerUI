import { rgb, rgbToHex, hexToRgb } from './swatch.helper';
import './swatch.scss';
import { send } from '@lib/ipc';


export const Swatch = (props: any) => {

    const handleOnChange = (e:any) => {
        send({type:'UPDATE_STYLE_COLOR', style:props, color: hexToRgb(e.target.value, true) });
    }

    return (<>
        {
            props.paints.map((paint: any) => (
                <label
                    key={props.id}
                    className="style-item-swatch"
                    style={{ backgroundColor: rgb(paint.color) }}>
                    <input
                        type="color"
                        defaultValue={rgbToHex(paint.color)}
                        onChange={handleOnChange}
                    />
                </label>

            ))
        }
    </>)
};