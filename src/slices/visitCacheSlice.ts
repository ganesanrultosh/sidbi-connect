//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';
import Toast from 'react-native-root-toast';
import VisitService from '../services/visitService';
import ReportStructure from '../models/visit/reportStructure/reportStructure';
import Report from '../models/visit/reportStructure/report';

interface VisitLocalStore {
  mpin: string | undefined;
  isSpeechOn: boolean;
  visits: {
    [key: string]: {
      //Key is PAN + REPORT ID
      visit: Visit;
      error: string | undefined;
    };
  };
}

const initialState: VisitLocalStore = {mpin: undefined, isSpeechOn: false, visits: {}};

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
        let visitKey = action.payload.pan + action.payload.reportId;
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
            console.log('save field value', action);
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
    deleteImage: (state: VisitLocalStore, {
      payload: {visitKey, imageIndex},
    }: PayloadAction<{
      visitKey: string;
      imageIndex: any;
    }>,) => {
      console.log('visitkey', visitKey)
      console.log('imageIndex', imageIndex)
      if (
        visitKey &&
        imageIndex !== undefined
      )  {
        let index = state.visits[visitKey].visit.report.images?.findIndex(
          (image) => image.index === (imageIndex),
        );
        console.log('index to delete', index)
        if (index !== undefined) {
          state.visits[visitKey].visit.report.images?.splice(index, 1);
          Toast.show('Image deleted sucessfully');
        } else {
          Toast.show("Unable to delete the image.")
        }
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
    setSpeechOn: (
      state: VisitLocalStore,
      action: PayloadAction<boolean>,
    ) => {
      state.isSpeechOn = action.payload;
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
      },
    getDomainData(
      state,
      {
        payload: {visitFieldUpdateContext, domain},
      }: PayloadAction<{
        visitFieldUpdateContext: VisitFieldUpdateContext;
        domain: string;
        // key: string;
      }>,
    ) {
      let key = 'ABECS7591N';
      console.log('getDomainData', key)
      let visitKey =
        visitFieldUpdateContext.pan + visitFieldUpdateContext.reportId;
      if (visitKey) {
        if (state.visits[visitKey] && state.visits[visitKey].visit) {
          console.log('getDomainData', visitKey)
          //Clear values
          if(!state.visits[visitKey].visit.domainValues) state.visits[visitKey].visit.domainValues = {}
          let domainValues = state.visits[visitKey].visit.domainValues;
          if(domainValues) domainValues[key] = {status: 'Loading', values: []}

          //Try to get values

          try {
            VisitService
            .getDomainData({domain, key})
            .then(res => {
              console.log('Get Domain Data Success', res.data)
              // if(state && 
              //   state.visits && 
              //   state.visits[visitKey] && 
              //   state.visits[visitKey].visit &&
              //   state.visits[visitKey].visit.domainValues && 
              //   state.visits[visitKey].visit.domainValues[key])
              //   {
              //     console.log('Setting domain values')
              //     // state.visits[visitKey].visit.domainValues[key] = { values: res.data, status: 'Success' }
              //   }
              }
            )
            .catch((error) => {
              console.log('Get Domain Data Error', error)
              //Update status to error
              let domainValues = state.visits[visitKey].visit.domainValues;
              if(domainValues) domainValues[key].status = 'Error'
              
            })
          } catch(e) {
            console.log('Get Domain Data Exception', e)
            let domainValues = state.visits[visitKey].visit.domainValues;
            if(domainValues) domainValues[key].status = 'Error'
          }
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
  getDomainData,
  setSpeechOn,
} = visitLocalStoreSlice.actions;

export default visitLocalStoreSlice.reducer;
