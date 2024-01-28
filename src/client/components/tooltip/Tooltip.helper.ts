export function convertPayload(payload:any, value:any): Object{
    const clone = {...payload};
    Object.keys(clone).map(key => {
        if(clone[key as keyof typeof clone] === null){
            clone[key as keyof typeof clone] = value;
        }
    });
    return clone;
}