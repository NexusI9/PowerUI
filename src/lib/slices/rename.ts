import { createSlice } from "@reduxjs/toolkit";
import { initConfig } from "@lib/utils/template";
import { Workbench } from "@ctypes/workbench.template";
import { Styles } from "@ctypes/style";

const renameSlice = createSlice({
    name: 'rename',
    initialState: {
        type: 'PAINT',
        config: {}
    },
    reducers: {
        init: (state, { payload }: { payload: Workbench }) => {

            //setup initial config from sidepanel
            const config: { [key: string]: any } = {
                ...payload.config,
                ...initConfig(payload.sidepanel)
            };

            return ({ ...state, ...payload, config, active: true })
        },
        updateName: (state, { payload }) => {

            const { key, value } = payload;

            const newConfig = {
                ...state.config,
                ...(key && { [key]: value })
            };

            //append variables shortcuts to replace input
            [
                { key: 'currentname', input: '$&' },
                { key: 'numberup', input: '$nn' },
                { key: 'numberdown', input: '$NN' }
            ].forEach(v => (v.key === key) && (value === true) && void (newConfig.replace = (newConfig.replace || '') + v.input));

            const newSet = (newConfig?.styles || []).map((style: Styles, i: number) => {
                let newName = newConfig.replace || style.name;

                //replace variables in name
                [
                    { match: '$&', replace: style.name },
                    { match: '$nn', replace: i + 1 },
                    { match: '$NN', replace: newConfig?.styles.length - i }
                ].forEach(({ match, replace }) => newName = newName.replaceAll(match, replace));

                //replace match pattern
                newName = newConfig.match && style.name.replaceAll(newConfig.match, newConfig.replace || '') || newName;

                return ({ ...style, name: newName });
            });

            return ({
                ...state,
                set: newSet,
                config: newConfig,
            });
        },
        destroy: (state) => ({ ...state, active: false })
    }
});

export const { init, destroy, updateName } = renameSlice.actions;
export default renameSlice.reducer;

