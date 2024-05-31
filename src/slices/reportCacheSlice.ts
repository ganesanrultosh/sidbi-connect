//visitLocalStoreSlice.js
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Visit from '../models/visit/visit';
import VisitFieldUpdateContext from '../models/visit/VisitFieldUpdateContext';
import Toast from 'react-native-root-toast';
import VisitService from '../services/visitService';
import ReportStructure from '../models/visit/reportStructure/reportStructure';
import Report from '../models/visit/reportStructure/report';

interface ReportLocalStore {
  reportStructure: Report[] | undefined
}

const initialState: ReportLocalStore = {reportStructure: undefined};

export const getCachedVisits = createAsyncThunk(
  'visits/cachedReports',
  async (params: undefined, {getState}) => {
    return getState();
  },
);

//State slice
export const reportLocalStoreSlice = createSlice({
  name: 'reportLocalStore',
  initialState,
  reducers: {
    saveReportStructure: (
      state: ReportLocalStore,
      action: PayloadAction<Report[]>
    ) => {
      state.reportStructure = action.payload;
      Toast.show("Ready for offline mode.");
    },
}});

// Action creators are automatically generated for each case reducer function
export const {
  saveReportStructure
} = reportLocalStoreSlice.actions;

export default reportLocalStoreSlice.reducer;
