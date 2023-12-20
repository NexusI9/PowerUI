import { Color as ColorInterface} from '@lib/interfaces';

function to255(color:ColorInterface){
    const newColor:ColorInterface = {r:0,g:0,b:0};
    Object.keys(newColor).map( (key) => { 
        newColor[ key as keyof typeof newColor ] = Math.floor(color[ key as keyof typeof color ] * 255);
    });
     return newColor;
}

export function rgb(color:ColorInterface):string{
    const newColor = to255(color);
    return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
}

  
export function rgbToHex(color:ColorInterface):string {
    const newColor = to255(color);

    function componentToHex(c:number) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

    return "#" + componentToHex(newColor.r) + componentToHex(newColor.g) + componentToHex(newColor.b);
  }