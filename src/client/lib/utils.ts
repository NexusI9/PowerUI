import { Style as StyleInterface} from "@lib/interfaces";
import { CleanStyle } from "@lib/interfaces";

export function classifyStyle(style:Array<CleanStyle>): StyleInterface{

    return style.reduce((acc, item) => {
        const parts:Array<string> = item.name.split('/');
      
        let currentLevel: StyleInterface= acc;
      
        parts.forEach((part:string, index:number) => {
          if (!currentLevel[part]) {
            currentLevel[part] = (index === parts.length - 1) ? { ...item } : {};
          }
          currentLevel = currentLevel[part] as StyleInterface;
        });
      
        return acc;
      }, {} as StyleInterface);

}