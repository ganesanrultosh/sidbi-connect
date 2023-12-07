//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';

interface VisitLocalStore {
  visits: {
    [key: string]: { //Key is PAN + REPORT ID
      visit: Visit;
      error: string | undefined;
    };
  };
}

const initialState: VisitLocalStore = {visits: {}};

export const getCachedVisits = createAsyncThunk(
  'visits/cachedVisits',
  async (params: undefined, {getState}) => {
    return getState();
  },
);

//State slice
export const visitLocalStoreSlice = createSlice({
  name: 'visitsLocalStore',
  initialState,
  reducers: {
    submitVisit: (
      state: VisitLocalStore,
      action: PayloadAction<VisitFieldUpdateContext>,
    ) => {
      console.log("Visit Local Store: ", action.payload)
      if (action.payload.pan && action.payload.reportId) {
        let visitKey = action.payload.pan + action.payload.reportId;
        console.log('visitKey', action.payload)
        if (state.visits[visitKey]) {
          let visit = state.visits[visitKey].visit;
          console.log('visit found', JSON.stringify(visit))
        }
      }
    },
    saveFieldValue: (
      state: VisitLocalStore,
      action: PayloadAction<VisitFieldUpdateContext>,
    ) => {
      
      if (action.payload.pan && action.payload.reportId) {
        let visitKey = action.payload.pan + action.payload.reportId;
        console.log('save field value', action)
        if (state.visits[visitKey] && 
            state.visits[visitKey].visit && state.visits[visitKey].visit?.report.pages &&
            state.visits[visitKey].visit?.report.pages && 
            state.visits[visitKey].visit?.report.pages[action.payload.page].segments &&
            state.visits[visitKey].visit?.report
              .pages[action.payload.page].segments[action.payload.segment]
          ) {
                if (
                  action.payload.groupFieldIndex !== -1 &&
                  action.payload.groupItemIndex !== -1
                ) {
                  console.log('saving group field', action)
                  state.visits[visitKey].visit.report
                    .pages[action.payload.page]
                    .segments[action.payload.segment]
                    .fields[action.payload.fieldIndex].group[
                      action.payload.groupItemIndex
                    ]
                    .groupFields[action.payload.groupFieldIndex]
                    .fieldValue = action.payload.value;
                } else {
                  state.visits[visitKey].visit.report
                    .pages[action.payload.page]
                    .segments[action.payload.segment]
                    .fields[action.payload.fieldIndex].fieldValue = action.payload.value;
                }
            }
      }
    },
    createVisit: (state: VisitLocalStore, action: PayloadAction<Visit>) => {
      if (action.payload.customer.pan && action.payload.report.reportId) {
        let visitKey = action.payload.customer.pan + action.payload.report.reportId;
        if (!state.visits[visitKey]) {
          state.visits[visitKey] = {
            visit: action.payload,
            error: undefined,
          };
        }
      }
    },
    deleteVisit: (
      state: VisitLocalStore,
      action: PayloadAction<Visit | undefined>,
    ) => {
      if (action.payload) {
        let visitKey = action.payload.customer.pan + action.payload.report.reportId;
        if (state.visits[visitKey]) {
          delete state.visits[visitKey];
        }
      }
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const {createVisit, deleteVisit, saveFieldValue, submitVisit} = visitLocalStoreSlice.actions;

export default visitLocalStoreSlice.reducer;
