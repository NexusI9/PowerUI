import { Input } from '@components/input';
import './index.scss';
import { folderNameFromPath } from '@lib/utils/style';
import { Font } from '@components/font';

export const FontSet = (props: TextStyle) => {
    
    const {folder, name} = folderNameFromPath(props.name);

    return (
        <div className='font-set flex f-col'>
            <div className='flex f-row'>
                <Input
                    type='DEFAULT'
                    appearance={{ minified: true }}
                    placeholder={'Style name'}
                    value={props.name}
                />
            </div>
            <div className='flex f-row f-between'>
                <Font {...{...props, name:name}} />
            </div>
        </div>
    );
}