import './index.scss';
import { Option } from "@ctypes/contextmenu";
import { OptionsRow } from "@components/options-row";

export const SectionHeader = ({ title = 'Section title', options }: { title: string, options?: Array<Option> }) => (
    <div className="section-header flex f-row">
        <h2 className="heading-6">{title}</h2>
        {!!options && <OptionsRow options={options} />}
    </div>
);