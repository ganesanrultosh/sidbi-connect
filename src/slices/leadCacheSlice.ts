//leadLocalStoreSlice.js
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Lead } from "../models/Lead";

interface LeadLocalStore {
  leads: {
    [key: string]: {
      lead: Lead | undefined,
      error: string | undefined
    },
  }
  
}

const initialState : LeadLocalStore = {leads: {}};
// const initialState : {leads: string[]} = {leads: []};

export const getCachedLeads = createAsyncThunk(
  'lead/cachedLeads',
  async (
    params: undefined,
    {getState},
  ) => {
    return getState();
  });

//State slice
export const leadLocalStoreSlice = createSlice({
  name: "leadsLocalStore",
  initialState,
  reducers: {
    saveLead: (state: LeadLocalStore, 
      action: PayloadAction<Lead>) => {
        if(action.payload.pan) {
          if(!state.leads[action.payload.pan]) {
            state.leads[action.payload.pan] = {lead: undefined, error: undefined}
          }
          state.leads[action.payload.pan].lead = action.payload;
          console.log("Saving lead", state)
        }
      },
    deleteLead: (state: LeadLocalStore, 
      action: PayloadAction<string | undefined>) => {
        if(action.payload) {
          if(state.leads[action.payload]) {
            delete state.leads[action.payload];
          }
        }
      },
    },
  },
);

// Action creators are automatically generated for each case reducer function 
export const { saveLead, deleteLead } = leadLocalStoreSlice.actions;

export default leadLocalStoreSlice.reducer;