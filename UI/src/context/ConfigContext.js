import React, { useState, createContext} from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = props => {
  const [config, setConfig] = useState({});

  return(      
    <ConfigContext.Provider value={[config, setConfig]}>
      {props.children}
    </ConfigContext.Provider>
  );
}