
export interface LoadGenConfiguration {
    [prop: string]: any;
    dataset: number;
    scenario: number;
    sampleCount: number;
    rangeOfClients: number;
    recordAccuracy?: boolean;
    time: number;
    pipelineRequests?: number;
    samplesPerQuery?: number;
    maxOutgoingQueries?: number;
}


export interface SUTConfiguration {
    [prop: string]: any;
    modelThreads: number;
    model: number;
    runtime: number;
    consumerThreads: number;
}


export interface NetworkEmulationConfiguration {
    [prop: string]: any;
    enabled: boolean;
    delay: string;
    bandwidth: string;
    randomLoss: string;
}

export interface MLPerfConfiguration {
    [prop: string]: any;
    loadgen?: LoadGenConfiguration;
    sut?: SUTConfiguration;
    networkClient?: NetworkEmulationConfiguration;
    networkServer?: NetworkEmulationConfiguration;
}

