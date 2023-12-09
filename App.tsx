import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Navigation from './Navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import useToken from './src/components/Authentication/useToken';
import { Text } from 'react-native';

function App(): JSX.Element {

  let persistor = persistStore(store);

  return <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Navigation/>
      </PersistGate>
    </Provider>
}


export default App;
