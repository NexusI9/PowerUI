import { Input } from '@components/input';
import { rgb, rgbToHex, hexToRgb, rgbToHsl } from '@lib/utils/color';
import './swatch.scss';
import { send } from '@lib/ipc';
import { folderNameFromPath } from '@lib/utils/style';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { useDispatch } from 'react-redux';
import { ContextMenuCommand } from '@ctypes/contextmenu';
import { display as displayTooltip, destroy as destroyTooltip } from '@lib/slices/tooltip';
import { display as displaySnackBar } from '@lib/slices/snackbar';

export const Swatch = (props: any) => {

    const swatchContextMenu: Array<ContextMenuCommand> = [
        { text: 'Edit', action: 'MODALE_EDIT_STYLE_COLOR', payload: { style: props }, receiver: 'API' },
        { text: 'Duplicate', action: 'ADD_STYLE', payload: { style: props.paints, name: props.name, type: 'COLOR' }, receiver: 'API' },
        { text: 'Delete', action: 'DELETE_STYLE', payload: { style: props }, receiver: 'API' },
    ];

    const dispatch = useDispatch();

    const handleOnChange = (e: any) => send({ action: 'UPDATE_STYLE_COLOR', payload: { style: props, color: hexToRgb(e.target.value, true) } });
    const handleOnBlur = (e: any) => send({ action: "UPDATE_STYLE_NAME", payload: { style: props, name: e.target.value } });

    const handleContextMenu = (e: any) => {
        dispatch(displayContextMenu({
            commands: swatchContextMenu,
            position: { x: e.clientX, y: e.clientY }
        }));
    }

    const handleOnColorClick = (value: string) => {
        /*
        Can't copy yet
        dispatch(displaySnackBar({type:'information', message:'Value copied!'}));
        console.log(window.isSecureContext);
        */
    }

    const handleToolTip = (ref: any, hexValue: string) => {
        const { x, y, width, height } = ref.getBoundingClientRect();
        dispatch(displayTooltip({
            content: [
                { type: 'INPUT', value: folderNameFromPath(props.name).name, action: 'UPDATE_STYLE_NAME', payload: { style: props, name: null } },
                { type: 'INPUT', value: hexValue, action: 'UPDATE_STYLE_COLOR', payload: { style: props, color: null } }
            ],
            boundingBox: { x, y, width, height }
        }));
    }

    return (<>
        {
            props.paints.map((paint: any) => {

                const rgbValue = rgb(paint.color) as string;
                const hexValue = rgbToHex(paint.color) as string;
                const hslValue = rgbToHsl(paint.color, 'STRING', true) as string;
                const colorValues = [hexValue, rgbValue, hslValue];

                return (
                    <div
                        key={props.id}
                        className="style-item-swatch"
                    >
                        <label
                            style={{ backgroundColor: rgbValue }}
                            onContextMenu={handleContextMenu}
                            onMouseEnter={(e) => handleToolTip(e.target, hexValue)}
                            onMouseLeave={() => dispatch(destroyTooltip())}
                        >
                            <input
                                type="color"
                                defaultValue={hexValue}
                                onChange={handleOnChange}
                                onClick={() => dispatch(destroyTooltip())}
                            />
                        </label>
                        <div className='style-item-swatch-detail flex f-row gap-l'>
                            <Input value={folderNameFromPath(props.name).name} onBlur={handleOnBlur} onEnter={handleOnBlur} appearance={{ minified: true }} />
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