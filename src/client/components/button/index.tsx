import { Button as IButton } from 'src/types/input';
import './index.scss';


export const Button = ({ value, onClick = () => 0, role }: IButton) => {

    return (
        <button className='button flex f-row f-center' data-role={role} onClick={onClick && onClick || undefined}>
            {value}
        </button>
    );
}