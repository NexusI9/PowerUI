import './index.scss';
import { Input as InputInterface} from '@ctypes/input';


export const Input = ({ type = 'default', value, placeholder = 'Enter a value', onChange, onBlur, onFocus, onEnter }: InputInterface) => {

    return (
        <label className={`input-field ${type}`}>
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={ (e:any) => {
                    if (e.code === 'Enter') {
                        onEnter(e);
                        e.target.blur();
                    }
                }}
            />
        </label>
    );
}