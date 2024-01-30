import './OptionsRow.scss';
import { MultiArray } from '@ctypes/global';
import { traverseCallback } from '@lib/utils/utils';
import { Button } from '@components/button';
import { Button as IButton } from '@ctypes/input';

export default ({ options, className }: { options: MultiArray<IButton>, className?: string }) => (
    <div className={`options-row flex f-row gap-m ${className && className || ''}`}>{
        options.map((option, i) => <div key={JSON.stringify(option) + i} className='flex f-row gap-xs'>
            {traverseCallback(option, (option: IButton, i:number) => <Button key={JSON.stringify(option)+i}{...option} />)}
        </div>)
    }</div>
);