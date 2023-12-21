import { Input } from '@components/input';
import { rgb, rgbToHex, hexToRgb, rgbToHsl } from './swatch.helper';
import './swatch.scss';
import { send, listen } from '@lib/ipc';
import { folderNameFromPath } from '@lib/utils';
import { display as displayContextMenu } from '@lib/slices/contextmenu.slice';
import { useDispatch } from 'react-redux';
import { ContextMenuCommand } from '@lib/interfaces';


export const Swatch = (props: any) => {

    const dispatch = useDispatch();
    const swatchContextMenu: Array<ContextMenuCommand> = [
        { text: 'Duplicate', action: 'ADD_STYLE_COLOR', payload: {style: props.paints, name:props.name} },
        { text: 'Delete', action: 'DELETE_STYLE', payload: {style:props} },
    ];

    const handleOnChange = (e: any) => send({ type: 'UPDATE_STYLE_COLOR', style: props, color: hexToRgb(e.target.value, true) });

    const handleOnBlur = (e: any) => send({ type: "UPDATE_STYLE_NAME", style: props, name: e.target.value });

    const handleContextMenu = (e: any) => {
        dispatch(displayContextMenu({
            commands: swatchContextMenu,
            position: { x: e.clientX, y: e.clientY }
        }));
    }

    listen( (request:any) => console.log(request) );

    return (<>
        {
            props.paints.map((paint: any) => {

                const rgbValue = rgb(paint.color)
                const hexValue = rgbToHex(paint.color);
                const hslValue = rgbToHsl(paint.color);
                const colorValues = [hexValue, rgbValue, hslValue];

                return (
                    <div
                        key={props.id}
                        className="style-item-swatch"
                    >
                        <label
                            style={{ backgroundColor: rgbValue }}
                            onContextMenu={handleContextMenu}
                        >
                            <input
                                type="color"
                                defaultValue={hexValue}
                                onChange={handleOnChange}
                            />
                        </label>
                        <div className='style-item-swatch-detail flex f-row gap-l'>
                            <Input value={folderNameFromPath(props.name).name} onBlur={handleOnBlur} />
                            <div className='style-item-swatch-codes'>
                                {
                                    colorValues.map((value, i) => <p key={paint.id + i + value}><small>{value}</small></p>)
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </>)
};