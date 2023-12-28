import { Workbench, ColorConfig, FontConfig, SidepanelOptions, SidepanelList } from "@ctypes/workbench";
import { traverseCallback } from "@lib/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const workbenchSlice = createSlice({
    name: 'workbench',
    initialState: {
        config: {}
    },
    reducers: {
        spawn: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            let config: { [key: string]: any } = {};

            if (payload.sidepanel) {
                traverseCallback(payload.sidepanel, ({ options }: { options: SidepanelOptions }) => 
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

            console.log(config);
            return ({ ...state, ...payload, config:config, active: true })
        },
        destroy: (state) => ({ ...state, active: false }),
        updateConfig: (state, { payload: { key, value } }: { payload: { key: keyof ColorConfig | keyof FontConfig; value: any } }) => ({ ...state, config: { ...state.config, [key]: value } })
    }
});

export const { spawn, destroy, updateConfig } = workbenchSlice.actions;
export default workbenchSlice.reducer;

