
export type RenameActions = 'RENAME';

export interface RenameConfig{
    match?:string;
    replace?:string;
    currentname?:boolean;
    numberup?:boolean;
    numberdown?:boolean;
}