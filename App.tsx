import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import Navigation from './Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import BackgroundFetch from 'react-native-background-fetch';
import {postVisitTrigger} from './src/services/visitService';
import {useAppDispatch} from './src/app/hooks';
import {AppDispatch} from './src/app/store';
import { deleteVisit } from './src/slices/visitCacheSlice';

function App(): JSX.Element {
  let persistor = persistStore(store);

  let dispatch = store.dispatch;

  useEffect(() => {
    initBackgroundFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initBackgroundFetch() {
    // BackgroundFetch event handler.
    const onEvent = async (taskId: string) => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      await submitVisit();
      Promise.resolve();
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
      console.log('[BackgroundFetch] task: ', taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId: string | undefined) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 5,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      },
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  }

  async function submitVisit() {
    let visitsStore = store.getState().persistedVisists;
    if (Object.keys(visitsStore.visits).length > 0) {
      Object.keys(visitsStore.visits).map(visitKey => {
        let visit = visitsStore.visits[visitKey]
        if(visit.visit.status === "submitted" || visit.visit.status === "syncfailure") {
          console.log("Trying to post visit");
          dispatch(postVisitTrigger({visit: visit.visit}))
        } else if (visit.visit.status === "synced") {
          dispatch(deleteVisit(visit.visit))
        }
      })
      Promise.resolve();``
    } else {
      Promise.resolve();
    }
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
