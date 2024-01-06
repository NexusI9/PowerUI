import ArrowHorizontal from '@icons/horizontal.svg';
import ArrowVertical from '@icons/vertical.svg';
import { convertUnit, folderNameFromPath } from '@lib/utils/style';
import './index.scss';
import { Icon } from '@components/icon';

export const Font = (props: any) => {
    
    const style = {
        fontWeight:props.fontName.style, 
        fontSize:props.fontSize+'px',
        letterSpacing: String((props.letterSpacing.value || 0) + convertUnit(props.letterSpacing.unit)),
        lineHeight: props.lineHeight.value && String((props.lineHeight.value) + convertUnit(props.lineHeight.unit)),
    }

    return (<div className="style-item-font">
        <ul className="style-item-font-details flex f-col gap-xs">
            <li><small>{props.fontName.family}</small></li>
            <li><small>{props.fontSize}</small></li>
            <ul className="flex f-row gap-m">
                <li className='flex f-row gap-xs f-center-h'><Icon icon={ArrowVertical}/> <small>{style.letterSpacing}</small></li>
                { style.lineHeight && <li className='flex f-row gap-xs f-center-h'><Icon icon={ArrowHorizontal}/> <small>{style.lineHeight}</small></li> }
            </ul>
        </ul>
        <p style={style}>{folderNameFromPath(props.name).name}</p>
    </div>);
}