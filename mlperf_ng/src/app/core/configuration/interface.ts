
export interface LoadGenConfiguration {
    [prop: string]: any;
    dataset: string;
    scenario: string;
    sampleCount: number;
    rangeOfClients: number;
    recordAccuracy?: boolean;
    time: number;
    pipelineRequests?: boolean;
    samplesPerQuery?: number;
    maxOutgoingQueries?: number;
    eid?: string;
}


export interface SUTConfiguration {
    [prop: string]: any;
    modelThreads: number;
    model: string;
    runtime: string;
    consumerThreads: number;
}


export interface NetworkEmulationConfiguration {
    [prop: string]: any;
    enabled: boolean;
    tcDelay: string;
    tcBandwidth: string;
    tcJitter: string;
    randomLoss: string;
}

export interface MLPerfConfiguration {
    [prop: string]: any;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    networkClient?: NetworkEmulationConfiguration;
    networkServer?: NetworkEmulationConfiguration;
}

