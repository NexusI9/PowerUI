import { Input } from '@components/input';
import { rgb, rgbToHex, hexToRgb, rgbToHsl } from '@lib/utils/color';
import './swatch.scss';
import { send } from '@lib/ipc';
import { folderNameFromPath, styleContextMenu } from '@lib/utils/style';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { useDispatch } from 'react-redux';
import { display as displayTooltip, destroy as destroyTooltip } from '@lib/slices/tooltip';
import { display as displaySnackBar } from '@lib/slices/snackbar';

export default (props: any) => {


    const dispatch = useDispatch();

    const handleOnChange = (e: any) => send({ action: 'UPDATE_STYLE_COLOR', payload: { style: props, color: hexToRgb(e.target.value, true) } });
    const handleOnBlur = (e: any) => send({ action: "UPDATE_STYLE_NAME", payload: { style: props, name: e.target.value } });

    const handleContextMenu = (e: any) => {
        dispatch<any>(displayContextMenu({
            commands: styleContextMenu({ style: props, editCommand: 'MODALE_EDIT_STYLE_COLOR' }),
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
                            <Input value={folderNameFromPath(props.name).name} onBlur={handleOnBlur} onEnter={handleOnBlur} appearance={{ minified: true, stroke: false }} />
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