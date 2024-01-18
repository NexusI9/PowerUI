import { ExportGroupText } from "@ctypes/text";
import { TextItem } from "./textitem";

export const TextGroup = ({ headline, fonts }: { headline: string, fonts: Array<ExportGroupText> }) => {

    return (
        <div className="export-text-group flex f-col gap-m">
            <h3 className="heading-4" >{headline}</h3>
            {fonts.map((font, i) => <TextItem key={headline + i} {...font} />)}
        </div>
    );
}