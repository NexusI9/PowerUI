import './index.scss';
import { Option } from "src/types/folder";
import { OptionsRow } from "@components/options-row";
import { Button as IButton } from '@ctypes/input';
import { Button } from '@components/button';

export const SectionHeader = ({ title = 'Section title', options, button }: { title: string, options?: Array<Option>, button: IButton }) => (
    <div className="section-header flex f-row f-center-h">
        <div className='flex f-row gap-m f-center-h'>
            <h2 className="heading-6 frozen">{title}</h2>
            {!!button && <Button {...button} />}
        </div>
        {!!options && <OptionsRow options={options} />}
    </div>
);