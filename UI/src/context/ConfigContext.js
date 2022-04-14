import React, { useState, createContext} from 'react';

export const ConfigContext = createContext();

export const ConfigProvider = props => {
  const [config, setConfig] = useState({"--scenario": "Offline", "--count":"50", "--threads":"1-3", "--time":"10", "--samples-per-query":"20"});

  // const storageEids = "http://3.133.91.254:8087/experiments";

  let eids = [];
  // fetch(storageEids)
  //   .then(res => res.json())
  //   .then(data => {
  //     eids = data.experiments;
  //   })

  // console.log(eids);
  const [eid, setEid] = useState(eids);

    //async await so that usestate is done after the fetch

  return(      
    <ConfigContext.Provider value={{ eidContext: [eid, setEid], configContext:[config, setConfig]}}>
      {props.children}
    </ConfigContext.Provider>
  );
}