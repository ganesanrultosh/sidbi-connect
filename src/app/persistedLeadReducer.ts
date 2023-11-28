import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { leadLocalStoreSlice } from "../slices/leadCacheSlice";

const persistLeadConfig = {
  key: 'leads',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['isSubmitting', 'isFetchingForm'],
};

const persistedLeadReducer = persistReducer(
  persistLeadConfig, 
  leadLocalStoreSlice.reducer)

export default persistedLeadReducer;