import React from 'react';
import "./App.css"
//import { Parameter, StartButton, Title, ImportButton } from './components';
import { Loadgen, StartTab, Model } from './containers';

const App = () => {
  return (
  <div className="App">
    <Model />
    <Loadgen />
    <StartTab />
    {/* testing branches */}
  </div>
  )
};

export default App;
