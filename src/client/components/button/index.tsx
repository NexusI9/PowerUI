import { Button as IButton } from '@ctypes/input';
import './index.scss';


export const Button = ({ text, onClick, role }: IButton) => {

    return (
        <button className='button flex f-row f-center' data-role={role} onClick={onClick}>
            {text}
        </button>
    );
}