//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';
import Toast from 'react-native-root-toast';
import VisitService from '../services/visitService';

interface VisitLocalStore {
  mpin: string | undefined;
  visits: {
    [key: string]: {
      //Key is PAN + REPORT ID
      visit: Visit;
      error: string | undefined;
    };
  };
}

const initialState: VisitLocalStore = {mpin: undefined, visits: {}};

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
    // submitVisit: async (
    //   state: VisitLocalStore,
    //   action: PayloadAction<VisitFieldUpdateContext>,
    // ) => {
    //   console.log('Visit Local Store: ', action.payload);
    //   if (action.payload.pan && action.payload.reportId) {
    //     let visitKey = action.payload.pan + action.payload.reportId;
    //     console.log('visitKey', action.payload);
    //     if (state.visits[visitKey]) {
    //       let visit = state.visits[visitKey].visit;
    //       visit.status = 'submitted';
    //       await VisitService.postVisitTrigger(visit).then((data) => {
    //         visit.status = 'synced';
    //         Toast.show("Visit posted sucessfully");
    //         console.log('Visit Posted', data);
    //       }).catch(error => {
    //         console.log('Error posting visit', error);
    //         visit.error = error;
    //       });
    //     }
    //   }
    // },
    saveFieldValue: (
      state: VisitLocalStore,
      action: PayloadAction<VisitFieldUpdateContext>,
    ) => {
      if (action.payload.pan && action.payload.reportId) {
        let visitKey = action.payload.pan + action.payload.reportId;
        console.log('save field value', action);
        if (
          state.visits[visitKey] &&
          state.visits[visitKey].visit &&
          state.visits[visitKey].visit?.report.pages &&
          state.visits[visitKey].visit?.report.pages &&
          state.visits[visitKey].visit?.report.pages[action.payload.page]
            .segments &&
          state.visits[visitKey].visit?.report.pages[action.payload.page]
            .segments[action.payload.segment]
        ) {
          if (
            action.payload.groupFieldIndex !== -1 &&
            action.payload.groupItemIndex !== -1
          ) {
            console.log('saving group field', action);
            state.visits[visitKey].visit.report.pages[
              action.payload.page
            ].segments[action.payload.segment].fields[
              action.payload.fieldIndex
            ].group[action.payload.groupItemIndex].groupFields[
              action.payload.groupFieldIndex
            ].fieldValue = action.payload.value;
          } else {
            state.visits[visitKey].visit.report.pages[
              action.payload.page
            ].segments[action.payload.segment].fields[
              action.payload.fieldIndex
            ].fieldValue = action.payload.value;
          }
        }
      }
    },
    createVisit: (state: VisitLocalStore, action: PayloadAction<Visit>) => {
      if (action.payload.customer.pan && action.payload.report.reportId) {
        let visitKey =
          action.payload.customer.pan + action.payload.report.reportId;
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
        let visitKey =
          action.payload.customer.pan + action.payload.report.reportId;
        if (state.visits[visitKey]) {
          delete state.visits[visitKey];
        }
      }
    },
    addImage: (state: VisitLocalStore, action: PayloadAction<Visit>) => {
      let visitKey =
        action.payload.customer.pan + action.payload.report.reportId;
      let visitContainingImage = action.payload;
      if (state.visits[visitKey]) {
        if (!state.visits[visitKey].visit.report.images) {
          state.visits[visitKey].visit.report.images = [];
        }
        let image: Image = {
          index: undefined,
          image: undefined,
          coords: undefined,
        };
        if (visitContainingImage.report.images) {
          image.index = state.visits[visitKey].visit.report.images?.length || 0;
          image.image = visitContainingImage.report.images[0].image;
          image.coords = visitContainingImage.report.images[0].coords;
          state.visits[visitKey].visit.report.images?.push(image);
        }

        Toast.show('Image saved sucessfully');
      }
    },
    deleteImage: (state: VisitLocalStore, action: PayloadAction<Visit>) => {
      let visitKey =
        action.payload.customer.pan + action.payload.report.reportId;
      if (
        visitKey &&
        action.payload.report.images &&
        action.payload.report.images[0].index !== undefined
      ) {
        let index = state.visits[visitKey].visit.report.images?.findIndex(
          image => image.index === (action.payload.report.images && 
          action.payload.report.images[0].index),
        );
        if (index) state.visits[visitKey].visit.report.images?.splice(index, 1);
        Toast.show('Image deleted sucessfully');
      }
    },
    setImageUrl: (state: VisitLocalStore, {
      payload: {visitKey, imageIndex, url},
    }: PayloadAction<{
      visitKey: string;
      imageIndex: any;
      url: string;
    }>,) => {
      if (
        visitKey
        
      ) {
        let images = state.visits[visitKey].visit.report.images;
        if(images) {
          images[imageIndex].url = url;
        }
      }
    },
    setMPin: (
      state: VisitLocalStore,
      action: PayloadAction<string | undefined>,
    ) => {
      state.mpin = action.payload;
    },
    onAddVisitId(
      state,
      {
        payload: {visitKey, id},
      }: PayloadAction<{
        visitKey: string;
        id: any;
      }>,
    ) {
      if (visitKey) {
        if (state.visits[visitKey]) {
          state.visits[visitKey].visit.id = id;
        }
      }
    },
    updateVisitStatus(
      state,
      {
        payload: {visitKey, status, message},
      }: PayloadAction<{
        visitKey: string;
        status: "submitted" | "synced" | "syncfailure";
        message?: string;
      }>,
    ) {
        if (visitKey) {
          if (state.visits[visitKey]) {
            state.visits[visitKey].visit.status = status
            state.visits[visitKey].visit.error = message;
          }
        }
      }
  },
});

// Action creators are automatically generated for each case reducer function
export const {
  createVisit,
  deleteVisit,
  saveFieldValue,
  // submitVisit,
  addImage,
  deleteImage,
  setImageUrl,
  setMPin,
  onAddVisitId,
  updateVisitStatus,
} = visitLocalStoreSlice.actions;

export default visitLocalStoreSlice.reducer;
