import { ContrastPropreties } from '@ctypes/shade';

export const ContrastLabel = ({ratio, large, regular}:ContrastPropreties) => {

    return (<div className='flex f-row gap-s f-center-h'>
        <p>{ratio}</p>
        {large && <p>{large}</p>}
        {regular && <p><small>{regular}</small></p>}
    </div>);
}