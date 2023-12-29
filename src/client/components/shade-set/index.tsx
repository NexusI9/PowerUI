import { Shade as IShade } from '@ctypes/shade';
import './index.scss';
import { Shade } from '@components/shade';


export const ShadeSet = ({ shades }: { shades: Array<IShade> }) => {

    return (<>
        {shades.map( (shade,i) => <Shade key={JSON.stringify(shade)+i} {...shade} />)}
    </>);
}