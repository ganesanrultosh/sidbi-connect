//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';
import Toast from 'react-native-root-toast';

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
    addImage: (
      state: VisitLocalStore,
      action: PayloadAction<Visit>,
    ) => {
      let visitKey = action.payload.customer.pan + action.payload.report.reportId;
      let visitContainingImage = action.payload;
      if (state.visits[visitKey]) {
        if(!state.visits[visitKey].visit.report.images) {
          state.visits[visitKey].visit.report.images = [];
        }
        let image : Image = {index: undefined, image: undefined, coords: undefined};
        image.index = state.visits[visitKey].visit.report.images?.length || 0;
        image.image = visitContainingImage.report.images[0].image;
        image.coords = visitContainingImage.report.images[0].coords;
        state.visits[visitKey].visit.report.images.push(image);
        Toast.show("Image saved sucessfully");
      }
    },
    deleteImage: (
      state: VisitLocalStore,
      action: PayloadAction<Visit>,
    ) => {
      let visitKey = action.payload.customer.pan + action.payload.report.reportId;
      if(visitKey && action.payload.report.images[0].index !== undefined) {
        console.log('deleteImage', action.payload.report.images[0].index)
        state.visits[visitKey].visit.report.images.splice(action.payload.report.images[0].index - 1, 1)
        Toast.show("Image deleted sucessfully");
      }
    }
  },
});

// Action creators are automatically generated for each case reducer function
export const {createVisit, deleteVisit, saveFieldValue, submitVisit, addImage, deleteImage} = visitLocalStoreSlice.actions;

export default visitLocalStoreSlice.reducer;
