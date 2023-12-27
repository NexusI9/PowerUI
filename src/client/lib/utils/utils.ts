export function clone(val: any) {
    return JSON.parse(JSON.stringify(val))
}

export function clamp(min: number, value: number, max: number): number {
    if (value <= min) { return min; }
    if (value >= max) { return max; }
    return value;
}


export function isNumber(value:string){
    return !Number.isNaN(Number(value))
}

export function lastIndexOfArray(array:Array<any>, fallback?:any){
    return array.slice(-1)[0] || fallback ;
}


export function traverseCallback(object:any, callback:any):any{
    if(Array.isArray(object)){
        return object.map( (item:any) => traverseCallback(item, callback))
    }else{
        return callback(object);
    }
}

export const set_multi_array_active_item = (active: number | Array<number>, list: Array<any> | Array<Array<any>>): any => {
    if (Array.isArray(active)) {
        return (list as Array<Array<any>>)[active[0]][active[1]];
    }
    return (list as Array<any>)[active];
};