import { Workbench, ColorConfig, FontConfig, SidepanelOption, SidepanelList } from "@ctypes/workbench";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const workbenchSlice = createSlice({
    name: 'workbench',
    initialState: {
        type:'COLOR',
        config: {}
    },
    reducers: {
        spawn: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            let config: { [key: string]: any } = {};

            if (payload.sidepanel) {
                traverseCallback(payload.sidepanel, ({ options }: { options: SidepanelOption }) => 
                traverseCallback(options, ({ content }: { content: SidepanelList }) => 
                traverseCallback(content, (input:SidepanelList) => {
                    try {
                        config[input.configKey] = input.attributes.value;
                    }catch(_){
                        //console.warn(_);
                    }
                }
                )))
            }
            
            return ({ ...state, ...payload, config:config, active: true })
        },
        destroy: (state) => ({ ...state, active: false }),
        updateConfig: (state, { payload: { key, value } }: { payload: { key: keyof ColorConfig | keyof FontConfig; value: any } }) => {
            
            console.log(JSON.parse(JSON.stringify(state)));
            return ({ ...state, config: { ...state.config, [key]: value } });
        }
    }
});

export const { spawn, destroy, updateConfig } = workbenchSlice.actions;
export default workbenchSlice.reducer;

