import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Navigation from './Navigation';

function App(): JSX.Element {

  return <Provider store={store}>
      <Navigation/>
    </Provider>
}


export default App;
