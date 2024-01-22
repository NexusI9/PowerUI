import { ExportGroupText } from "@ctypes/text";

export const TextItem = (props: ExportGroupText) => (
    <div className="export-text-template-item">
        <div className="export-text-template-detail flex f-col">
            {typeof props.detail.topRow === 'string' && <p><small>{props.detail.topRow}</small></p> || props.detail.topRow}
            {typeof props.detail.bottomRow === 'string' && <p><small>{props.detail.bottomRow}</small></p> || props.detail.bottomRow}
        </div>
        <p {...(props.body.style && { style: props.body.style })}>{props.body.content}</p>
    </div>
);