import './Tooltip.scss';
import { useSelector } from 'react-redux';
import { ToolTipItem } from 'src/types/tooltip';
import { convertPayload } from './Tooltip.helper';
import { Input } from '@components/input';
import { send } from '@lib/ipc';
import { Fragment, useEffect, useRef, useState } from 'react';
import { DEFAULT_TOOLTIP } from '@lib/constants';


export default () => {

    const storeData = useSelector((state: any) => state.tooltip);
    const [persistentData, setPersistentData] = useState(DEFAULT_TOOLTIP);
    const [hover, setHover] = useState(false);
    const checkTimeout: any = useRef();

    const MAX_WIDTH = 130; //tooltip max width
    const OVERLAP_MARGIN = 2; //margin to maintain hover state when mouse goes out of target to got to tooltip


    useEffect(() => {

        clearTimeout(checkTimeout.current);

        //if is not hovered (yet) and has store content => display
        if (!hover && !!storeData.content.length) {
            setPersistentData(storeData);
        }

        //if left tooltip & no more store content => then hide
        if (!hover && !storeData.content.length) {
            checkTimeout.current = setTimeout(() => {
                if (!hover) {
                    setPersistentData(DEFAULT_TOOLTIP);

                }
                clearTimeout(checkTimeout.current);
            }, 50);
        }

    }, [storeData, hover]);


    return (<div
        className='tooltip-wrapper'
        style={{ transform: `translate3d(${persistentData.boundingBox.x - (MAX_WIDTH / 2) + (persistentData.boundingBox.width / 2)}px,${persistentData.boundingBox.y + persistentData.boundingBox.height - OVERLAP_MARGIN}px,0px)` }}
        data-display={!!persistentData.content.length}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
    >
        <div className='tooltip-content panel flex f-col gap-s pop'>{
            persistentData.content?.map((content: ToolTipItem, i: number) => {

                const handleAction = (e: any) => {
                    if (content.type == 'INPUT') {
                        send({ action: content.action, payload: { ...convertPayload(content.payload, e.target.value) } })
                    }
                };
                let dynamicElement;
                switch (content.type) {

                    case 'INPUT':
                        dynamicElement = <Input
                            onBlur={handleAction}
                            onEnter={handleAction}
                            value={content.value}
                            appearance={{ minified: true, stroke: true }}
                            placeholder=''
                        />;
                        break;
                    case 'TEXT':
                        dynamicElement = <p key={JSON.stringify(content) + i} ><small>{content.value}</small></p>;
                        break;
                    default:
                        dynamicElement = <span />;
                        break;
                }

                return <Fragment key={JSON.stringify(content) + i}>
                    {dynamicElement}
                </Fragment>
            })}
        </div>
    </div>);

}