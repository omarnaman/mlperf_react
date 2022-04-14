import React, { useState, createContext} from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = props => {
  const [config, setConfig] = useState({"--scenario": "Offline", "--count":"50", "--threads":"1-2", "--time":"10", "--samples-per-query":"20"});
  const [eid, setEid] = useState("");

  return(      
    <ConfigContext.Provider value={{ eidContext: [eid, setEid], configContext:[config, setConfig]}}>
      {props.children}
    </ConfigContext.Provider>
  );
}