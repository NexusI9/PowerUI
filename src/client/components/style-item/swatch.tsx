import { rgb, rgbToHex } from './swatch.helper';
import './swatch.scss';
import { send } from '@lib/ipc';


export const Swatch = (props: any) => {

    const handleOnChange = (e:any) => {
        console.log(e);
    }
    //console.log(props);
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