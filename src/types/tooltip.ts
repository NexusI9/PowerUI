export type ToolTipItem  = {type:'INPUT'; value:string; action:string; payload:any, custom:string} | {type:'TEXT'; value:string;}
export type ToolTip = Array<ToolTipItem>; 