import './index.scss';
import { Option } from "src/types/folder";
import { OptionsRow } from "@components/options-row";

export const SectionHeader = ({ title = 'Section title', options }: { title: string, options?: Array<Option> }) => (
    <div className="section-header flex f-row f-center-h">
        <h2 className="heading-6 frozen">{title}</h2>
        {!!options && <OptionsRow options={options} />}
    </div>
);