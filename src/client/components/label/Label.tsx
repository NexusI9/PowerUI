import { Icon } from "@components/icon";
import { Label as ILabel } from "src/types/global";

export default ({ children, size, iconLeft, iconRight }: ILabel) => (
    <span className="label flex f-row f-center-h gap-s">
        {iconLeft && <Icon icon={iconLeft} />}
        {children && <p>{children}</p>}
        {iconRight && <Icon icon={iconRight} />}
    </span>
);