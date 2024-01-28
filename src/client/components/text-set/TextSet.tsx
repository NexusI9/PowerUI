import { Input } from '@components/input';
import './index.scss';
import { Text } from '@components/text';
import { Icon } from '@components/icon';
import Lock from '@icons/lock-locked.svg'
import { BaseSyntheticEvent, useState } from 'react';
import { TextSet as ITextSet } from '@ctypes/text';

export default (style: ITextSet) => {
    const [innerStyle, setInnerStyle] = useState<ITextSet>(style);
    const { index } = style;
    const updateStyleName = (e: BaseSyntheticEvent) => {
        setInnerStyle({ ...innerStyle, name: e.target.value })
    }
    return (
        <div className='font-set flex f-row gap-m f-center-h' data-base={!!(index === 0)}>
            {
                (index === 0) && <Icon icon={Lock} /> ||
                (index && Number(index) !== 0) && <p className='font-set-index'><small>{index}</small></p>
            }
            <div className='font-set-content flex f-col'>
                <Input
                    type='DEFAULT'
                    appearance={{ minified: true, stroke: false }}
                    placeholder={'Style name'}
                    value={innerStyle.name}
                    onChange={updateStyleName}
                />
                <Text {...{ ...innerStyle }} />
            </div>
        </div>
    );
}