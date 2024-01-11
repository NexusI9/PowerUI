import { Input } from '@components/input';
import './index.scss';
import { folderNameFromPath } from '@lib/utils/style';
import { Font } from '@components/font';
import { Icon } from '@components/icon';
import Lock from '@icons/lock-locked.svg'
import { WorkbenchComponent } from 'src/types/workbench';

export const FontSet = ({ style, index }: WorkbenchComponent<TextStyle>) => {

    const { name } = folderNameFromPath(style.name);

    return (
        <div className='font-set flex f-row gap-m f-center-h' data-base={!!(index === 0)}>
            {
                (index === 0) && <Icon icon={Lock} /> ||
                (index && index > 0) && <p className='font-set-index'><small>{index}</small></p>
            }
            <div className='font-set-content flex f-col'>
                <Input
                    type='DEFAULT'
                    appearance={{ minified: true }}
                    placeholder={'Style name'}
                    value={style.name}
                />
                <Font {...{ ...style, name: name }} />
            </div>
        </div>
    );
}