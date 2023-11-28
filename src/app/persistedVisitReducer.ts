import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { visitLocalStoreSlice } from "../slices/visitCacheSlice";

const persistVisitConfig = {
  key: 'visits',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['isSubmitting', 'isFetchingForm'],
};

const persistedVisitReducer = persistReducer(
  persistVisitConfig, 
  visitLocalStoreSlice.reducer)

export default persistedVisitReducer;