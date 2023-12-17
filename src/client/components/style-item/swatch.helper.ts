export function rgb(color:{r:number, g:number, b:number}):string{
    
    Object.keys(color).map( (key) => { 
        color[ key as keyof typeof color ] = color[ key as keyof typeof color ] * 255;
    });

    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}