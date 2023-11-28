//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';

interface VisitLocalStore {
  visits: {
    [key: string]: { //Key is PAN + REPORT ID
      visit: Visit | undefined;
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
    saveFieldValue: (
      state: VisitLocalStore,
      action: PayloadAction<VisitFieldUpdateContext>,
    ) => {
      if (action.payload.pan && action.payload.reportId) {
        let visitKey = action.payload.pan && action.payload.reportId;
        if (state.visits[visitKey]) {
          let visit = state.visits[visitKey].visit;
          if (visit && visit.report.pages) {
            let page = visit.report.pages[action.payload.page];
            if (page && page.segments) {
              let segment = page.segments[action.payload.segment];
              if (segment && segment.fields) {
                if (
                  action.payload.groupFieldIndex !== undefined &&
                  action.payload.groupItemIndex !== undefined
                ) {
                  segment.fields[action.payload.fieldIndex].group[
                    action.payload.groupItemIndex
                  ].groupFields[action.payload.groupFieldIndex].fieldValue =
                    action.payload.value;
                } else {
                  segment.fields[action.payload.fieldIndex].fieldValue =
                    action.payload.value;
                }
              }
            }
          }
        }
      }
    },
    createVisit: (state: VisitLocalStore, action: PayloadAction<Visit>) => {
      if (action.payload.customer.pan && action.payload.report.id) {
        let visitKey = action.payload.customer.pan && action.payload.report.id;
        if (!state.visits[visitKey]) {
          state.visits[visitKey] = {
            visit: action.payload,
            error: undefined,
          };
        } else {
          throw Error('Visit report already exists for the customer!');
        }
      }
    },
    deleteVisit: (
      state: VisitLocalStore,
      action: PayloadAction<number | undefined>,
    ) => {
      if (action.payload) {
        if (state.visits[action.payload]) {
          delete state.visits[action.payload];
        }
      }
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const {createVisit, deleteVisit} = visitLocalStoreSlice.actions;

export default visitLocalStoreSlice.reducer;
