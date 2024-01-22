import { ExportGroupText } from "@ctypes/text";
import { TextItem } from "./textitem";

export const TextGroup = ({ headline, fonts }: { headline: { content: string, style?: any }, fonts: Array<ExportGroupText> }) => {

    return (
        <div className="export-text-template-group flex f-col gap-m">
            <h3 className="heading-4" {...(headline.style && { style: headline.style })}>{headline.content}</h3>
            {fonts.map((font, i) => <TextItem key={headline.content + i} {...font} />)}
        </div>
    );
}